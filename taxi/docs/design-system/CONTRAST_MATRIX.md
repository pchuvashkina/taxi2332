# Матрица контраста

Сгенерировано `npm run lint:a11y -- --report`. Руками не править.

Поверхности: `--c-surface` (#ffffff), `--c-surface-canvas` (#fffbf4), `--c-surface-subtle` (#f8fafc)

| Токен | hex | Роль | surface | surface-canvas | surface-subtle | Минимум |
|---|---|---|---:|---:|---:|---:|
| `--c-black` | `#000000` | text | 21.00 | 20.36 | 20.07 | 4.5 |
| `--c-text-primary` | `#111827` | text | 17.74 | 17.20 | 16.96 | 4.5 |
| `--c-navy` | `#001f43` | text | 16.44 | 15.94 | 15.72 | 4.5 |
| `--c-icon` | `#1c274c` | text | 14.54 | 14.10 | 13.90 | 4.5 |
| `--c-accent-darkest` | `#600000` | text | 14.02 | 13.60 | 13.40 | 4.5 |
| `--c-teal-dark` | `#004444` | text | 10.99 | 10.66 | 10.51 | 4.5 |
| `--c-info-pure` | `#0000ff` | text | 8.59 | 8.33 | 8.21 | 4.5 |
| `--c-accent-dark` | `#991b0e` | text | 8.34 | 8.09 | 7.97 | 4.5 |
| `--c-warning-dark` | `#9a3412` | text | 7.31 | 7.08 | 6.98 | 4.5 |
| `--c-info-violet` | `#6d28d9` | text | 7.10 | 6.89 | 6.79 | 4.5 |
| `--c-danger` | `#d32f2f` | text | 4.98 | 4.83 | 4.76 | 4.5 |
| `--c-text-secondary` | `#64748b` | text | 4.76 | 4.61 | 4.55 | 4.5 |
| `--c-accent-text` | `#e32000` | text-large | 4.70 | 4.55 | 4.49 | 3 |
| `--c-danger-alt-text` | `#e41832` | text-large | 4.69 | 4.55 | 4.48 | 3 |
| `--c-warning-text` | `#a86400` | text-large | 4.68 | 4.54 | 4.47 | 3 |
| `--c-text-muted-text` | `#747474` | text-large | 4.67 | 4.53 | 4.47 | 3 |
| `--c-warning-strong-text` | `#b25e00` | text-large | 4.67 | 4.53 | 4.47 | 3 |
| `--c-info-text` | `#0072e1` | text-large | 4.67 | 4.53 | 4.47 | 3 |
| `--c-success-text` | `#12863d` | text-large | 4.66 | 4.52 | 4.46 | 3 |
| `--c-secondary-text` | `#897300` | text-large | 4.65 | 4.51 | 4.44 | 3 |
| `--c-success-alt-text` | `#128645` | text-large | 4.64 | 4.50 | 4.44 | 3 |
| `--c-ios-blue` | `#007aff` | text-large | 4.02 | 3.89 | 3.84 | 3 |
| `--c-danger-pure` | `#ff0000` | text-large | 4.00 | 3.88 | 3.82 | 3 |
| `--c-accent` | `#ff2400` | text-large | 3.82 | 3.70 | 3.65 | 3 |
| `--c-danger-vivid` | `#ef4444` | text-large | 3.76 | 3.65 | 3.60 | 3 |
| `--c-text-muted` | `#858585` | text-large | 3.69 | 3.58 | 3.53 | 3 |
| `--c-danger-alt` | `#ec4c60` | text-large | 3.64 | 3.53 | 3.48 | 3 |
| `--c-info-bright` | `#3883fa` | text-large | 3.62 | 3.51 | 3.46 | 3 |
| `--c-ios-red` | `#ff3b30` | text-large | 3.55 | 3.44 | 3.39 | 3 |
| `--c-text-muted-alt` | `#898888` | text-large | 3.53 | 3.43 | 3.38 | 3 |
| `--c-success` | `#16a34a` | text-large | 3.30 | 3.19 | 3.15 | 3 |
| `--c-info` | `#1e90ff` | text-large | 3.24 | 3.14 | 3.09 | 3 |
| `--c-status-accepted` | `#00a72f` | text-large | 3.20 | 3.10 | 3.06 | 3 |
| `--c-status-dropoff` | `#00b100` | fill | 2.88 | 2.79 | 2.75 | 0 |
| `--c-success-alt` | `#18b85f` | fill | 2.61 | 2.53 | 2.49 | 0 |
| `--c-warning-strong` | `#fb8500` | fill | 2.48 | 2.41 | 2.37 | 0 |
| `--c-accent-light` | `#ff887c` | fill | 2.32 | 2.25 | 2.21 | 0 |
| `--c-success-vivid` | `#22c55e` | fill | 2.28 | 2.21 | 2.18 | 0 |
| `--c-warning` | `#ff9800` | fill | 2.16 | 2.09 | 2.06 | 0 |
| `--c-warning-vivid` | `#f59e0b` | fill | 2.15 | 2.08 | 2.05 | 0 |
| `--c-status-pickup` | `#ff9900` | fill | 2.14 | 2.08 | 2.05 | 0 |
| `--c-secondary` | `#ffe34e` | fill | 1.28 | 1.25 | 1.23 | 0 |

## Роли

| Роль | Требование | Где применять |
|---|---|---|
| `text` | ≥ 4.5:1 | обычный текст любого размера |
| `text-large` | ≥ 3:1 | крупный текст: ≥ 24px, либо ≥ 18.66px полужирный |
| `non-text` | ≥ 3:1 | значимые иконки, границы полей ввода, индикаторы состояния |
| `fill` | не нормируется | заливка-подложка; цвет не должен быть единственным носителем смысла — рядом обязателен текстовый дубль |
| `decorative` | — | декор и неактивные (disabled) элементы — WCAG их не нормирует |
| `surface` | — | фон, относительно которого считается контраст |

