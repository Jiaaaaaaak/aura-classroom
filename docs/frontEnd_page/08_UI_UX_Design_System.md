# UI/UX 設計系統總綱 (Visual Identity & Philosophy)

本文件建立 SELf-corner 的設計靈魂。我們不只是做一個工具，而是為教師打造一個「心理避風港」。

## 1. 核心設計理念 (The "Safe Harbor" Concept)

教師在面對學生衝突時常處於高度防禦狀態。我們的設計必須透過視覺與互動，引導教師進入「一致性 (Congruence)」的溝通狀態。
*   **溫暖 (Warmth)**: 消除 AI 的冰冷感，營造對話感。
*   **專業 (Clarity)**: 心理指標圖表必須易讀、具權威性。
*   **安全 (Safety)**: 容許犯錯的環境，UI 應減少「警告式」紅字，改用「引導式」提示。

## 2. 視覺語言：薩提爾冰山風格 (Satir Aesthetics)

### 2.1 幾何與形狀 (Geometry)
*   **圓角 (Radii)**: 全域採用 `rounded-xl` (12px) 到 `rounded-2xl` (16px)。
*   **容器 (Surfaces)**: 避免硬性框線，改用微弱的 `border-muted/30` 搭配柔和陰影 `shadow-sm`。

### 2.2 佈局系統 (Layout Principle)
*   **空氣感 (Whitespace)**: 增加 Padding，避免資訊過載。
*   **焦點專注 (Focus)**: 核心任務 (如對話) 應佔據視覺中心，側邊欄應隨時可收納。

## 3. 組件庫規範 (Component Strategy)
基於 `shadcn/ui` 進行二次客製化：
*   **Button**: 增加高度與內距，點擊感更札實。
*   **Card**: 採用 `bg-card` 色階，背景與內容有微弱對比。
*   **Input**: 聚焦時使用 `ring-primary/20` 的光暈效果，而非生硬的高亮邊框。

## 4. 動態與交互 (Micro-interactions)
*   **觸覺回饋**: 發送訊息時的輕微彈跳感。
*   **情感過渡**: 學生表情切換採用 `Cross-fade` (300ms)，避免瞬間跳變造成的不自然感。

## 5. 設計資產維護
*   **Figma 連結**: [待填入]
*   **Icon Set**: Lucide React (統一使用 `stroke-width: 1.5`)。
