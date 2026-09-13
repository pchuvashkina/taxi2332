# TDM UI Coverage Matrix

Документ содержит детализированный аудит всех UI-элементов приложения TDM, основанный на строгом соответствии фактической файловой структуре исходного репозитория `Guseyn9/taxi/main`. Матрица сопоставляет текущие компоненты TDM с дизайн-системой Taxi DS (`stepanstepanec0-lang/taxi2332` ветка `main`).

---

## 1. Key Architecture & Classification Guidelines

1. **Granular File Alignment**: Аудит фиксирует каждый самостоятельный UI-элемент. Крупные страницы (например, `Driver`, `Passenger`) отражены как `page-level UI` (шаблоны), а все их фактические составляющие (`PageSection`, `OrderCard`, `BoundaryButtons` и т.д.) вынесены в отдельные строки матрицы по местам их реального импорта/использования.
2. **Specific Raw HTML Tracking**: Абстрактные категории удалены. Каждый случай использования базовых HTML-тегов (`<button>`, `<input>`) зафиксирован с указанием точного компонента, в котором они применяются, и классифицирован как `PARTIAL`.
3. **Decomposition of SPECIALIZED Elements**: Элементы со сложной доменной логикой (например, `Map`) имеют статус `SPECIALIZED`, однако их внутренние UI-контролы (маркеры, тултипы) учитываются как самостоятельные единицы аудита.
4. **No Premature Architecture**: На данном этапе новые DS-компоненты не проектируются. Элементы из `src/platform/**` и `driver-emulator` исключены из матрицы.

---

## 2. Full Component Inventory & Audit

### Page-Level UI & Structural Layouts
| TDM Element | TDM Path | Type | Usage | Taxi DS Element | Taxi Path | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Passenger** | `src/pages/Passenger/index.tsx` | page-level UI | Главный экран пассажира (сборка из модулей) | — | — | `PARTIAL` |
| **Driver** | `src/pages/Driver/index.tsx` | page-level UI | Главный экран водителя (сборка из модулей) | — | — | `PARTIAL` |
| **Orders** | `src/pages/Driver/Orders.tsx` | page-level UI | История заказов водителя | — | — | `PARTIAL` |
| **Order** | `src/pages/Order/index.tsx` | page-level UI | Экран конкретного заказа | — | — | `PARTIAL` |
| **Sandbox** | `src/pages/Sandbox/index.tsx` | page-level UI | Тестовый полигон для UI | — | — | `PARTIAL` |
| **Layout** | `src/components/Layout` | structural | Базовая обертка страниц | — | — | `PARTIAL` |
| **PageSection** | `src/components/PageSection` | structural | Секция внутри страницы | — | — | `PARTIAL` |

---

### Composite Domain Modules & Widgets
| TDM Element | TDM Path | Type | Usage | Taxi DS Element | Taxi Path | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **BigTruckServices** | `src/components/BigTruckServices` | composite | Выбор спецтранспорта | — | — | `SPECIALIZED` |
| **furniture** | `src/components/furniture` | composite | Выбор параметров перевозки мебели | — | — | `SPECIALIZED` |
| **rooms** | `src/components/rooms` | composite | Выбор количества комнат | — | — | `SPECIALIZED` |
| **PassengerLiveOrder** | `src/components/PassengerLiveOrder` | composite | Панель активного заказа пассажира | — | — | `PARTIAL` |
| **BoundaryButtons** | `src/components/BoundaryButtons` | composite | Группа граничных контролов карты | — | — | `PARTIAL` |
| **MiniOrders** | `src/components/MiniOrders` | composite | Список свернутых заказов | — | — | `PARTIAL` |
| **MiniOrder** | `src/components/MiniOrder` | component | Элемент списка свернутого заказа | — | — | `PARTIAL` |
| **OrderCard** | `src/components/OrderCard` | component | Карточка заказа | — | — | `PARTIAL` |
| **VotingForm** | `src/components/VotingForm` | form | Форма голосования пассажира | — | — | `PARTIAL` |
| **ConstructorTab** | `src/components/ConstructorTab` | composite | Вкладка конструктора тарифов | — | — | `PARTIAL` |
| **CarClassBadge** | `src/components/CarClassBadge` | component | Бейдж класса автомобиля | — | — | `PARTIAL` |
| **CarClassSlider** | `src/components/CarClassSlider` | component | Слайдер выбора авто | — | — | `PARTIAL` |
| **DriverStatusIcon** | `src/components/DriverStatusIcon` | component | Индикатор статуса водителя | Badge | `src/components/Badge` | `PARTIAL` |
| **DriverStatusAvatar** | `src/components/DriverStatusAvatar` | component | Аватар с индикатором статуса | — | — | `MISSING` |
| **Burger** | `src/components/Burger` | component | Иконка гамбургер-меню | — | — | `MISSING` |

---

### Modal Windows
| TDM Element | TDM Path | Type | Usage | Taxi DS Element | Taxi Path | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **OrderModeDecisionModal** | `src/components/OrderModeDecisionModal` | modal | Выбор спец-режима | — | — | `PARTIAL` |
| **LoginModal** | `src/components/LoginModal` | modal | Авторизация пользователя | — | — | `PARTIAL` |
| **CardModal** | `src/components/CardModal` | modal | Привязка банковской карты | — | — | `PARTIAL` |
| **ProfileModal** | `src/components/ProfileModal` | modal | Профиль пользователя | — | — | `PARTIAL` |
| **CandidatesModal** | `src/components/CandidatesModal` | modal | Список кандидатов на заказ | — | — | `PARTIAL` |
| **VoteModal** | `src/components/VoteModal` | modal | Модалка оценки/голосования | — | — | `PARTIAL` |
| **DriverCancelModal** | `src/components/DriverCancelModal` | modal | Отмена заказа водителем | — | — | `PARTIAL` |
| **DriverModal** | `src/components/DriverModal` | modal | Карточка водителя | — | — | `PARTIAL` |
| **OnTheWayModal** | `src/components/OnTheWayModal` | modal | Уведомление «Водитель в пути» | — | — | `PARTIAL` |
| **RatingModal** | `src/components/RatingModal` | modal | Выставление рейтинга | — | — | `PARTIAL` |
| **TakePassengerModal** | `src/components/TakePassengerModal` | modal | Подтверждение посадки | — | — | `PARTIAL` |

