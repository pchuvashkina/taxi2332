#!/usr/bin/env node
/**
 * Guard дизайн-системы, работающий без npm install.
 *
 * Зачем, если есть stylelint: stylelint читает только SCSS, а половина обходов
 * системы живёт в TS/TSX — hex в inline-стилях, SVG-атрибутах, Leaflet
 * pathOptions. Этот скрипт закрывает обе стороны и не требует зависимостей,
 * поэтому работает в pre-commit и в CI ещё до установки пакетов.
 *
 * Запуск: npm run lint:tokens
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, relative, join } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = resolve(root, 'src')
const IGNORE_DIRS = ['lib', 'node_modules']
const IGNORE_FILES = ['src/styles/_tokens.scss', 'src/styles/_breakpoints.scss', 'src/styles/tokens.ts', 'src/styles/tokens.json']
// siteConstants.PALETTE — это КОНФИГУРАЦИЯ тенанта (значение по умолчанию для
// переменной окружения), а не стилизация UI. Цвет приходит снаружи и попадает
// в --theme--*, минуя кит по замыслу. Задокументировано в ALLOWED_EXCEPTIONS.md.
const CONFIG_EXCEPTIONS = ['src/siteConstants.ts']

const walk = (dir, out = []) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e)
    if (statSync(p).isDirectory()) { if (!IGNORE_DIRS.includes(e)) walk(p, out) } else out.push(p)
  }
  return out
}
const problems = []
const add = (file, line, rule, text) => problems.push({ file, line, rule, text: text.trim().slice(0, 100) })

const strip = (l) => l.replace(/\/\/(?!\/).*$/, '').replace(/\/\*.*?\*\//g, '')
const decl = (l, prop) => new RegExp(`(?:^|[\\s;{])${prop}\\s*:`).test(strip(l))
const val = (l) => strip(l).split(':').slice(1).join(':') || ''
const RAW_LEN = /(^|[\s,(])\d+(\.\d+)?(px|rem|em)\b/
const RAW_DUR = /(^|[\s,])\d*\.?\d+m?s\b/

const scssRules = [
  { rule: 'color-no-hex', test: (l) => /#[0-9a-fA-F]{3,8}\b/.test(strip(l)) && !/#\{/.test(l) },
  { rule: 'color-named', test: (l) => /(?:^|[\s;{])(?:color|background|background-color|border-color|fill|stroke)\s*:\s*(red|green|blue|white|black|orange|yellow|gray|grey|purple|pink)\s*[;!}]/.test(strip(l)) },
  { rule: 'raw-font-size', test: (l) => decl(l, 'font-size') && RAW_LEN.test(val(l)) },
  { rule: 'raw-border-radius', test: (l) => decl(l, 'border-radius') && RAW_LEN.test(val(l)) },
  { rule: 'raw-gap', test: (l) => decl(l, '(?:gap|row-gap|column-gap)') && RAW_LEN.test(val(l)) },
  { rule: 'raw-duration', test: (l) => decl(l, '(?:transition|animation)(?:-duration|-delay)?') && RAW_DUR.test(val(l)) },
  { rule: 'raw-z-index', test: (l) => decl(l, 'z-index') && /^\s*[1-9]\d*\s*[;!}]?\s*$/.test(val(l).split(';')[0] + ';') },
  { rule: 'raw-media-query', test: (l, prev) => /@media[^{]*\((?:max|min)-width:\s*\d/.test(strip(l)) && !/bp-exception:/.test(prev || '') },
  { rule: 'font-family', test: (l) => decl(l, 'font-family') && !/var\(--font-|inherit/.test(val(l)) },
  // shorthand `font: 22px/1em sans-serif` обходил бы проверку font-size/font-family
  { rule: 'font-shorthand', test: (l) => decl(l, 'font') && !/inherit/.test(val(l)) && (RAW_LEN.test(val(l)) || !/var\(--font-/.test(val(l))) },
]

for (const abs of walk(SRC)) {
  const rel = relative(root, abs).replace(/\\/g, '/')
  if (IGNORE_FILES.includes(rel)) continue
  const isConfig = CONFIG_EXCEPTIONS.includes(rel)
  const isStyle = /\.(scss|sass|css)$/.test(rel)
  const isCode = /\.(ts|tsx)$/.test(rel)
  if (!isStyle && !isCode) continue
  const lines = readFileSync(abs, 'utf8').split('\n')
  lines.forEach((line, i) => {
    if (isStyle) { for (const { rule, test } of scssRules) if (test(line, lines[i - 1])) add(rel, i + 1, rule, line) }
    else {
      if (!isConfig && /(['"`])#[0-9a-fA-F]{3,8}\1/.test(line)) add(rel, i + 1, 'hex-in-code', line)
      // сырые значения шкал в inline-стилях: fontSize: '20px', borderRadius: 10, zIndex: 500
      if (/\b(?:fontSize|lineHeight|letterSpacing|borderRadius|gap|rowGap|columnGap|zIndex)\s*:\s*(?:(['"`])\s*\d[^'"`]*\1|[1-9]\d*)/.test(line)
          && !/technical-exception:/.test(line) && !/technical-exception:/.test(lines[i - 1] || ''))
        add(rel, i + 1, 'raw-scale-in-code', line)
      if (/(?:color|fill|stroke|background\w*)\s*[:=]\s*(['"])(?:red|green|blue|white|black|orange|yellow|gray|grey)\1/.test(line)) add(rel, i + 1, 'named-color-in-code', line)
    }
  })
}

if (!problems.length) { console.log('✓ guard дизайн-системы: нарушений нет'); process.exit(0) }
const byRule = problems.reduce((a, p) => ((a[p.rule] ??= []).push(p), a), {})
console.error(`✗ нарушений: ${problems.length}\n`)
for (const [rule, list] of Object.entries(byRule).sort((a, b) => b[1].length - a[1].length)) {
  console.error(`${rule} — ${list.length}`)
  for (const p of list.slice(0, 8)) console.error(`   ${p.file}:${p.line}  ${p.text}`)
  if (list.length > 8) console.error(`   … ещё ${list.length - 8}`)
  console.error('')
}
console.error('Разрешённые исключения: src/styles/ALLOWED_EXCEPTIONS.md')
process.exit(1)
