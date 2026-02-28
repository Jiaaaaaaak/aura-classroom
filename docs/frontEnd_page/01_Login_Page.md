# 登入頁面規範 (Login Page Spec)

`/login` 頁面不僅是入口，更是建立「安全感」的第一步。

## 1. 視覺目標 (Visual Goal)
*   **Aesthetic**: 溫暖、簡約、高可信度。
*   **Layout**: Center-aligned card layout。

## 2. 組件拆解 (Atomic Breakdown)

### 2.1 Atoms (原子)
*   `LoginInput`: 繼承自 `shadcn/ui` Input，具備微小的 `focus-ring-primary/20`。
*   `PrimaryButton`: `bg-primary` (Terracotta)，Hover 時略微加深色值。
*   `BrandSlogan`: "每個老師，都需要一個能安心犯錯的角落。" (Italic, text-muted-foreground)。

### 2.2 Molecules (分子)
*   `PasswordField`: 包含可視性切換按鈕 (Eye/EyeOff)，切換時具備 150ms 的動畫。
*   `ValidationMessage`: 錯誤提示使用 `text-destructive` (柔和紅)，而非刺眼紅。

## 3. 狀態矩陣 (State Matrix)

| 狀態 | 視覺表現 | 觸發條件 |
| :--- | :--- | :--- |
| **Empty** | Login 按鈕 Disabled。 | 欄位未填寫。 |
| **Validating** | 按鈕顯示 `Loader2` 動畫，文字變為 "驗證中..."。 | 點擊登入後。 |
| **Error** | 輸入框邊框變為 `destructive` 色調，下方出現 Shake 動畫。 | API 回傳錯誤。 |
| **Success** | 全頁面漸隱 (Opacity: 1 -> 0)，導向 `/home`。 | 驗證通過。 |

## 4. 交互規範 (Interactions)
*   **Enter Key**: 在密碼框按下 Enter 應等同於點擊登入。
*   **Dialog Transition**: 註冊/忘記密碼彈窗彈出時，背景使用 `blur-sm`。
