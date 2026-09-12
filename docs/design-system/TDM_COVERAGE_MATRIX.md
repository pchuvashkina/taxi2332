
# TDM UI Coverage Matrix

Данный документ содержит полный инвентарь UI-элементов TDM (`Guseyn9/taxi`) и сопоставление с дизайн-системой `taxi2332` (Taxi DS).

## Matrix

| TDM Element | TDM Path | Type | Usage | Taxi DS Element | Taxi Path | Status | Required Action | Rationale |
|---|---|---|---|---|---|---|---|---|
| `Button` | `src/components/Button` | primitive | Общие кликабельные действия и отправка форм | `Button` | `src/components/ui/Button` | `PARTIAL` | Перевести внутренние варианты стилей на токены DS и унифицировать API пропсов. | Компонент существует в DS, но TDM-версия содержит кастомные SCSS-классы и неполное покрытие токенов состояний (hover/active/focus). |
| Raw `<button>` | `src/components/**`, `src/pages/**` | control | Инлайн-кнопки в картах, модалках и списках (~69 шт.) | `Button` / `IconButton` | `src/components/ui/Button` | `DUPLICATE` | Заменить прямые HTML-теги `<button>` на DS `Button` или `IconButton`. | Нативные кнопки обходят дизайн-токены, стили фокуса и доступности (a11y). |
| `Card` | `src/components/Card` | primitive | Контейнеры контента и карточки выбора | `Card` | `src/components/ui/Card` | `PARTIAL` | Заменить кастомные SCSS-стили карточек на семантические токены граней и фона (`surface`/`border`). | В DS есть базовый Card, но TDM Card использует собственные хардкод-отступы и тени. |
| `GrouppedInputs` | `src/components/GrouppedInputs` | composite component | Группы полей ввода в формах заказа | `Input` / `FormGroup` | `src/components/ui/Input` | `PARTIAL` | Унифицировать обертку группы с использованием токенов `gap` и `border` из DS. | Отдельные поля используют DS, но контейнер группы содержит хардкод отступов и рамок. |
| `Checkbox` | `src/components/Checkbox` | primitive | Чекбоксы в модальных окнах и фильтрах | `Checkbox` | `src/components/ui/Checkbox` | `COVERED` | None | Полностью соответствует примитиву DS Checkbox с поддержкой токенов состояний. |
| `DateTimeIntervalInput` | `src/components/DateTimeIntervalInput` | composite component | Выбор времени и интервала предварительного заказа | `Input` / `TimePicker` | `src/components/ui/DateTimePicker` | `MISSING` | Создать составной паттерн `DateTimePicker` в DS на базе MUI x-date-pickers с токенизацией. | Использует MUI DatePicker с нетокенизированными CSS-оверрайдами без аналога в DS. |
| `BigTruckServices` | `src/components/BigTruckServices` | composite component | Выбор специализированных услуг для грузового такси | `ChipGroup` / `CardGrid` | `src/components/ui/ChipGroup` | `SPECIALIZED` | Обернуть контейнер в токены DS, сохранив специфичную доменную логику выбора услуг. | Доменно-специфичный элемент грузоперевозок; семантически закрывается сеткой чипов/карточек, но имеет уникальную бизнес-логику. |
| `Block` | `src/components/Block` | primitive | Структурный контейнер-обертка секций | `Container` / `Card` | `src/components/ui/Container` | `COVERED` | None | Структурный примитив, полностью соответствующий DS Container. |
| `BoundaryButtons` | `src/components/BoundaryButtons` | control | Плавающие кнопки масштабирования и границ карты | `IconButton` / `ButtonGroup` | `src/components/ui/ButtonGroup` | `PARTIAL` | Перевести плавающие кнопки карты на DS `IconButton` / `ButtonGroup` с токенами `elevation`. | Использует хардкод absolute-позиционирования, z-index и собственные стили теней. |
| `Burger` | `src/components/Burger` | control | Кнопка вызова бокового меню (гамбургер) | `IconButton` / `Drawer` | `src/components/ui/IconButton` | `PARTIAL` | Заменить внешнюю библиотеку `react-hamburger-button` на DS `IconButton` с токенизированной SVG-иконкой. | Завязано на устаревшую зависимость `react-hamburger-button` с локальными стилями. |
| `DriverStatusAvatar` | `src/components/DriverStatusAvatar` | component | Аватар водителя с индикатором текущего статуса | `Avatar` + `Badge` | `src/components/ui/Avatar` | `COVERED` | None | Напрямую сопоставляется с составным паттерном DS Avatar + Status Badge. |
| `DriverStatusIcon` | `src/components/DriverStatusIcon` | component | Иконка статуса водителя в списках | `Badge` / `Icon` | `src/components/ui/Badge` | `COVERED` | None | Напрямую сопоставляется с примитивом DS Badge. |
| `ErrorFrame` | `src/components/ErrorFrame` | component | Граница/экран отображения ошибок | `Alert` / `Banner` | `src/components/ui/Alert` | `PARTIAL` | Перевести стили плашек ошибок на токены `color.error` и компоненты DS Alert. | Содержит хардкод красных и розовых оттенков (RGB/HEX) вместо цветовых токенов DS. |
| `LoadFrame` | `src/components/LoadFrame` | component | Оверлей и индикатор загрузки | `Spinner` / `Backdrop` | `src/components/ui/Spinner` | `COVERED` | None | Использует стандартный DS Backdrop и Spinner. |
| `OpacityLayer` | `src/components/OpacityLayer` | utility/demo UI | Затемняющий слой для карт и модалок | `Backdrop` | `src/components/ui/Backdrop` | `DUPLICATE` | Заменить использование `OpacityLayer` на единый DS `Backdrop`. | Дублирует функциональность и стили системного DS Backdrop. |
| `OrderModeButton` | `src/components/OrderModeButton` | control | Переключатель режимов заказа | `ToggleButtonGroup` | `src/components/ui/ToggleButton` | `PARTIAL` | Заменить на DS `ToggleButtonGroup` с поддержкой активных токенов состояния. | Кастомная кнопка с локальным SCSS для отображения активного режима. |
| `OrderModeDecisionModal` | `src/components/OrderModeDecisionModal` | modal | Модальное окно подтверждения режима заказа | `Modal` / `Dialog` | `src/components/ui/Modal` | `PARTIAL` | Перевести верстку окна, кнопки и оверлей на DS Modal и DS Button. | Использует нативные кнопки и хардкод отступов внутри модального контейнера. |
| `OrderModeSubModeModal` | `src/components/OrderModeSubModeModal` | modal | Модальное окно выбора подрежима заказа | `Modal` / `Dialog` | `src/components/ui/Modal` | `PARTIAL` | Перевести на DS Modal и DS Radio/Checkbox Group. | Аналогичный технический долг, как и у `OrderModeDecisionModal`. |
| `OrderModeToast` | `src/components/OrderModeToast` | component | Всплывающее уведомление о смене режима | `Toast` / `Snackbar` | `src/components/ui/Toast` | `PARTIAL` | Заменить кастомный плавающий div на компонент DS Toast. | Реализовано через ручное фиксированное позиционирование и локальный SCSS. |
| `ShortInfo` | `src/components/ShortInfo` | component | Плашка краткой информации о заказе | `Card` / `Banner` | `src/components/ui/Card` | `COVERED` | None | Отображается через DS Card с использованием типографических токенов. |
| `loader` | `src/components/loader` | primitive | Локальный строчный спиннер | `Spinner` | `src/components/ui/Spinner` | `DUPLICATE` | Удалить локальный `loader` и перевести вызовы на DS `Spinner`. | Дублирует примитив DS Spinner в папке со строчным наименованием. |
| `objectHints` | `src/components/objectHints` | map UI | Тултип / подсказка для объектов на карте | `Tooltip` / `Popover` | `src/components/ui/Tooltip` | `SPECIALIZED` | Применить токены типографики и elevation DS к обертке подсказок Leaflet. | Специфичный элемент карты, жестко связанный с API Leaflet; визуальная роль соответствует Tooltip. |
| `order` / `OrderCard` | `src/components/order` | composite component | Карточка заказа в списке активных и истории | `Card` | `src/components/ui/Card` | `PARTIAL` | Отрефакторить внутренние кнопки и статусы на примитивы DS. | Контейнер использует DS Card, но дочерние элементы содержат legacy-стили. |
| `passenger-order` | `src/components/passenger-order` | page-level UI | Экран активного заказа пассажира | `Container` / `PageLayout` | `src/pages/PassengerLiveOrder` | `PARTIAL` | Заменить сырые обертки и кнопки на DS PageLayout, DS Card и DS Button. | Композитный экран, смешивающий компоненты DS с сырыми HTML-тегами и кастомными статусами. |
| `rooms` | `src/components/rooms` | composite component | Выбор мульти-назначений / комнат | `List` / `CardGrid` | `src/components/ui/List` | `SPECIALIZED` | Применить внутренние примитивы DS ListItem и DS Button. | Доменная фича выбора комнат/тарифов, требующая специализированной раскладки. |
| `separator` | `src/components/separator` | primitive | Визуальный разделитель | `Divider` | `src/components/ui/Divider` | `COVERED` | None | Напрямую сопоставляется с DS Divider. |
| `slider` | `src/components/slider` | control | Ползунок выбора значений | `Slider` | `src/components/ui/Slider` | `COVERED` | None | Полностью покрывается примитивом DS Slider. |
| `switch-slider` | `src/components/switch-slider` | control | Переключатель (свитч) | `Switch` | `src/components/ui/Switch` | `COVERED` | None | Напрямую сопоставляется с примитивом DS Switch. |
| `tabs` | `src/components/tabs` | composite component | Панель вкладок | `Tabs` | `src/components/ui/Tabs` | `PARTIAL` | Перевести индикатор активной вкладки и состояния ховера на токены DS. | Кастомная реализация вкладок с хардкодом цвета активной границы. |
| `version-info` | `src/components/version-info` | utility/demo UI | Футер с версией сборки | `Typography` / `Tag` | `src/components/ui/Tag` | `LEGACY-UI` | Оставить как отладочный элемент или перенести в системную панель. | Технический элемент для отладки версий, не являющийся продуктовым UI пассажира/водителя. |
| Map Routes & Markers | `src/components/Map` | map UI | Маршрут водителя (`categorical.driverRoute`), маршрут пассажира (`categorical.mapRoute`), пины посад/высад | `MapOverlay` / `Marker` | `src/components/ui/Map` | `SPECIALIZED` | Сохранить разделение палитр маршрутов; токенизировать оверлеи и маркеры. | Разделение палитр `driverRoute` и `mapRoute` функционально обосновано разграничением ролей водителя и пассажира. |

