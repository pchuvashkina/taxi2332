# TDM UI Coverage Matrix

Документ содержит фактический аудит UI-элементов и архитектурных модулей приложения TDM (`Guseyn9/taxi`, включая модуль `src/platform/**` из `PI_INTEGRATION_MAP.md`) и их сопоставление с текущим состоянием дизайн-системы Taxi DS (`stepanstepanec0-lang/taxi2332` ветка `main`).

---

## 1. Page-Level UI & Main Views

| TDM Element | TDM Path | Type | Usage | Taxi DS Element | Taxi Path | Status | Required Action | Rationale |
|---|---|---|---|---|---|---|---|---|
| `PassengerLiveOrder` | `src/components/PassengerLiveOrder`, `src/pages/Passenger` | page-level UI | Экран активного заказа пассажира с картой и статусами | — | — | `PARTIAL` | Декомпозировать страницу на паттерны DS (`Card`, `Button`, `Badge`) | Каркас использует смеси нативных элементов и локальных оберток; требует системного применения DS-компонентов. |
| `DriverDashboard / DriverMap` | `src/pages/Driver/Map.tsx`, `src/pages/Driver/index.tsx` | page-level UI | Главный рабочий экран водителя и HUD-интерфейс | — | — | `PARTIAL` | Перевести информационные блоки и статусы на DS `Card` и `Badge` | Экран содержит сырые теги и кастомные стилевые контейнеры поверх `driverMapGateway`. |
| `OrdersPage` | `src/pages/Driver/Orders.tsx` | page-level UI | Список доступных и активных заказов водителя | — | — | `PARTIAL` | Заменить локальные списки на DS `Card` и DS `Button` | Страница содержит смешанные элементы управления и нативные обертки. |
| `OrderDetailsPage` | `src/pages/Order/index.tsx` | page-level UI | Экран детальной информации о конкретном заказе | — | — | `PARTIAL` | Унифицировать карточки параметров через DS `Card` и DS `Button` | Использованы кастомные блоки с прямыми вызовами шлюзов. |
| `PassengerVoting` | `src/pages/Passenger/VotingForm.tsx` | page-level UI | Форма голосования и выбора условий пассажиром | — | — | `PARTIAL` | Перевести элементы формы на DS `Button` и DS `Input` | Содержит нативные кнопки и локальные SCSS-отступы. |

---

## 2. Platform Interface Core (`src/platform/**`)

| TDM Element | TDM Path | Type | Usage | Taxi DS Element | Taxi Path | Status | Required Action | Rationale |
|---|---|---|---|---|---|---|---|---|
| `PlatformInterfaceRuntime & SurfaceRegistry` | `src/platform/platform-interface/` | core architecture | Ядро исполнения поверхностей (Driver, Passenger, Map surfaces) | — | — | `SPECIALIZED` | Сохранить архитектурное ядро; токенизировать связанные Surface UI компоненты | Системный слой рантайма без прямого визуального эквивалента в DS. |
| `MapChannel & Protocol` | `src/platform/map-channel/` | core architecture | Протокол взаимодействия и маппинга событий карты | — | — | `SPECIALIZED` | Сохранить структуру взаимодействия; применить DS-токены к визуальным откликам | Инфраструктурный слой обмена сообщениями карты. |
| `Interaction Contracts` | `src/platform/interaction-contract/` | domain contract | Контракты действий, событий и моделей данных | — | — | `SPECIALIZED` | None | Строгие доменные контракты данных, не имеющие UI-представления. |
| `Adapters & Gateways` | `src/platform/adapters/` | adapter layer | Шлюзы `DriverMapGateway`, `FsmTaxiCommandTransport`, `LegacyBackendGateway` | — | — | `SPECIALIZED` | None | Сервисные адаптеры взаимодействия с бэкендом и FSM. |

---

## 3. Composite Components & Feature Modules

