#!/usr/bin/env node
/**
 * Статическая верификация без сборки.
 *
 * Проверяет ровно те классы поломок, которые может внести автоматическая
 * миграция на токены: битые ссылки на переменные, несуществующие пути @use,
 * неизвестные брейкпоинты, отсутствующие экспорты tokens.ts, нарушение
 * порядка @use (это hard error в Sass).
 *
 * Запуск: node scripts/verify-static.mjs
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, relative, join, basename } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = resolve(root, 'src')
const problems = []
const ok = []
const add = (rule, file, line, text) => problems.push({ rule, file, line, text })

const walk = (dir, out = []) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e)
    if (statSync(p).isDirectory()) { if (e !== 'node_modules' && e !== 'lib') walk(p, out) }
    else out.push(p)
  }
  return out
}
const files = walk(SRC)
const rel = (p) => relative(root, p).replace(/\\/g, '/')

/* ---- 1. Все объявленные CSS-переменные ---------------------------------- */
const tokensScss = readFileSync(resolve(SRC, 'styles/_tokens.scss'), 'utf8')
const declared = new Set([...tokensScss.matchAll(/^\s*(--[a-zA-Z0-9-]+)\s*:/gm)].map((m) => m[1]))
const kitCount = declared.size
// Локальные переменные компонентов объявляются в своих же файлах,
// а тенантная тема (--theme--*) выставляется из JS через style.setProperty.
for (const abs of files) {
  if (!/\.(scss|sass|ts|tsx)$/.test(abs)) continue
  const txt = readFileSync(abs, 'utf8')
  for (const m of txt.matchAll(/(--[a-zA-Z0-9-]+)\s*:/g)) declared.add(m[1])
  for (const m of txt.matchAll(/setProperty\(\s*['"`](--[a-zA-Z0-9-]+)/g)) declared.add(m[1])
  for (const m of txt.matchAll(/['"`](--[a-zA-Z0-9-]+)['"`]\s*:/g)) declared.add(m[1])
}
ok.push(`токенов кита: ${kitCount}; всего известных CSS-переменных: ${declared.size}`)

/* ---- 2. Каждая использованная var(--X) существует ------------------------ */
let usedCount = 0
for (const abs of files) {
  if (!/\.(scss|sass|ts|tsx)$/.test(abs)) continue
  if (rel(abs) === 'src/styles/_tokens.scss') continue
  readFileSync(abs, 'utf8').split('\n').forEach((line, i) => {
    for (const m of line.matchAll(/var\(\s*(--[a-zA-Z0-9-]+)/g)) {
      usedCount++
      if (!declared.has(m[1])) add('undefined-css-var', rel(abs), i + 1, m[1])
    }
  })
}
ok.push(`обращений к var(--*): ${usedCount}`)

/* ---- 3. Пути @use резолвятся -------------------------------------------- */
for (const abs of files) {
  if (!/\.scss$/.test(abs)) continue
  const dir = dirname(abs)
  readFileSync(abs, 'utf8').split('\n').forEach((line, i) => {
    const m = line.match(/@(use|forward)\s+['"]([^'"]+)['"]/)
    if (!m) return
    const spec = m[2]
    if (/^(sass:|https?:)/.test(spec)) return
    const base = resolve(dir, spec)
    const cands = [base + '.scss', join(dirname(base), '_' + basename(base) + '.scss'),
      base + '.sass', join(dirname(base), '_' + basename(base) + '.sass'),
      join(base, '_index.scss'), join(base, 'index.scss')]
    if (!cands.some(existsSync)) add('unresolved-use', rel(abs), i + 1, spec)
  })
}

/* ---- 4. @use стоит раньше любых других правил (hard error в Sass) -------- */
for (const abs of files) {
  if (!/\.scss$/.test(abs)) continue
  const lines = readFileSync(abs, 'utf8').split('\n')
  let sawRule = false
  lines.forEach((line, i) => {
    const s = line.trim()
    if (!s || s.startsWith('//') || s.startsWith('/*') || s.startsWith('*')) return
    if (/^@use\b/.test(s)) { if (sawRule) add('use-after-rule', rel(abs), i + 1, s.slice(0, 60)) ; return }
    if (/^@(charset|forward)\b/.test(s)) return
    if (/^\$[\w-]+\s*:/.test(s)) return          // переменные допустимы до @use
    sawRule = true
  })
}

/* ---- 5. Брейкпоинты существуют в карте $bp ------------------------------- */
const bpFile = readFileSync(resolve(SRC, 'styles/_breakpoints.scss'), 'utf8')
const bpMap = bpFile.match(/\$bp:\s*\(([^)]*)\)/s)
const bpKeys = new Set(bpMap ? [...bpMap[1].matchAll(/^\s*([a-z0-9]+)\s*:/gm)].map((m) => m[1]) : [])
ok.push(`брейкпоинтов в шкале: ${[...bpKeys].join(', ')}`)
for (const abs of files) {
  if (!/\.scss$/.test(abs) || rel(abs).includes('styles/_breakpoints')) continue
  const txt = readFileSync(abs, 'utf8')
  const usesBp = /@use\s+['"][^'"]*breakpoints['"]\s+as\s+bp/.test(txt)
  txt.split('\n').forEach((line, i) => {
    for (const m of line.matchAll(/@include\s+bp\.(bp-down|bp-up)\(\s*([a-z0-9]+)\s*\)/g)) {
      if (!usesBp) add('bp-without-use', rel(abs), i + 1, m[0])
      if (!bpKeys.has(m[2])) add('unknown-breakpoint', rel(abs), i + 1, m[2])
    }
    // вызов миксина без пространства имён — остаток старого API
    for (const m of line.matchAll(/@include\s+(bp-down|bp-up)\(/g)) {
      if (!/bp\.(bp-down|bp-up)/.test(line)) add('bp-missing-namespace', rel(abs), i + 1, m[0])
    }
  })
}

/* ---- 6. Импорты из styles/tokens: путь и экспорт ------------------------- */
const tokensTs = readFileSync(resolve(SRC, 'styles/tokens.ts'), 'utf8')
const exported = new Set([...tokensTs.matchAll(/export const (\w+)/g)].map((m) => m[1]))
ok.push(`экспортов tokens.ts: ${[...exported].join(', ')}`)
for (const abs of files) {
  if (!/\.(ts|tsx)$/.test(abs)) continue
  const dir = dirname(abs)
  readFileSync(abs, 'utf8').split('\n').forEach((line, i) => {
    const m = line.match(/import\s*\{([^}]+)\}\s*from\s*['"]([^'"]*styles\/tokens)['"]/)
    if (!m) return
    const base = resolve(dir, m[2])
    if (!['.ts', '.tsx', '/index.ts'].some((e) => existsSync(base + e)))
      add('unresolved-tokens-import', rel(abs), i + 1, m[2])
    for (const name of m[1].split(',').map((s) => s.trim()).filter(Boolean))
      if (!exported.has(name)) add('missing-token-export', rel(abs), i + 1, name)
  })
}

/* ---- 7. Использование tokens.* без импорта ------------------------------- */
for (const abs of files) {
  if (!/\.(ts|tsx)$/.test(abs) || rel(abs) === 'src/styles/tokens.ts') continue
  const raw = readFileSync(abs, 'utf8')
  // вырезаем комментарии и строки — иначе слово из перевода или из прозы
  // в комментарии считается обращением к токену
  const txt = raw
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(?<!:)\/\/[^\n]*/g, ' ')
    .replace(/'(?:[^'\\\n]|\\.)*'/g, "''")
    .replace(/"(?:[^"\\\n]|\\.)*"/g, '""')
    .replace(/`(?:[^`\\]|\\.)*`/g, '``')
  for (const name of ['categorical', 'mapColor', 'orderStatusColor', 'alertColor', 'fontSize', 'radius', 'zIndex', 'color', 'colorRaw']) {
    const used = new RegExp(`(?<![\\w.$'"\`])${name}\\.`).test(txt)
    // ищем в исходном тексте: в txt строковые литералы вырезаны, и путь импорта пропадает
    const imported = new RegExp(`import[^\\n]*\\b${name}\\b[^\\n]*styles/tokens`).test(raw)
    if (used && !imported) {
      const ln = txt.split('\n').findIndex((l) => new RegExp(`(?<![\\w.$])${name}\\.`).test(l))
      add('token-used-without-import', rel(abs), ln + 1, name)
    }
  }
}

/* ---- 8. Синтаксис SCSS: скобки и осиротевшие & --------------------------- */
for (const abs of files) {
  if (!/\.scss$/.test(abs)) continue
  let t = readFileSync(abs, 'utf8')
  t = t.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(?<!:)\/\/[^\n]*/g, '')
  const open = (t.match(/\{/g) || []).length
  const close = (t.match(/\}/g) || []).length
  if (open !== close) add('brace-mismatch', rel(abs), 0, `{ ${open} vs } ${close}`)
  for (const m of t.matchAll(/var\([^)]*\)/g))
    if (!/^var\(--[a-zA-Z0-9-]+(,[\s\S]+)?\)$/.test(m[0]) && !/#\{/.test(m[0]))
      add('malformed-var', rel(abs), 0, m[0].slice(0, 50))
}

/* ------------------------------- вывод ----------------------------------- */
for (const line of ok) console.log('  ' + line)
console.log('')
if (!problems.length) { console.log('✓ статическая верификация: проблем не найдено'); process.exit(0) }
const byRule = problems.reduce((a, p) => ((a[p.rule] ??= []).push(p), a), {})
console.error(`✗ проблем: ${problems.length}\n`)
for (const [rule, list] of Object.entries(byRule).sort((a, b) => b[1].length - a[1].length)) {
  console.error(`${rule} — ${list.length}`)
  for (const p of list.slice(0, 10)) console.error(`   ${p.file}:${p.line}  ${p.text}`)
  if (list.length > 10) console.error(`   … ещё ${list.length - 10}`)
  console.error('')
}
process.exit(1)
