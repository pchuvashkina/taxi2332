# TDM UI Coverage Matrix

Документ содержит обновленный аудит всех UI-элементов приложения TDM (`src/components/**` и `src/pages/**`), проверенных на соответствие фактической файловой структуре исходного репозитория, и их сопоставление с текущим состоянием дизайн-системы Taxi DS (`stepanstepanec0-lang/taxi2332` ветка `main`).

---

## 1. Key Architecture & Classification Guidelines

1. **Strict File Alignment**: Матрица содержит только реальные директории и файлы из `src/components/**` и `src/pages/**`. Элементы из `src/platform/**` и эмулятора `driver-emulator` в данный аудит не входят.
2. **SPECIALIZED Status**: Присваивается компонентам со специфичной доменной логикой или уникальной версткой. Данный статус **не освобождает** внутренние элементы компонента (кнопки, инпуты, карточки) от обязательной токенизации и замены на примитивы Taxi DS в рамках ТЗ №2.
3. **MISSING Status**: Означает отсутствие прямого визуального или функционального аналога в Taxi DS. На данном этапе аудита **не проектируются** будущие компоненты DS.
4. **Raw HTML Elements**: Все случаи использования базовых HTML-тегов (`<button>`, `<input>`) классифицированы как `PARTIAL` с обязательным требованием миграции на примитивы DS.

---

## 2. Full Component Inventory & Audit

### Page-Level UI & Main Views
| TDM Element | TDM Path | Type | Usage | Taxi DS Element | Taxi Path | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Passenger** | `src/pages/Passenger` | page-level UI | Главный экран пассажира | — | — | `PARTIAL` |
| **Driver** | `src/pages/Driver` | page-level UI | Главный экран водителя | — | — | `PARTIAL` |

---

### Composite & Domain Modules
| TDM Element | TDM Path | Type | Usage | Taxi DS Element | Taxi Path | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **BigTruckServices** | `src/components/BigTruckServices` | composite | Выбор спецтранспорта | — | — | `SPECIALIZED` |
| **ConstructorTab** | `src/components/ConstructorTab` | composite | Вкладка конструктора тарифов | — | — | `PARTIAL` |
| **furniture** | `src/components/furniture` | composite | Выбор параметров перевозки мебели | — | — | `SPECIALIZED` |
| **rooms** | `src/components/rooms` | composite | Выбор количества комнат | — | — | `SPECIALIZED` |
| **CompareVariants** | `src/components/CompareVariants` | composite | Сравнение вариантов тарифов | — | — | `MISSING` |
| **BoundaryButtons** | `src/components/BoundaryButtons` | composite | Группа граничных контролов | — | — | `PARTIAL` |

---

### Modal Windows (Decomposed)
| TDM Element | TDM Path | Type | Usage | Taxi DS Element | Taxi Path | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
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
| **OrderModeModal** | `src/components/OrderModeModal` | modal | Выбор спец-режима (Межгород / Доставка) | — | — | `PARTIAL` |

---

### Standalone UI & Feedback Controls
| TDM Element | TDM Path | Type | Usage | Taxi DS Element | Taxi Path | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **PassengerLiveOrder** | `src/components/PassengerLiveOrder` | component | Панель активного заказа пассажира | — | — | `PARTIAL` |
| **CarClassBadge** | `src/components/CarClassBadge` | component | Бейдж класса автомобиля | — | — | `PARTIAL` |
| **CarClassSlider** | `src/components/CarClassSlider` | component | Слайдер выбора авто | — | — | `PARTIAL` |
| **DriverStatusIcon** | `src/components/DriverStatusIcon` | component | Индикатор статуса водителя | Badge | `src/components/Badge` | `PARTIAL` |
| **ShortInfo** | `src/components/ShortInfo` | component | Краткая информационная плашка | Block | `src/components/Block` | `COVERED` |
| **LoadFrame** | `src/components/LoadFrame` | component | Фрейм загрузки | Spinner | `src/components/Spinner` | `COVERED` |
| **Alert** | `src/components/Alert` | component | Системные оповещения | — | — | `MISSING` |
| **Chat** | `src/components/Chat` | component | Чат пассажира и водителя | — | — | `MISSING` |
| **OrderModeToast** | `src/components/OrderModeToast` | component | Всплывающее уведомление | — | — | `MISSING` |
| **ErrorFrame** | `src/components/ErrorFrame` | component | Обертка ошибок | — | — | `MISSING` |
| **DriverStatusAvatar** | `src/components/DriverStatusAvatar` | component | Аватар с индикатором статуса | — | — | `MISSING` |
| **Burger** | `src/components/Burger` | component | Иконка гамбургер-меню | — | — | `MISSING` |