| TDM Element | TDM Path | Type | Usage | Taxi DS Element | Taxi Path | Status | Required Action | Rationale |
|---|---|---|---|---|---|---|---|---|
| `Chat` | `src/components/Chat` | composite component | Модуль переписки между водителем и пассажиром | — | — | `MISSING` | Сформировать паттерн Chat/MessageList в DS или токенизировать текущий | В текущей ветке `main` Taxi DS отсутствуют компоненты сообщений и чата. |
| `ConstructorTab` | `src/components/ConstructorTab` | composite component | Вкладки конструктора параметров заказа | `Tabs` | `src/components/Tabs` | `PARTIAL` | Перевести внутренние кнопки и контейнеры конструктора на DS | Использует концепцию вкладок DS, но дочерние элементы содержат нативную верстку. |
| `CompareVariants` | `src/components/CompareVariants` | composite component | Таблица сравнения вариантов тарифов и условий | — | — | `MISSING` | Разработать карточный паттерн сравнения на базе DS `Card` | В Taxi DS отсутствует готовый паттерн сравнения тарифов. |
| `DriverEmulatorPanel` | `src/components/DriverEmulatorPanel` | composite component | Панель эмулятора действий водителя для отладки | — | — | `SPECIALIZED` | Токенизировать цвета и фоны; оставить как инженерный инструмент | Служебный UI для разработчиков, не входит в продуктовый интерфейс пользователей. |
| `furniture` | `src/components/furniture` | composite component | Выбор опций перевозки мебели и крупногабарита | — | — | `SPECIALIZED` | Обернуть сетку в токены DS; закрепить уникальную доменную логику | Специализированный доменный блок. Структура сохраняется, но внутренние контролы требуют токенизации. |
| `BigTruckServices` | `src/components/BigTruckServices` | composite component | Выбор специализированных услуг для грузового такси | — | — | `SPECIALIZED` | Заменить внутренние нативные кнопки на DS `Button` и применить токены | Структурно компонент уникален, но его внутренний UI пока не соответствует DS. |
| `GrouppedInputs` | `src/components/GrouppedInputs` | composite component | Группы полей ввода в формах заказа | `Input` | `src/components/Input` | `PARTIAL` | Обернуть группу в системный контейнер DS с токенами `gap` | Поля используют DS `Input`, но обертка группы содержит локальные SCSS-отступы. |
| `rooms` | `src/components/rooms` | composite component | Селектор комнат и адресов назначения | — | — | `SPECIALIZED` | Токенизировать внутреннюю сетку и перевести кнопки на DS `Button` | Уникальный интерфейс мульти-выбора. Требует токенизации внутренних элементов. |
| `LocationInput` | `src/components/LocationInput` | composite component | Поле ввода адреса с кнопками геопозиции и очистки | `Input` | `src/components/Input` | `PARTIAL` | Заменить кастомные иконки-кнопки на DS `Button` / `IconButton` | Поле ввода базовое, но кнопки сброса и геопозиционирования выполнены сырыми тегами. |
| `Header` | `src/components/Header` | composite component | Шапка приложения с навигацией и профилем | `Container` | `src/components/Container` | `PARTIAL` | Перевести элементы навигации на DS `Button` | Контейнер использует DS, но внутренние переключатели не токенизированы. |
| `MiniOrders` / `MiniOrder` | `src/components/MiniOrders`, `src/components/MiniOrder` | composite component | Компактные карточки заказов в списках | `Card` | `src/components/Card` | `PARTIAL` | Отрефакторить кнопки действий и плашки статусов внутри карточек | Каркас карточки соответствует DS `Card`, но внутренние кнопки и статусы выполнены в legacy-стиле. |

---

## 4. Components & Modals System

