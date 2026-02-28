# 響應式與無障礙設計規範 (Responsive & a11y Spec)

本平台旨在服務所有類型的教師，包含對科技較不熟悉的用戶，因此「易用性」與「兼容性」是硬性指標。

## 1. 響應式策略 (Responsive Breakpoints)

| Breakpoint | 寬度 | 佈局行為 |
| :--- | :--- | :--- |
| **Mobile** | < 640px | 單欄佈局，導航收納入 HamburgerMenu，字體放大 10%。 |
| **Tablet** | 640px - 1024px | 兩欄佈局，側邊選單可收合 (Compact mode)。 |
| **Desktop** | > 1024px | 三欄佈局 (Feedback)，側邊選單常駐或抽屜式。 |

### 適配重點：
*   **Touch Targets**: Mobile 端所有可點擊按鈕最小尺寸為 `44x44px`。
*   **Virtual Keyboard**: Chatroom 在移動端開啟鍵盤時，輸入框應固定在鍵盤上方，不遮擋學生頭像。

## 2. 無障礙設計 (Accessibility / a11y)

遵循 **WCAG 2.1 AA** 標準。

*   **Color Contrast**: 主要文字與背景對比度需至少 `4.5:1`。
*   **Keyboard Navigation**:
    - 所有 Dialog 必須支持 `Esc` 關閉。
    - 所有互動元素必須具備明確的 `Focus Ring`。
*   **Screen Readers**: 
    - 學生表情切換時，隱藏的 `aria-live` 區域應告知當前情緒 (例："學生現在感到難過")。
    - 所有的 Icon (如 Help, Settings) 必須配有 `aria-label`。

## 3. 低性能設備適配
*   如果偵測到設備效能較低，自動關閉雷達圖的漸變效果與複雜的 Blur (毛玻璃) 效果。
