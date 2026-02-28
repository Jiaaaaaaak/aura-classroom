# 個人資料與成長中心規範 (Info & Profile Spec)

`/info` 頁面聚焦於用戶身份與成就感。

## 1. 核心組件

### 1.1 StatsBanner (統計標語)
*   **Visual**: 橫向排列的數值卡片。
*   **Metric**: "總練習次數"、"獲得專家肯定次數"、"最常應對的情緒類型"。
*   **Animation**: 數字滾動動畫 (Count-up effect)。

### 1.2 ProfileForm
*   **Edit State**: 點擊編輯後，靜態文字淡出，輸入框淡入。
*   **Avatar Management**: 圓形頭像，Hover 時顯示相機圖標 Overlay。

## 2. 交互規範
*   **Feedback**: 儲存成功後，使用 `sonner` 彈出 Sage Green (成功) 的通知，帶有「資料已同步」的字樣。
*   **Validation**: 實時驗證 Email 格式與姓名長度。

## 3. 數據敏感性
*   密碼等敏感操作需引導至「安全設定」獨立區塊 (預留)。
