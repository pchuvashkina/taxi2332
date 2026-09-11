#!/usr/bin/env node
/**
 * Формальная проверка контраста (WCAG 2.1).
 *
 * Каждому семантическому цветовому токену в tokens.json присвоена роль
 * (поле `a11y`). Скрипт считает контраст против всех поверхностей и падает,
 * если токен не выполняет обещание своей роли.
 *
 * Роли:
 *   text        — обычный текст, требуется ≥ 4.5:1
 *   text-large  — крупный текст (≥ 18.66px bold / 24px), требуется ≥ 3:1
 *   non-text    — значимые иконки, границы полей, индикаторы, требуется ≥ 3:1
 *   fill        — заливка-подложка: контраст к поверхности не нормируется,
 *                 но информацию цветом передавать запрещено — рядом
 *                 обязателен текстовый дубль (WCAG 1.4.1)
 *   decorative  — декор и неактивные элементы, требований нет
 *   surface     — сама поверхность, проверяется как фон для остальных
 *
 * Запуск: npm run lint:a11y
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const T = JSON.parse(readFileSync(resolve(root, 'src/styles/tokens.json'), 'utf8'))
const writeReport = process.argv.includes('--report')

const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
const lum = (h) => {
  const [r, g, b] = rgb(h).map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m)
  return (x + 0.05) / (y + 0.05)
}
const hexOf = (sem) => T.primitives[T.semantic[sem]]

const MIN = { text: 4.5, 'text-large': 3, 'non-text': 3, fill: 0, decorative: 0, surface: 0 }
const a11y = T.a11y || {}
const surfaces = Object.entries(a11y).filter(([, r]) => r === 'surface').map(([k]) => k)

if (!surfaces.length) {
  console.error('✗ в tokens.json не задано ни одной поверхности (роль "surface" в секции a11y)')
  process.exit(1)
}

const rows = []
const fails = []
for (const [sem, role] of Object.entries(a11y)) {
  if (role === 'surface' || role === 'decorative') continue
  if (!T.semantic[sem]) { fails.push({ sem, why: 'токен указан в a11y, но отсутствует в semantic' }); continue }
  const fg = hexOf(sem)
  const per = surfaces.map((s) => ({ s, r: ratio(fg, hexOf(s)) }))
  const worst = per.reduce((a, b) => (a.r < b.r ? a : b))
  rows.push({ sem, role, fg, per, worst })
  if (worst.r < MIN[role]) fails.push({ sem, role, why: `${worst.r.toFixed(2)}:1 на ${worst.s}, требуется ≥ ${MIN[role]}:1` })
}

// Токены, которым роль не назначена вовсе
const colorish = Object.keys(T.semantic)
const unassigned = colorish.filter((k) => !(k in a11y))

const pad = (s, n) => String(s).padEnd(n)
console.log(`поверхностей: ${surfaces.join(', ')}`)
console.log(`токенов с ролью: ${rows.length}, без роли: ${unassigned.length}\n`)
console.log(`${pad('токен', 24)}${pad('роль', 13)}${pad('hex', 10)}худший контраст`)
for (const r of rows.sort((a, b) => a.worst.r - b.worst.r))
  console.log(`${pad(r.sem, 24)}${pad(r.role, 13)}${pad(r.fg, 10)}${r.worst.r.toFixed(2)}:1 (${r.worst.s})`)

if (writeReport) {
  const md = ['# Матрица контраста', '', 'Сгенерировано `npm run lint:a11y -- --report`. Руками не править.', '',
    `Поверхности: ${surfaces.map((s) => `\`--c-${s}\` (${hexOf(s)})`).join(', ')}`, '',
    '| Токен | hex | Роль | ' + surfaces.map((s) => s).join(' | ') + ' | Минимум |',
    '|---|---|---|' + surfaces.map(() => '---:').join('|') + '|---:|',
    ...rows.sort((a, b) => b.worst.r - a.worst.r).map((r) =>
      `| \`--c-${r.sem}\` | \`${r.fg}\` | ${r.role} | ${r.per.map((p) => p.r.toFixed(2)).join(' | ')} | ${MIN[r.role]} |`),
    '', '## Роли', '',
    '| Роль | Требование | Где применять |', '|---|---|---|',
    '| `text` | ≥ 4.5:1 | обычный текст любого размера |',
    '| `text-large` | ≥ 3:1 | крупный текст: ≥ 24px, либо ≥ 18.66px полужирный |',
    '| `non-text` | ≥ 3:1 | значимые иконки, границы полей ввода, индикаторы состояния |',
    '| `fill` | не нормируется | заливка-подложка; цвет не должен быть единственным носителем смысла — рядом обязателен текстовый дубль |',
    '| `decorative` | — | декор и неактивные (disabled) элементы — WCAG их не нормирует |',
    '| `surface` | — | фон, относительно которого считается контраст |',
    '', unassigned.length ? `## Без назначенной роли\n\n${unassigned.map((u) => `\`--c-${u}\``).join(', ')}\n` : '',
  ].join('\n')
  writeFileSync(resolve(root, 'docs/design-system/CONTRAST_MATRIX.md'), md)
  console.log('\nотчёт записан: docs/design-system/CONTRAST_MATRIX.md')
}

console.log('')
if (unassigned.length) {
  console.error(`✗ токенов без назначенной роли a11y: ${unassigned.length}`)
  console.error(`   ${unassigned.join(', ')}`)
  console.error('   Назначь роль в секции "a11y" файла src/styles/tokens.json.\n')
}
if (fails.length) {
  console.error(`✗ нарушений контраста: ${fails.length}`)
  for (const f of fails) console.error(`   --c-${f.sem}${f.role ? ` (${f.role})` : ''}: ${f.why}`)
  console.error('\n   Либо понизь роль токена, либо затемни значение в tokens.json.')
}
if (fails.length || unassigned.length) process.exit(1)
console.log('✓ контраст: все токены выполняют требования своей роли')
