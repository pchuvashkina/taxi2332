# Taxi

Веб-приложение такси: React 19, TypeScript, Leaflet, MUI.

## Структура

| Путь | Что это |
|---|---|
| `taxi/src` | исходники приложения |
| `taxi/src/styles` | **дизайн-система** — токены, брейкпоинты, исключения |
| `taxi/scripts` | скрипты сборки, генератор токенов, линтеры |
| `taxi/driver-emulator` | Node-эмулятор водителей с панелью на `127.0.0.1:3099` |
| `taxi/e2e` | Playwright-тесты |
| `taxi/docs` | документация |

## Дизайн-система

Все визуальные значения — цвета, кегли, отступы, радиусы, тени, длительности, слои — собраны в одном файле `taxi/src/styles/tokens.json`. Из него генерируются SCSS и TypeScript.

```bash
npm run tokens:build      # перегенерировать _tokens.scss и tokens.ts
npm run tokens:check      # проверить, что они не разошлись с tokens.json
npm run lint:tokens       # guard: сырые значения в SCSS и в TS/TSX
npm run lint:styles       # stylelint по SCSS
npm run verify            # всё вместе + тесты + сборка
```

Документация:

| Файл | Что внутри |
|---|---|
| [`taxi/docs/UI_KIT.md`](taxi/docs/UI_KIT.md) | устройство системы, критерии, аудит контраста |
| [`taxi/docs/UI_KIT_AUDIT_BEFORE.md`](taxi/docs/UI_KIT_AUDIT_BEFORE.md) | состояние стилей до работы |
| [`taxi/docs/UI_KIT_ACCEPTANCE.md`](taxi/docs/UI_KIT_ACCEPTANCE.md) | чеклист приёмки |
| [`taxi/docs/UI_KIT_TECH_DEBT.md`](taxi/docs/UI_KIT_TECH_DEBT.md) | задачи, не вошедшие в этап |

**Правило:** `_tokens.scss` и `tokens.ts` генерируются. Правится только `tokens.json`; прямые изменения в сгенерированных файлах отлавливает `tokens:check` и затирает следующая сборка.

## Запуск

```bash
npm ci
cp .env.example .env      # заполнить, если нужен эмулятор водителей
npm start
```

> `package-lock.json` может не содержать пакетов stylelint. Если `npm ci` падает — выполните `npm install --package-lock-only` и закоммитьте lockfile. Проверка: `npm run lint:lockfile`.

## Учётные данные

Логины и пароли эмулятора вынесены в переменные окружения, шаблон — `.env.example`. Файл `.env` в репозиторий не попадает.

Переменные с префиксом `REACT_APP_` попадают в собранный бандл и доступны в браузере, поэтому там допустимы только тестовые учётные записи. Боевые использовать нельзя.

## Прочая документация

`taxi/docs/ARCHITECTURE.md`, `STATE_AND_API.md`, `MAP_CHANNEL.md`, `MOCK_MODE.md`, `REPOSITORY_MAP.md`, отчёты по этапам Platform Interface.
