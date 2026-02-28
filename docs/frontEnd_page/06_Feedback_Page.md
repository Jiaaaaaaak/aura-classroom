# 專家回饋與深度分析規範 (Feedback & Analysis Spec)

`/feedback` 是教學閉環的核心，需兼顧專業性與情感支持。

## 1. 視覺佈局 (Complex Grid Layout)

### 1.1 Radar Chart (五力圖)
*   **Component**: `Recharts RadarChart`。
*   **Styling**: 
    - 背景網格使用 `stroke-muted/20`。
    - 填充區使用 `fill-primary` (Opacity: 0.5)。
    - 動態：進入頁面後 800ms 內緩慢撐開。

### 1.2 Feedback Content (專家建議)
*   **Typography**: 精確控制段落行高 (`leading-relaxed`)。
*   **Visual Cue**: 針對「原本可以怎麼說」的部分，使用 `blockquote` 樣式並加註 `Quote` icon。

### 1.3 AI Coach Chat (對話回顧)
*   **Interaction**: 用戶可點擊逐字稿中的特定句子，系統自動在 AI 顧問對話框中填入「請針對這句話給我更多細節」。

## 2. 數據呈現方式 (Tabs)
*   **Transcript View**: 對話氣泡排列，標註每句話的「情緒標籤」。
*   **Expert View**: 針對關鍵節點 (Crucial Moments) 進行高亮。

## 3. CTA Action
*   "重試一次": 回到 Chatroom，但帶入上一次的情境參數。
*   "分享練習": (預留) 生成一張帶有雷達圖的精美分享卡片。
