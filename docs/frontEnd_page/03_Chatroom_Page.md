# 對話空間核心規範 (Chatroom P0 Spec)

`/chatroom` 是本專案最重要的頁面，需達到「沈浸式」體驗。

## 1. 三階段流程 (Three-Phase Experience)

### Phase 1: 情境選擇 (Scenario Selection)
*   **Grid**: 3x2 卡片佈局。
*   **Interaction**: 
    - 點選卡片觸發 `ScenarioDetail` 覆蓋層。
    - "換一批" 按鈕觸發 `Rotate` 360度動畫，並有數據加載的 Skeleton 屏。
*   **Visual**: 隨機卡片使用 `dashed border`，象徵未知與挑戰。

### Phase 2: 情境確認 (Briefing)
*   **Dialog**: 展示情境的人設、背景、核心困難。
*   **CTA**: "我準備好了，進入教室"。

### Phase 3: 對話進行 (Active Session)
*   **Layout**: `Header` (功能) + `Center` (學生) + `Bottom` (對話流)。
*   **Student Avatar**: 
    - 圓形容器，背景根據情境有微弱漸層。
    - 表情切換必須平滑。
*   **ChatPanel (底部控制中心)**:
    - **對話氣泡**: 
        - 老師：`bg-primary`, `text-white`, 右側進入。
        - 學生：`bg-secondary/20`, `text-main`, 左側進入。
    - **輸入控制**: 支持鍵盤 `Ctrl+Enter` 發送，支援語音波形預覽。

## 2. 核心狀態與異常處理 (Corner Cases)

| 場景 | UI 表現 |
| :--- | :--- |
| **網路延遲** | 學生 Avatar 上方顯示 `...` 氣泡 (Thinking state)。 |
| **對話暫停** | 全螢幕 `backdrop-blur-md`，置中顯示大字體 "PAUSED"。 |
| **結束對話** | 彈出確認窗，避免誤觸導致練習紀錄流失。 |
| **語音輸入** | 麥克風圖標變紅並帶有脈衝波。 |

## 3. 視覺參數 (Visual Specs)
*   **Chat Bubble Radius**: `16px` (外側), `4px` (靠牆側)。
*   **Max-width (Chat)**: `max-w-[70%]` 避免文字過長難以閱讀。
*   **Z-index Hierarchy**: 
    - `PauseOverlay`: 40
    - `ScenarioDetail`: 30
    - `Header`: 20
