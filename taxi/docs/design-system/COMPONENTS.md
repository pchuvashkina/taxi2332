# Components

Инвентарь фактических компонентов проекта. Документ описывает то, что есть в коде, включая известные расхождения — иначе он бесполезен при работе.

Счётчик «использований» — число файлов, импортирующих компонент.

## Базовые

### Button

`src/components/Button` · 25 использований · самый переиспользуемый компонент системы.

```tsx
import Button, { EButtonShapes, EButtonStyles } from 'components/Button'
```

| Проп | Тип | Назначение |
|---|---|---|
| `text` | `string` | подпись кнопки |
| `svg` | `ReactElement` | иконка вместо или рядом с подписью |
| `label` | `string` | вспомогательная подпись под кнопкой |
| `shape` | `EButtonShapes` | `Default` \| `Flat` |
| `buttonStyle` | `EButtonStyles` | `Default` \| `RedDesign` |
| `status` | `EStatuses` | состояние операции, управляет видом подписи |
| `colorType` | `EColorTypes` | цветовая схема |
| `fixedSize` | `boolean` | фиксированные размеры вместо растяжения |
| `checkLogin` | `boolean` | перед действием требовать авторизацию |
| `skipHandler` | `boolean` | не вызывать встроенный обработчик |
| `wrapperProps` | `ComponentProps<'div'>` | пропы контейнера |
| `imageProps` | `ComponentProps<'img'>` | пропы изображения |

Наследует все атрибуты `<button>`.

**Модификаторы в SCSS:** `--flat`, `--fixed`, `--accent`, `--red-design`, `--success`, `--fail`.

**Известные расхождения.** Вариант оформления задаётся тремя разными способами одновременно — `shape`, `buttonStyle`, `colorType` — и они частично пересекаются. Плюс компонент подключён к Redux ради `checkLogin`, что делает его непригодным для чисто презентационного использования. Унификация API — часть задачи `UIKIT-BTN`.

**Главный долг.** В коде 69 сырых `<button>` мимо компонента: `PassengerLiveOrder` (11), `Header` (9), `VotingForm` (7), `DriverEmulatorPanel` (7). Каждая несёт собственные цвет, радиус, отступы и состояния.

### Input

`src/components/Input` · 8 использований.

Поле ввода с поддержкой масок (`react-input-mask`), подсказок адресов и типизированных источников подсказки.

Типы подсказок (`ESuggestionType`): `PointOfficial` — официальный адрес, `PointUnofficial` — неофициальный, `PointUserTop` — частый адрес пользователя. Каждый тип имеет свой класс и визуальное отличие.

Имеет собственный файл переменных `_index.scss` с высотой поля.

### PageSection

`src/components/PageSection` · 5 использований.

Контейнер секции страницы.

| Проп | Тип | Назначение |
|---|---|---|
| `scrollable` | `boolean \| undefined` | `true` — скролл включён, `false` — выключен, `undefined` — поведение по умолчанию |
| `className` | `string` | дополнительный класс |

Трёхзначная логика `scrollable` намеренная: `undefined` означает «не вмешиваться».

### Icon

`src/components/Icon` · 3 использования. Обёртка вывода иконок.

## Доменные

### OrderId

`src/components/OrderId` · 12 использований · второй по переиспользованию.

Единый показ идентификатора заказа.

| Проп | Тип | Назначение |
|---|---|---|
| `orderId` | `IOrder['b_id'] \| number \| null` | идентификатор |
| `variant` | `'full' \| 'short'` | `full` — полный id с выделенным суффиксом (`12345-67`), `short` — только суффикс (`67`) |
| `withSign` | `boolean` | показывать префикс `№` |

Хороший пример правильного компонента: одна ответственность, явные варианты, документирован в коде.

### CarClassBadge

`src/components/CarClassBadge` · 3 использования.

| Проп | Тип | Назначение |
|---|---|---|
| `kind` | `'grand' \| 'petit'` | класс автомобиля |
| `compact` | `boolean` | уменьшенный вид |

Изображение выводится с `alt=""`, смысл передан через `aria-label` контейнера — корректная реализация требования 1.1.1.

### MiniOrder / MiniOrders

`src/components/MiniOrder`, `src/components/MiniOrders`.

Карточка заказа в компактном виде и горизонтальная лента таких карточек. Цвет рамки карточки отражает статус и берётся из `orderStatusColor` — отдельных токенов, не сливаемых с `danger` / `success`.

### PassengerLiveOrder

`src/components/PassengerLiveOrder`.

Активный заказ пассажира. Самый нагруженный доменный компонент: 11 сырых `<button>` внутри.

### CarClassSlider, SeatSlider, Glide

Слайдеры выбора класса авто и числа мест, обёртка над Glide.

### Map

`src/components/Map` · 2 использования.

Карта на Leaflet. Единственное место, где цвета задаются литералами, а не переменными: Leaflet выставляет их из JavaScript, где `var()` не резолвится. Использует `mapColor` и `categorical.mapRoute` из `styles/tokens`.

## Модальные окна

`src/components/modals` — **24 модальных компонента**.

Инфраструктура: `Modal.tsx` (база), `ModalStack.tsx` (стек), `Overlay.tsx` (затемнение).

Доменные: `LoginModal`, `CancelModal`, `DriverCancelModal`, `DriverTripCancelModal`, `DriverChoiceCancelReasonModal`, `CandidatesModal`, `DriverModal`, `VoteModal`, `RatingModal`, `SeatsModal`, `PickTimeModal`, `TakePassengerModal`, `OnTheWayModal`, `AlarmModal`, `MessageModal`, `CommentsModal`, `ProfileModal`, `MapModal`, `CardModal`, `CardDetailsModal`, `TieCardModal`, `DeleteFileModal`.

**Известное расхождение.** Количество отражает органический рост: несколько модалок отмены различаются только текстом и одним действием. Кандидаты на слияние в параметризованный компонент подтверждения, но это рефакторинг поведения, а не стилей, и в рамках работы над китом не делался.

Слои: затемнение `--z-overlay`, окно `--z-modal`.

## Прочие

`Header`, `Layout`, `Card`, `Chat`, `JSONForm`, `PriceInput`, `LocationInput`, `RadioCheckbox`, `ShortInfo`, `BoundaryButtons`, `ErrorBlock`, `Alert`, `CompareVariants`, `ConstructorTab`, `HTML`, `Theme`, `DriverEmulatorPanel` (инструмент разработки), `OrderMode*` (четыре компонента режима заказа).

## Правила для новых компонентов

1. Цвета — только `var(--c-*)`. Примитивы `--p-*` в компонентах запрещены.
2. Размеры — из шкал: `--fs-*`, `--s-*`, `--r-*`, `--z-*`.
3. Медиазапросы — только через `bp.bp-down()` / `bp.bp-up()`.
4. Кнопка — компонент `Button`, не сырой `<button>`.
5. Значения состояний (`hover`, `disabled`, `loading`) описываются явно, а не наследуются случайно.
6. Значимые изображения — `aria-label` или осмысленный `alt`; декоративные — `alt=""`.

Пункты 1–3 проверяются автоматически (`npm run lint:tokens`), 4–6 — при ревью.
