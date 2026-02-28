# 首頁規範 (Home Page Spec)

`/home` 作為願景大廳，重點在於資訊傳達與心智模型建立。

## 1. 資訊層級 (Information Hierarchy)
1.  **Welcome Header**: 個人化歡迎語，降低距離感。
2.  **Product Vision**: 核心 Slogan 與平台目的。
3.  **Core Concepts (SEL/Satir)**: 以卡片形式展示心理學基礎。
4.  **Quick Start**: 引導至對話空間。

## 2. 組件規範

### 2.1 InfoCard (核心理念卡片)
*   **Style**: `border-none`, `shadow-sm`, `bg-card`。
*   **Interaction**: Hover 時位移 `Y: -4px`，陰影變為 `shadow-md`。
*   **Iconography**: 使用大地色系的 Icon (如 Sage Green 的植物圖標代表成長)。

### 2.2 Navigation (HamburgerMenu)
*   **Active State**: 當前所在頁面的 Link 應加粗並顯示 `primary` 色的小圓點。

## 3. 響應式佈局 (Responsive Strategy)
*   **Desktop**: Grid 3 Columns (展示五大能力時)。
*   **Tablet**: Grid 2 Columns。
*   **Mobile**: Stack 1 Column，文字對齊方式改為置中。

## 4. UX Writing 準則
*   避免過於生硬的術語。
*   例：將 "Start Training" 改為 "進入練習空間"。
