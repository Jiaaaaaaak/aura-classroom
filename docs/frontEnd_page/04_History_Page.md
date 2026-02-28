# 歷史紀錄與進步軌跡規範 (History & Tracker Spec)

`/history` 頁面不只是列表，它是用戶「成長的可視化證明」。

## 1. 視覺設計 (Visual Design)
*   **Search Bar**: 採用 `shadcn/ui` Input 搭配邊界漸層效果。
*   **List Item**: 
    - 採用輕量化的 Card 容器。
    - Hover 效果：`border-primary/50`, `scale-[1.01]` 微幅放大感。

## 2. 交互邏輯
*   **Skeleton Loading**: 當加載大量歷史數據時，應顯示與列表結構一致的 `Pulse` 骨架屏。
*   **Empty State**: 顯示溫暖的插圖與 "還沒有練習紀錄嗎？去對話空間看看吧！" 的引導按鈕。

## 3. 搜尋優化
*   支持關鍵字 (主題、情境) 與日期範圍過濾。
*   輸入時具備 `Debounce` (300ms)，減少無意義的渲染負擔。

## 4. 響應式佈局
*   Mobile: 日期與標題改為垂直疊放。
*   Desktop: 日期靠左對齊，標題居中，右側預留「查看回饋」按鈕。
