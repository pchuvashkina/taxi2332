// ВНИМАНИЕ: файл сгенерирован из src/styles/tokens.json.
// Руками не править — изменения затрёт `npm run tokens:build`.

/**
 * Токены для TS/TSX.
 *
 * `color` — CSS-переменные. Использовать везде, где значение попадает в CSS:
 *   style={{ color: color.accent }}, SVG stroke={color.accent}.
 *
 * `colorRaw` — литералы. Только там, где var() не резолвится: Leaflet, canvas,
 * meta-теги. Каждое такое место — документированное исключение (см.
 * src/styles/ALLOWED_EXCEPTIONS.md), а не обход системы.
 */

export const color = {
  "surface": "var(--c-surface)",
  "surface-canvas": "var(--c-surface-canvas)",
  "surface-subtle": "var(--c-surface-subtle)",
  "border": "var(--c-border)",
  "text-primary": "var(--c-text-primary)",
  "text-secondary": "var(--c-text-secondary)",
  "text-muted": "var(--c-text-muted)",
  "text-disabled": "var(--c-text-disabled)",
  "black": "var(--c-black)",
  "accent": "var(--c-accent)",
  "accent-light": "var(--c-accent-light)",
  "accent-dark": "var(--c-accent-dark)",
  "accent-darkest": "var(--c-accent-darkest)",
  "secondary": "var(--c-secondary)",
  "navy": "var(--c-navy)",
  "icon": "var(--c-icon)",
  "danger": "var(--c-danger)",
  "danger-alt": "var(--c-danger-alt)",
  "warning": "var(--c-warning)",
  "warning-strong": "var(--c-warning-strong)",
  "warning-bg": "var(--c-warning-bg)",
  "success": "var(--c-success)",
  "success-alt": "var(--c-success-alt)",
  "success-bg": "var(--c-success-bg)",
  "info": "var(--c-info)",
  "accent-text": "var(--c-accent-text)",
  "danger-alt-text": "var(--c-danger-alt-text)",
  "warning-text": "var(--c-warning-text)",
  "warning-strong-text": "var(--c-warning-strong-text)",
  "success-text": "var(--c-success-text)",
  "success-alt-text": "var(--c-success-alt-text)",
  "info-text": "var(--c-info-text)",
  "secondary-text": "var(--c-secondary-text)",
  "text-muted-text": "var(--c-text-muted-text)",
  "icon-disabled": "var(--c-icon-disabled)",
  "status-accepted": "var(--c-status-accepted)",
  "status-pickup": "var(--c-status-pickup)",
  "status-dropoff": "var(--c-status-dropoff)",
  "success-vivid": "var(--c-success-vivid)",
  "warning-vivid": "var(--c-warning-vivid)",
  "danger-vivid": "var(--c-danger-vivid)",
  "success-bg-soft": "var(--c-success-bg-soft)",
  "warning-bg-soft": "var(--c-warning-bg-soft)",
  "danger-bg-soft": "var(--c-danger-bg-soft)",
  "success-bg-strong": "var(--c-success-bg-strong)",
  "warning-bg-strong": "var(--c-warning-bg-strong)",
  "danger-bg-strong": "var(--c-danger-bg-strong)",
  "text-muted-alt": "var(--c-text-muted-alt)",
  "warning-dark": "var(--c-warning-dark)",
  "info-violet": "var(--c-info-violet)",
  "border-soft": "var(--c-border-soft)",
  "teal-dark": "var(--c-teal-dark)",
  "danger-pure": "var(--c-danger-pure)",
  "info-pure": "var(--c-info-pure)",
  "ios-red": "var(--c-ios-red)",
  "ios-blue": "var(--c-ios-blue)",
  "info-bright": "var(--c-info-bright)"
} as const