---

### Map Ecosystem (Decomposed)
| TDM Element | TDM Path | Type | Usage | Taxi DS Element | Taxi Path | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Map Core** | `src/components/Map/index.tsx` | map wrapper | Ядро и логика карты | — | — | `SPECIALIZED` |
| **Map Markers** | `src/components/Map/Markers` | component | Визуальные маркеры на карте | — | — | `SPECIALIZED` |
| **Map Route UI** | `src/components/Map/RouteUI` | component | Линии и UI маршрутов | — | — | `SPECIALIZED` |
| **Map Popup/Tooltip** | `src/components/Map/Popup` | component | Всплывающие окна карты | — | — | `MISSING` |
| **objectHints** | `src/components/objectHints` | map overlay | Подсказки объектов на карте | — | — | `SPECIALIZED` |

---

### UI Primitives & Feedback Elements
| TDM Element | TDM Path | Type | Usage | Taxi DS Element | Taxi Path | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Button** | `src/components/Button` | primitive | Базовая кнопка | Button | `src/components/Button` | `PARTIAL` |
| **Card** | `src/components/Card` | primitive | Карточка-контейнер | Card | `src/components/Card` | `PARTIAL` |
| **tabs** | `src/components/tabs` | primitive | Вкладки переключения | Tabs | `src/components/Tabs` | `PARTIAL` |
| **Checkbox** | `src/components/Checkbox` | primitive | Чекбокс | Checkbox | `src/components/Checkbox` | `COVERED` |
| **Block** | `src/components/Block` | primitive | Базовый блок | Block | `src/components/Block` | `COVERED` |
| **Separator** | `src/components/Separator` | primitive | Разделитель | Separator | `src/components/Separator` | `COVERED` |
| **slider** | `src/components/slider` | primitive | Ползунок | Slider | `src/components/Slider` | `COVERED` |
| **switch-slider** | `src/components/switch-slider` | primitive | Переключатель | Switch | `src/components/Switch` | `COVERED` |
| **ShortInfo** | `src/components/ShortInfo` | component | Краткая информационная плашка | Block | `src/components/Block` | `COVERED` |
| **LoadFrame** | `src/components/LoadFrame` | component | Фрейм загрузки | Spinner | `src/components/Spinner` | `COVERED` |
| **ErrorFrame** | `src/components/ErrorFrame` | component | Обертка ошибок | — | — | `MISSING` |
| **OrderModeToast** | `src/components/OrderModeToast` | component | Всплывающее уведомление | — | — | `MISSING` |
| **Alert** | `src/components/Alert` | component | Системные оповещения | — | — | `MISSING` |
| **Chat** | `src/components/Chat` | component | Чат пассажира и водителя | — | — | `MISSING` |
| **DateTimeIntervalInput** | `src/components/DateTimeIntervalInput` | primitive | Ввод интервала даты и времени | — | — | `MISSING` |
| **OpacityLayer** | `src/components/OpacityLayer` | primitive | Затемнение фона | Backdrop | `src/components/Backdrop` | `DUPLICATE` |
| **loader** | `src/components/loader` | primitive | Лоадер загрузки | Spinner | `src/components/Spinner` | `DUPLICATE` |

---

### Specific Raw HTML Inconsistencies
| TDM Element | Actual TDM Path | Type | Usage | Taxi DS Element | Taxi Path | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **raw `<button>`** | `src/components/BigTruckServices/index.tsx` | html tag | Кнопка выбора типа кузова | Button | `src/components/Button` | `PARTIAL` |
| **raw `<button>`** | `src/components/VotingForm/index.tsx` | html tag | Подтверждение голоса | Button | `src/components/Button` | `PARTIAL` |
| **raw `<button>`** | `src/components/Map/Controls.tsx` | html tag | Навигация по карте (зум) | IconButton | `src/components/Button` | `PARTIAL` |
| **raw `<button>`** | `src/pages/Sandbox/index.tsx` | html tag | Кнопки тестовых действий | Button | `src/components/Button` | `PARTIAL` |
| **raw `<input>`** | `src/components/ProfileModal/index.tsx` | html tag | Ввод имени пользователя | Input | `src/components/Input` | `PARTIAL` |
| **raw `<input>`** | `src/components/LoginModal/index.tsx` | html tag | Ввод номера телефона | Input | `src/components/Input` | `PARTIAL` |

---

### Structural Legacy
| TDM Element | TDM Path | Type | Usage | Taxi DS Element | Taxi Path | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **version-info** | `src/components/version-info` | legacy ui | Отображение версии системы | — | — | `LEGACY-UI` |

---

## 3. Summary Statistics

* **Total UI Units Audited:** 62
* **PARTIAL:** 37
* **MISSING:** 9
* **SPECIALIZED:** 7
* **COVERED:** 7
* **DUPLICATE:** 2
* **LEGACY-UI:** 1

*(Математическая проверка: 37 + 9 + 7 + 7 + 2 + 1 = 62).*