| TDM Element | TDM Path | Type | Usage | Taxi DS Element | Taxi Path | Status | Required Action | Rationale |
|---|---|---|---|---|---|---|---|---|
| `CarClassBadge` | `src/components/CarClassBadge` | component | Плашка с классом автомобиля (Эконом, Комфорт и др.) | `Badge` | `src/components/Badge` | `PARTIAL` | Перевести цветовые схемы классов на семантические токены DS | Использован DS `Badge`, но палитра классов захардкожена в SCSS. |
| `CarClassSlider` | `src/components/CarClassSlider` | component | Слайдер выбора класса автомобиля | `Slider` | `src/components/Slider` | `PARTIAL` | Перевести карточки вариантов на DS `Card` и связку с DS `Slider` | Кастомная обертка над слайдером, требующая токенизации активных состояний. |
| `DateTimeIntervalInput` | `src/components/DateTimeIntervalInput` | component | Выбор даты, времени и интервала предварительного заказа | — | — | `MISSING` | Создать DS-компонент `DateTimePicker` на следующем этапе | В текущей ветке `main` Taxi DS полностью отсутствует компонент работы с датой и временем. |
| `Modals Manager & Common Modals` | `src/components/modals/*` (`LoginModal`, `CardModal`, `ProfileModal`, `CandidatesModal`, `VoteModal`, `DriverCancelModal`, `DriverModal`, `OnTheWayModal`, `RatingModal`, `TakePassengerModal`) | modal system | Система модальных окон приложения | `Modal` | `src/components/Modal` | `PARTIAL` | Перевести обертки всех окон на DS `Modal`, очистить от нативных кнопок | Базовый менеджер и обертки используют DS `Modal`, но содержимое окон содержит нетокенизированные кнопки и поля. |
| `OrderModeDecisionModal` | `src/components/OrderModeDecisionModal` | modal | Модальное окно подтверждения режима заказа | `Modal` | `src/components/Modal` | `PARTIAL` | Заменить внутренние кастомные кнопки на DS `Button`, применить DS `Modal` | Контейнер не токенизирован, кнопки выполнены через нативные теги. |
| `OrderModeSubModeModal` | `src/components/OrderModeSubModeModal` | modal | Модальное окно выбора подрежима заказа | `Modal` | `src/components/Modal` | `PARTIAL` | Перевести списки выбора и кнопки закрытия на DS `Button` | Аналогичный долг по токенизации содержимого окна. |
| `OrderModeToast` | `src/components/OrderModeToast` | component | Всплывающее уведомление о смене режима | — | — | `MISSING` | Создать системный DS-компонент `Toast` / `Snackbar` | В текущем Taxi DS отсутствует компонент тостов/уведомлений. |
| `ErrorFrame` | `src/components/ErrorFrame` | component | Экран/плашка отображения ошибок | — | — | `MISSING` | Разработать DS-компонент `Alert` с поддержкой токенов ошибок | В текущем DS нет аналогичной системы плашек ошибок. |
| `DriverStatusAvatar` | `src/components/DriverStatusAvatar` | component | Аватар водителя с индикатором статуса | — | — | `MISSING` | Создать DS-компонент `Avatar` с поддержкой статусов | В текущей ветке `main` Taxi DS отсутствует компонент `Avatar`. |
| `DriverStatusIcon` | `src/components/DriverStatusIcon` | component | Иконка текущего состояния водителя | `Badge` | `src/components/Badge` | `COVERED` | None | Напрямую сопоставляется с имеющимся в DS компонентом `Badge`. |
| `ShortInfo` | `src/components/ShortInfo` | component | Плашка краткой информации о заказе | `Card` | `src/components/Card` | `COVERED` | None | Корректно отображается через существующий DS `Card`. |

---

## 5. Contextual Breakdown of Raw UI Elements

| Context / Location | TDM Path | Type | Usage | Taxi DS Element | Taxi Path | Status | Required Action | Rationale |
|---|---|---|---|---|---|---|---|---|
| `Raw <button> (Map Controls)` | `src/components/BoundaryButtons`, `src/components/Map` | control | Кнопки масштабирования, границ и слоев карты | — | — | `SPECIALIZED` | Применить токены `elevation` и фонов, сохранив Leaflet-позиционирование | Нативные кнопки оправданы интеграцией с API Leaflet; требуется только токенизация. |
| `Raw <button> (Modal Actions)` | `src/components/modals/*`, `src/components/OrderModeDecisionModal` | control | Кнопки закрытия, отмены и действия в модалках | `Button` | `src/components/Button` | `DUPLICATE` | Заменить все нативные теги `<button>` на DS `Button` | Нарушают гайдлайны кнопок и доступности (a11y) внутри модальных окон. |
| `Raw <button> (Forms & Page Controls)` | `src/components/GrouppedInputs`, `src/pages/*` | control | Кнопки отправки форм, переключатели в полях | `Button` | `src/components/Button` | `DUPLICATE` | Перевести на DS `Button` | Прямое дублирование имеющегося в DS компонента `Button` нативными тегами. |

---

## 6. Primitives & Base Controls

