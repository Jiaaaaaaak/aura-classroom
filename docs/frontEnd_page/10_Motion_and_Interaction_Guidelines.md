# 動態與交互指南 (Motion & Interaction Guidelines)

動態設計不只是裝飾，它是 SELf-corner 提供「情緒反饋」的關鍵路徑。

## 1. 動態原則 (Motion Principles)

*   **自然過渡 (Naturalism)**: 遵循物理規律，避免生硬的線性位移。
*   **低干擾 (Low Cognitive Load)**: 避免大規模頁面閃爍，僅在焦點改變時使用動態。
*   **回應性 (Responsiveness)**: 所有的 User Action 必須在 100ms 內給予視覺反饋。

## 2. 核心動畫定義 (Specs)

### 2.1 曲線 (Easings)
*   **Standard**: `cubic-bezier(0.4, 0, 0.2, 1)` - 用於大多數移動。
*   **Decelerate**: `cubic-bezier(0.0, 0, 0.2, 1)` - 用於元素進入畫面。
*   **Accelerate**: `cubic-bezier(0.4, 0, 1, 1)` - 用於元素退出畫面。

### 2.2 持續時間 (Durations)
*   **Instant**: 100ms (微小的狀態切換，如 Hover)。
*   **Prompt**: 200ms (小組件展開/收合)。
*   **Smooth**: 300ms (對話訊息氣泡進入)。
*   **Deliberate**: 500ms (頁面轉場、雷達圖動態繪製)。

## 3. 關鍵場景互動規範

### 3.1 對話訊息流 (Chat Stream)
*   **新訊息進入**: `Y-axis offset: 20px -> 0`, `Opacity: 0 -> 1`。
*   **打字中狀態 (Thinking)**: 三個點的 `Pulse` 動畫，錯開 150ms 延遲。

### 3.2 學生表情切換 (Avatar Transition)
*   **切換模式**: Cross-fade。
*   **特殊反饋**: 當偵測到高壓情緒 (憤怒) 時，Avatar 可加入微小的 `Shake` 抖動效果 (振幅 2px)。

### 3.3 暫停與遮罩 (Pause Overlay)
*   **效果**: `backdrop-blur: 0 -> 4px`, `bg-opacity: 0 -> 0.4`。
*   **文字出現**: 從中心略微放大 (`scale: 0.95 -> 1.0`)。

## 4. 性能考量
*   優先使用 `transform` 與 `opacity` 進行動畫，避免觸發 Browser Re-layout。
*   針對 `prefers-reduced-motion` 用戶應自動關閉非必要的裝飾性動畫。
