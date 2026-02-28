# Design Tokens 規範庫 (Design Tokens & Variables)

本文件定義系統中所有的設計變量，是從 Figma 交付至代碼的唯一真理來源。

## 1. 色彩系統 (Color Palette - Earth Tones)

採用語意化命名 (Semantic Naming)，以支援未來的主題擴展。

| 變量名稱 | 色值 (HEX) | 語意用途 |
| :--- | :--- | :--- |
| `--color-bg-main` | `#FAF9F6` (Warm Sand) | 全域背景，降低視覺疲勞。 |
| `--color-primary` | `#E07A5F` (Terracotta) | 主要 CTA 按鈕、關鍵心理指標高亮。 |
| `--color-secondary` | `#81B29A` (Sage Green) | 成功狀態、進步提示、平靜情緒。 |
| `--color-accent` | `#F2CC8F` (Soft Gold) | 特別回饋、金牌獎牌、高成就標示。 |
| `--color-text-main` | `#3D3831` (Dark Espresso) | 主要閱讀文字，取代純黑 (#000)。 |
| `--color-text-muted` | `#706C61` | 次要描述、Placeholder、輔助訊息。 |
| `--color-border` | `#E5E2D9` | 輕量分隔線與容器邊框。 |

## 2. 字階與排版 (Typography Scale)

| 層級 (Token) | 大小 (px/rem) | 字重 (Weight) | 用途 |
| :--- | :--- | :--- | :--- |
| `text-display` | 36px / 2.25rem | 700 (Bold) | 大標題、404、關鍵得分。 |
| `text-h1` | 24px / 1.5rem | 600 (Semibold) | 頁面主標題。 |
| `text-h2` | 20px / 1.25rem | 600 (Semibold) | 區塊卡片標題。 |
| `text-body` | 16px / 1rem | 400 (Regular) | 主要對話訊息、專家文案。 |
| `text-label` | 14px / 0.875rem | 500 (Medium) | 按鈕文字、欄位標籤。 |
| `text-caption` | 12px / 0.75rem | 400 (Regular) | 時間戳、註腳文字。 |

## 3. 間距與柵格 (Spacing & Grid)

採用 4px 增量系統，確保視覺平衡。

*   **Base Unit**: `4px`
*   **Gap Scale**:
    - `space-xs`: 4px
    - `space-sm`: 8px
    - `space-md`: 16px (標準組件內距)
    - `space-lg`: 24px (組件間距)
    - `space-xl`: 32px (區塊間距)
*   **Grid Specs**:
    - Mobile: 4 Columns / 16px Margin / 16px Gutter.
    - Desktop: 12 Columns / Auto Margin (Max-width: 1280px) / 24px Gutter.

## 4. 陰影與深度 (Elevations)

*   **Elev-1 (Surface)**: `shadow-sm` (低深度，用於 Card)。
*   **Elev-2 (Floating)**: `shadow-md` (中深度，用於 Hover 狀態)。
*   **Elev-3 (Overlay)**: `shadow-lg` (高深度，用於 Dialog/Popover)。