| TDM Element | TDM Path | Type | Usage | Taxi DS Element | Taxi Path | Status | Required Action | Rationale |
|---|---|---|---|---|---|---|---|---|
| `Button` | `src/components/Button` | primitive | Базовая кнопка TDM | `Button` | `src/components/Button` | `PARTIAL` | Унифицировать API пропсов и перевести SCSS-стили на токены | Компонент есть в обоих репозиториях, но TDM-версия использует кастомный SCSS. |
| `Card` | `src/components/Card` | primitive | Базовый контейнер-карточка | `Card` | `src/components/Card` | `PARTIAL` | Заменить кастомные отступы и тени на семантические токены DS | Компонент есть в DS, но TDM-версия содержит локальный SCSS. |
| `Checkbox` | `src/components/Checkbox` | primitive | Чекбокс | `Checkbox` | `src/components/Checkbox` | `COVERED` | None | Полностью соответствует реализации в DS. |
| `Block` | `src/components/Block` | primitive | Структурный контейнер | `Container` | `src/components/Container` | `COVERED` | None | Соответствует примитиву DS `Container`. |
| `Burger` | `src/components/Burger` | control | Кнопка гамбургер-меню | — | — | `MISSING` | Заменить `react-hamburger-button` на DS `Button` с иконкой | В DS нет отдельного гамбургера; требуется замена внешней библиотеки. |
| `LoadFrame` | `src/components/LoadFrame` | component | Индикатор загрузки | `Spinner` | `src/components/Spinner` | `COVERED` | None | Использует существующий DS `Spinner`. |
| `OpacityLayer` | `src/components/OpacityLayer` | utility UI | Оверлей затемнения | `Backdrop` | `src/components/Backdrop` | `DUPLICATE` | Удалить `OpacityLayer`, перевести вызовы на DS `Backdrop` | Дублирует функциональность имеющегося DS `Backdrop`. |
| `OrderModeButton` | `src/components/OrderModeButton` | control | Переключатель режимов заказа | `Button` | `src/components/Button` | `PARTIAL` | Перевести на DS `Button` с вариацией активного состояния | Использована кастомная обертка поверх кнопок. |
| `loader` | `src/components/loader` | primitive | Локальный строчный спиннер | `Spinner` | `src/components/Spinner` | `DUPLICATE` | Удалить локальный `loader`, перевести на DS `Spinner` | Дублирует имеющийся в DS `Spinner`. |
| `separator` | `src/components/separator` | primitive | Разделитель | `Divider` | `src/components/Divider` | `COVERED` | None | Полностью соответствует DS `Divider`. |
| `slider` | `src/components/slider` | control | Ползунок | `Slider` | `src/components/Slider` | `COVERED` | None | Полностью соответствует DS `Slider`. |
| `switch-slider` | `src/components/switch-slider` | control | Переключатель (свитч) | `Switch` | `src/components/Switch` | `COVERED` | None | Полностью соответствует DS `Switch`. |
| `tabs` | `src/components/tabs` | composite component | Панель вкладок | `Tabs` | `src/components/Tabs` | `PARTIAL` | Перевести кастомные границы и ховеры на токены DS | Использует DS `Tabs`, но содержит кастомный SCSS. |
| `version-info` | `src/components/version-info` | utility UI | Футер с версией сборки | — | — | `LEGACY-UI` | Оставить как отладочный служебный элемент | Не относится к продуктовой дизайн-системе. |

---

## 7. Map UI & Overlays

| TDM Element | TDM Path | Type | Usage | Taxi DS Element | Taxi Path | Status | Required Action | Rationale |
|---|---|---|---|---|---|---|---|---|
| `Map Routes & Markers` | `src/components/Map` | map UI | Линии маршрутов и маркеры подачи/высадки | — | — | `SPECIALIZED` | Сохранить разделение палитр `driverRoute`/`mapRoute`, токенизировать оверлеи | Разделение цветов обосновано разграничением ролей водителя и пассажира. |
| `objectHints` | `src/components/objectHints` | map UI | Подсказки объектов карты Leaflet | — | — | `SPECIALIZED` | Применить токены типографики к обертке Leaflet | Специфично для API карт Leaflet. |

---

## Summary Statistics

* **Total Evaluated UI Units:** 50
* **COVERED:** 8
* **PARTIAL:** 19
* **DUPLICATE:** 4
* **MISSING:** 7
* **SPECIALIZED:** 11
* **LEGACY-UI:** 1

---

## Key Architecture Guidelines

1. **Разделение понятия SPECIALIZED:** Присвоение статуса `SPECIALIZED` (например, для `BigTruckServices`, `rooms`, `furniture`, `PlatformInterfaceRuntime`) указывает на то, что компонент имеет уникальную доменную/архитектурную компоновку и не объединяется в один базовый примитив. Это **не означает**, что его внутренние элементы уже токенизированы — их внутренние кнопки и инпуты подлежат унификации в ТЗ №2.
2. **Фактическое состояние Taxi DS (`main`):** Все несуществующие пути к компонентам (такие как `Avatar`, `Toast`, `DateTimePicker`, `Chat`) помечены статусом `MISSING`, а пути DS указаны как `—`.