---

## Summary

```text
Total TDM UI elements: 31

COVERED: 8
PARTIAL: 13
DUPLICATE: 3
MISSING: 1
SPECIALIZED: 5
LEGACY-UI: 1

```

### Blockers for next stage

Следующие элементы требуют обязательной доработки в рамках ТЗ №2 (Component Unification):

1. **`Button` & Raw `<button>**`
* **Причина:** Широкое присутствие (~69) сырых тегов `<button>` и неполная токенизация базового `Button`.
* **Требуемое DS-решение:** Замена на DS `Button` / `IconButton`, токенизация всех состояний.
* **Уровень изменений:** `usage` + `component`.


2. **`DateTimeIntervalInput`**
* **Причина:** Полное отсутствие DS-компонента для выбора даты и времени заказа.
* **Требуемое DS-решение:** Создание составного DS-компонента `DateTimePicker` с оберткой над MUI.
* **Уровень изменений:** `new component`.


3. **`OrderModeDecisionModal` & `OrderModeSubModeModal**`
* **Причина:** Кастомная верстка критических модальных окон выбора режимов заказа без использования DS Modal.
* **Требуемое DS-решение:** Рефакторинг на базе примитива DS `Modal`.
* **Уровень изменений:** `usage`.


4. **`OrderModeToast` & `ErrorFrame**`
* **Причина:** Хардкод позиционирования и системных цветов ошибок/уведомлений.
* **Требуемое DS-решение:** Замена на DS `Toast` и DS `Alert` с токенами `color.error` / `color.info`.
* **Уровень изменений:** `usage` + `pattern`.



### Accepted specialized elements

Следующие элементы намеренно остаются специализированными и не объединяются с базовыми примитивами:

1. **`BigTruckServices`** — доменный компонент выбора спецификаций грузового автопарка. Контейнер токенизируется, но бизнес-логика и компоновка остаются уникальными.
2. **`objectHints`** — тултипы карты, непосредственно интегрированные в жизненный цикл слоев Leaflet.
3. **`rooms`** — специализированный интерфейс мульти-выбора назначений/комнат с индивидуальной раскладкой.
4. **`categorical.driverRoute` vs `categorical.mapRoute**` — разделение цветовых палитр маршрута водителя и пассажира сохраняется для обеспечения контрастности и различимости ролей на карте.

```

```