---

### Raw HTML Contexts
| TDM Element | TDM Path | Type | Usage | Taxi DS Element | Taxi Path | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **raw `<button>` (Map Controls)** | `src/components/Map` | html tag | Кнопки управления картой | Button / IconButton | `src/components/Button` | `PARTIAL` |
| **raw `<button>` (Modal Actions)** | `src/components/*Modal` | html tag | Кнопки действий в модалках | Button | `src/components/Button` | `PARTIAL` |
| **raw `<button>` (Forms)** | `src/components/Forms` | html tag | Кнопки отправки форм | Button | `src/components/Button` | `PARTIAL` |

---

### UI Primitives & Base Controls
| TDM Element | TDM Path | Type | Usage | Taxi DS Element | Taxi Path | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Button** | `src/components/Button` | primitive | Базовая кнопка | Button | `src/components/Button` | `PARTIAL` |
| **Card** | `src/components/Card` | primitive | Карточка-контейнер | Card | `src/components/Card` | `PARTIAL` |
| **Checkbox** | `src/components/Checkbox` | primitive | Чекбокс | Checkbox | `src/components/Checkbox` | `COVERED` |
| **Block** | `src/components/Block` | primitive | Базовый блок | Block | `src/components/Block` | `COVERED` |
| **OrderModeButton** | `src/components/OrderModeButton` | primitive | Переключатель режима | Button | `src/components/Button` | `PARTIAL` |
| **tabs** | `src/components/tabs` | primitive | Вкладки переключения | Tabs | `src/components/Tabs` | `PARTIAL` |
| **separator** | `src/components/separator` | primitive | Разделитель | Separator | `src/components/Separator` | `COVERED` |
| **slider** | `src/components/slider` | primitive | Ползунок | Slider | `src/components/Slider` | `COVERED` |
| **switch-slider** | `src/components/switch-slider` | primitive | Переключатель | Switch | `src/components/Switch` | `COVERED` |
| **OpacityLayer** | `src/components/OpacityLayer` | primitive | Затемнение фона | Backdrop | `src/components/Backdrop` | `DUPLICATE` |
| **loader** | `src/components/loader` | primitive | Лоадер загрузки | Spinner | `src/components/Spinner` | `DUPLICATE` |
| **DateTimeIntervalInput** | `src/components/DateTimeIntervalInput` | primitive | Ввод интервала даты и времени | — | — | `MISSING` |

---

### Maps, Overlays & Structural Legacy
| TDM Element | TDM Path | Type | Usage | Taxi DS Element | Taxi Path | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Map** | `src/components/Map` | map overlay | Маркеры и линии маршрутов | — | — | `SPECIALIZED` |
| **objectHints** | `src/components/objectHints` | map overlay | Подсказки объектов на карте | — | — | `SPECIALIZED` |
| **version-info** | `src/components/version-info` | legacy ui | Отображение версии системы | — | — | `LEGACY-UI` |

---

## 3. Summary Statistics

* **Total UI Units Audited:** 49
* **COVERED:** 7
* **PARTIAL:** 26
* **DUPLICATE:** 2
* **MISSING:** 8
* **SPECIALIZED:** 5
* **LEGACY-UI:** 1
