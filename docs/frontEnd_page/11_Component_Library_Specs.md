# 自定義組件庫詳細規範 (Component Library Specs)

本文件將 `shadcn/ui` 基礎組件與 SELf-corner 的商業組件進行標準化，確保全站 UI 的一致性與原子級交互。

## 1. 商業組件規範 (Custom Business Components)

### 1.1 ScenarioCard (情境卡片)
*   **Structure**: Emoji (Icon) + Title + Tags + Description Preview。
*   **Tokens**:
    - Padding: `24px` (space-lg)。
    - Border-radius: `16px` (rounded-2xl)。
*   **State Matrix**:
    - `Default`: `bg-card`, `shadow-sm`。
    - `Hover`: `scale: 1.02`, `shadow-md`, `border-primary/40`。
    - `Disabled`: `opacity-50`, `grayscale`。

### 1.2 ChatBubble (對話氣泡)
*   **Design**: 
    - 老師氣泡：`bg-primary`, `text-white`, `rounded-tr-none`。
    - 學生氣泡：`bg-muted`, `text-main`, `rounded-tl-none`。
*   **Micro-interaction**: 新氣泡出現時帶有 200ms 的 `Slide-in` 與 `Bounce`。

## 2. 基礎組件覆蓋規範 (Base UI Overrides)

### 2.1 Buttons
*   **Primary**: 使用 Terracotta (#E07A5F)，陰影 `shadow-primary/20`。
*   **Outline**: 1px border `border-muted`, Hover 時背景變為 `bg-muted/50`。

### 2.2 Inputs / Textareas
*   **Focus State**: 全域禁用瀏覽器默認藍框，改用 `ring-2 ring-primary/20`。
*   **Error State**: 下方顯示 12px 的輔助文字，且 Input 邊框變為 Destructive。

## 3. 圖表規範 (Chart Specs)
*   **RadarChart**: 
    - 頂點標籤 (Labels): `text-label` (Dark Espresso)。
    - 線條 (Stroke): `stroke-primary/30`。
    - 節點 (Dots): 僅在資料點上顯示小圓圈，直徑 4px。
