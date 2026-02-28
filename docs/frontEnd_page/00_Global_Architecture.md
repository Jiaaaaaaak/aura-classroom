# 全域前端架構規範 (Global Frontend Architecture & IA)

本文件定義 SELf-corner 的技術架構核心與導航邏輯，為開發者與設計師提供統一的實作準則。

## 1. 核心開發棧 (The Modern Stack)
*   **核心框架**: React 18+ (TypeScript) - 確保型別安全與組件化。
*   **建構工具**: Vite - 實現極速熱更新與優化打包。
*   **路由系統**: `react-router-dom` v6 (含 Data API 模型)。
*   **樣式引擎**: Tailwind CSS (Utility-first) + `shadcn/ui` (Radix UI Primitives)。
*   **數據流管理**: 
    - **Server State**: TanStack Query v5 (用於處理 API 緩存與 Loading/Error 狀態)。
    - **Local State**: React Context (用於 Authentication 與 User Prefs)。
*   **反饋系統**: `sonner` (提供非侵入式通知)。

## 2. 導航體系 (Information Architecture)

### 2.1 路由地圖 (Route Map)
| 路徑 | 權限 | 頁面名稱 | 核心目標 |
| :--- | :--- | :--- | :--- |
| `/login` | Public | 認證入口 | 提供「安全、溫暖」的第一印象與身分驗證。 |
| `/home` | Private | 願景大廳 | 建立 SEL/Satir 心理學心智模型，引導開始練習。 |
| `/chatroom` | Private | 模擬沙盒 | **核心 P0**: 與虛擬學生進行即時情緒對話練習。 |
| `/feedback` | Private | 指標分析 | 提供專業雷達圖與「行動導向」的專家建議。 |
| `/history` | Private | 進步軌跡 | 視覺化呈現過往練習歷程。 |
| `/info` | Private | 個人空間 | 教師帳號管理與成長統計。 |

### 2.2 全域交互組件：HamburgerMenu (Navigation Drawer)
採用 **Modal Drawer** 模式，確保在 Mobile 端能快速切換，在 Desktop 端保持視圖聚焦。
*   **層級規範**: `z-index: 50`，背景使用 `backdrop-blur-md` 強化層次感。
*   **選單邏輯**: 
    - 點選 Link 後自動收合 Drawer。
    - 登出按鈕 (Logout) 需觸發 `AlertDialog` 二次確認。

## 3. 架構層級 (Folder Structure & Hierarchy)
遵循「原子與業務分離」原則：
*   `src/components/ui/`: 原子組件 (Atoms) - 純 UI，不帶業務邏輯。
*   `src/components/[feature]/`: 複合組件 (Organisms) - 包含特定業務邏輯 (如 `ChatPanel`)。
*   `src/hooks/`: 自定義邏輯鉤子 (如 `useChatStream`, `useVoiceVAD`)。
*   `src/pages/`: 頁面容器 (Templates) - 負責數據獲取與佈局拼接。

## 4. 交付標準 (Definition of Done)
1.  **Responsive**: 必須兼容 Mobile (375px+) 與 Desktop (1440px+)。
2.  **Accessibility**: 所有互動元素需具備 `aria-label` 與 Focus Ring。
3.  **Performance**: 核心頁面 (Chatroom) 的 First Input Delay (FID) < 100ms。
