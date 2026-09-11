#!/usr/bin/env node
/**
 * Проверяет, что package-lock.json описывает все зависимости из package.json.
 *
 * Зачем отдельно, если `npm ci` и так падает: он падает уже во время установки,
 * длинным стек-трейсом и без подсказки, что именно делать. Этот скрипт стоит
 * первым в `npm run verify`, отрабатывает мгновенно без сети и печатает команду
 * починки.
 *
 * Запуск: npm run lint:lockfile
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const read = (f) => JSON.parse(readFileSync(resolve(root, f), 'utf8'))

const pkg = read('package.json')
let lock
try {
  lock = read('package-lock.json')
} catch {
  console.error('✗ package-lock.json не найден. Выполни `npm install` и закоммить результат.')
  process.exit(1)
}

const declared = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) }
const packages = lock.packages || {}
const legacy = lock.dependencies || {}

const missing = Object.keys(declared).filter(
  (name) => !packages[`node_modules/${name}`] && !legacy[name],
)

if (missing.length === 0) {
  console.log('✓ package-lock.json синхронизирован с package.json')
  process.exit(0)
}

console.error('✗ package-lock.json не синхронизирован с package.json\n')
console.error('Объявлено в package.json, но отсутствует в lockfile:')
for (const name of missing) console.error(`   ${name}@${declared[name]}`)
console.error(`
\`npm ci\` на этом сломается. Починка:

    npm install --package-lock-only
    git add package-lock.json
    npm ci        # проверить, что чистая установка проходит
`)
process.exit(1)
