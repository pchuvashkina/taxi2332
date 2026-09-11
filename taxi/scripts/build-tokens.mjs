#!/usr/bin/env node
// Генерирует src/styles/_tokens.scss и src/styles/tokens.ts из src/styles/tokens.json.
// tokens.json — единственный источник правды. Сборка: npm run tokens:build
// Проверка расхождения в CI: npm run tokens:check
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const T = JSON.parse(readFileSync(resolve(root, 'src/styles/tokens.json'), 'utf8'))
const check = process.argv.includes('--check')
const HEAD = `// ВНИМАНИЕ: файл сгенерирован из src/styles/tokens.json.
// Руками не править — изменения затрёт \`npm run tokens:build\`.
`
const L = [HEAD]
L.push(`@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;700&family=Inter:wght@400;500;700&display=swap');\n`)
L.push(':root {')
L.push('  /* --- Примитивы: сырые цвета. В компонентах НЕ использовать напрямую. --- */')
for (const [k, v] of Object.entries(T.primitives)) L.push(`  ${k}: ${v};`)
L.push('\n  /* --- Семантические токены: только их используют компоненты. --- */')
for (const [k, v] of Object.entries(T.semantic)) L.push(`  --c-${k}: var(${v});`)
L.push('\n  /* --- Качественные палитры: различимость важнее гармонии --- */')
for (const [name, arr] of Object.entries(T.categorical)) {
  if (name.startsWith('_')) continue
  arr.forEach((c, i) => L.push(`  --cat-${name}-${i}: ${c};`))
}
L.push('\n  /* --- Семантика карты (дублируется в TS: Leaflet задаёт цвета из JS) --- */')
for (const [k, v] of Object.entries(T.map)) if (!k.startsWith('_')) L.push(`  --c-map-${k}: ${v};`)
L.push('\n  /* --- Статусы заказа --- */')
for (const [k, v] of Object.entries(T.orderStatus)) if (!k.startsWith('_')) L.push(`  --c-order-${k}: ${v};`)
L.push('\n  /* --- Alert --- */')
for (const [k, v] of Object.entries(T.alert)) L.push(`  --c-alert-${k}: ${v};`)
const scale = (p, o) => { for (const [k, v] of Object.entries(o)) if (!k.startsWith('_')) L.push(`  --${p}-${k}: ${v};`) }
L.push('\n  /* --- Типографика --- */')
L.push(`  --font-base: ${T.font.base};`)
scale('fs', T.fontSize); scale('fw', T.fontWeight)
L.push('\n  /* --- Шкалы --- */')
scale('s', T.space); scale('r', T.radius); scale('sh', T.shadow); scale('d', T.duration)
L.push(`  --ease: ${T.easing.default};`)
scale('z', T.zIndex)
L.push('}')
const scss = L.join('\n') + '\n'

const j = (o) => JSON.stringify(o, null, 2)
const noMeta = (o) => Object.fromEntries(Object.entries(o).filter(([k]) => !k.startsWith('_')))
const ts = `${HEAD}
/**
 * Токены для TS/TSX.
 *
 * \`color\` — CSS-переменные. Использовать везде, где значение попадает в CSS:
 *   style={{ color: color.accent }}, SVG stroke={color.accent}.
 *
 * \`colorRaw\` — литералы. Только там, где var() не резолвится: Leaflet, canvas,
 * meta-теги. Каждое такое место — документированное исключение (см.
 * src/styles/ALLOWED_EXCEPTIONS.md), а не обход системы.
 */

export const color = ${j(Object.fromEntries(Object.keys(T.semantic).map((k) => [k, `var(--c-${k})`])))} as const

export const colorRaw = ${j(Object.fromEntries(Object.entries(T.semantic).map(([k, p]) => [k, T.primitives[p]])))} as const

/** Качественные палитры: порядок и различимость значимы. Не сортировать, не схлопывать. */
export const categorical = ${j(noMeta(T.categorical))} as const

/** Семантика карты. Leaflet задаёт цвета из JS — нужны литералы. */
export const mapColor = ${j(noMeta(T.map))} as const

/** Цвета статуса заказа. Роль важнее оттенка. */
export const orderStatusColor = ${j(noMeta(T.orderStatus))} as const

export const alertColor = ${j(T.alert)} as const
export const fontSize = ${j(T.fontSize)} as const
export const space = ${j(T.space)} as const
export const radius = ${j(T.radius)} as const
export const zIndex = ${j(T.zIndex)} as const
export const breakpoint = ${j(T.breakpoints)} as const

export type SemanticColor = keyof typeof color
`
let drift = false
for (const [rel, content] of [['src/styles/_tokens.scss', scss], ['src/styles/tokens.ts', ts]]) {
  const path = resolve(root, rel)
  if (check) {
    let cur = ''
    try { cur = readFileSync(path, 'utf8') } catch {}
    if (cur !== content) { drift = true; console.error(`✗ ${rel} разошёлся с tokens.json`) }
    else console.log(`✓ ${rel}`)
  } else { writeFileSync(path, content); console.log(`сгенерирован ${rel}`) }
}
if (check && drift) { console.error('\nЗапусти `npm run tokens:build` и закоммить результат.'); process.exit(1) }