export const colorRaw = {
  "surface": "#ffffff",
  "surface-canvas": "#fffbf4",
  "surface-subtle": "#f8fafc",
  "border": "#e5e7eb",
  "text-primary": "#111827",
  "text-secondary": "#64748b",
  "text-muted": "#858585",
  "text-disabled": "#bababa",
  "black": "#000000",
  "accent": "#ff2400",
  "accent-light": "#ff887c",
  "accent-dark": "#991b0e",
  "accent-darkest": "#600000",
  "secondary": "#ffe34e",
  "navy": "#001f43",
  "icon": "#1c274c",
  "danger": "#d32f2f",
  "danger-alt": "#ec4c60",
  "warning": "#ff9800",
  "warning-strong": "#fb8500",
  "warning-bg": "#fff7ed",
  "success": "#16a34a",
  "success-alt": "#18b85f",
  "success-bg": "#eafbf0",
  "info": "#1e90ff",
  "accent-text": "#e32000",
  "danger-alt-text": "#e41832",
  "warning-text": "#a86400",
  "warning-strong-text": "#b25e00",
  "success-text": "#12863d",
  "success-alt-text": "#128645",
  "info-text": "#0072e1",
  "secondary-text": "#897300",
  "text-muted-text": "#747474",
  "icon-disabled": "#bdbdbd",
  "status-accepted": "#00a72f",
  "status-pickup": "#ff9900",
  "status-dropoff": "#00b100",
  "success-vivid": "#22c55e",
  "warning-vivid": "#f59e0b",
  "danger-vivid": "#ef4444",
  "success-bg-soft": "#ecfdf3",
  "warning-bg-soft": "#fff7e6",
  "danger-bg-soft": "#fff1f1",
  "success-bg-strong": "#bbf7d0",
  "warning-bg-strong": "#fed7aa",
  "danger-bg-strong": "#fecaca",
  "text-muted-alt": "#898888",
  "warning-dark": "#9a3412",
  "info-violet": "#6d28d9",
  "border-soft": "#eeeeee",
  "teal-dark": "#004444",
  "danger-pure": "#ff0000",
  "info-pure": "#0000ff",
  "ios-red": "#ff3b30",
  "ios-blue": "#007aff",
  "info-bright": "#3883fa"
} as const

/** Качественные палитры: порядок и различимость значимы. Не сортировать, не схлопывать. */
export const categorical = {
  "driverRoute": [
    "#0066FF",
    "#00CC00",
    "#AA00FF",
    "#FF8800",
    "#00B8D4",
    "#FFD600",
    "#FF00AA",
    "#00E5FF",
    "#FF66CC",
    "#001F99",
    "#B8E600"
  ],
  "mapRoute": [
    "#2563EB",
    "#16A34A",
    "#F59E0B",
    "#7C3AED",
    "#0891B2",
    "#65A30D",
    "#0F766E",
    "#9333EA"
  ]
} as const

/** Семантика карты. Leaflet задаёт цвета из JS — нужны литералы. */
export const mapColor = {
  "routeActive": "#FF3B30",
  "markerStroke": "#FFFFFF",
  "markerDriver": "#1E88FF",
  "markerPickup": "#FF9900",
  "markerDropoff": "#00B100"
} as const

/** Цвета статуса заказа. Роль важнее оттенка. */
export const orderStatusColor = {
  "waiting": "#FFD12E",
  "accepted": "#00A72F",
  "neutral": "#FFFFFF"
} as const

export const alertColor = {
  "error": "#f44336",
  "warning": "#ff9800",
  "success": "#4caf50",
  "info": "#2196f3"
} as const
export const fontSize = {
  "xxs": "10px",
  "xs": "12px",
  "sm": "14px",
  "md": "16px",
  "lg": "18px",
  "xl": "24px",
  "xxl": "32px"
} as const
export const space = {
  "1": "4px",
  "2": "8px",
  "3": "12px",
  "4": "16px",
  "6": "24px",
  "8": "32px"
} as const
export const radius = {
  "xs": "4px",
  "sm": "8px",
  "md": "12px",
  "lg": "16px",
  "full": "999px"
} as const
export const zIndex = {
  "base": "1",
  "sticky": "10",
  "dropdown": "100",
  "overlay": "1000",
  "modal": "2000",
  "toast": "3000",
  "tooltip": "4000"
} as const
export const breakpoint = {
  "xs": "360px",
  "sm": "380px",
  "md": "560px",
  "lg": "768px",
  "xl": "1024px"
} as const

export type SemanticColor = keyof typeof color
