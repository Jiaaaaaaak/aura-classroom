

## Plan: Soul Album (心靈圖鑑) + History Cross-linking

### Overview
Build a new **Collection/Album page** (`/collection`) that displays all scenario cards as collectible items — unlocked (colorful) vs locked (frosted). Add **bidirectional navigation** between the album and the existing History page.

### New Files

**1. `src/pages/Collection.tsx` — Soul Album page**

- Grid of all scenario cards (reusing data from `allScenarios` in Chatroom)
- Each card shows: emoji, title, tag badge, collection status
- **Unlocked cards** (matched against mock `historyItems`): Full color, glowing border, click opens detail overlay
- **Locked cards**: Grayscale/frosted, "?" emoji, click shows "尚未探索" prompt with link to chatroom
- Card detail overlay when clicking an unlocked card:
  - Best score badge, practice count, total duration
  - Guide sentence from scenario
  - Mini emotion growth chart (using existing recharts) if practiced multiple times
  - "查看相關練習歷史" button → navigates to `/history?scenario=<title>` (auto-filtered)
  - Personal note/golden quote area (placeholder for future)
- Progress bar at top: "已收集 X / Y 張牌卡"
- Visual: warm card-flip hover effect reusing SoulCards CSS patterns

**2. `src/lib/collectionData.ts` — Shared scenario + history data**

- Extract `allScenarios` from Chatroom.tsx into this shared module so both Chatroom and Collection can import it
- Export a `getCollectionStatus(scenarioId)` helper that checks against mock history data
- Type definitions: `CollectionCard`, `PracticeRecord`

### Modified Files

**3. `src/pages/History.tsx` — Add scenario tag links + URL filter support**

- Read `?scenario=` query param; if present, auto-filter the list
- Add a small clickable tag/badge on each history item showing the scenario's SEL category
- Clicking the tag navigates to `/collection` with the card highlighted
- Add "清除篩選" button when filtered

**4. `src/pages/Chatroom.tsx`**

- Import `allScenarios` from `collectionData.ts` instead of defining inline

**5. `src/App.tsx` — Add `/collection` route**

**6. `src/components/Sidebar.tsx` — Add "心靈圖鑑" nav item**

- New nav entry with `BookOpen` icon between "歷史紀錄" and "個人帳號"

### Data Flow (all mock/local, no backend)

```text
Collection Page                    History Page
┌─────────────┐                   ┌─────────────┐
│ Card Grid   │ ──"查看歷史"──→  │ ?scenario=X │
│             │ ←──tag click───  │ List items  │
│ Detail:     │                   │ + tag badge │
│  best score │                   └─────────────┘
│  mini chart │
│  note area  │
└─────────────┘
```

### Visual Design
- Follows existing warm palette (#3D3831, #FAF9F6, primary terracotta)
- Locked cards use `opacity-50 grayscale` + frosted glass effect
- Unlocked cards have subtle `shadow-lg` glow + hover scale
- Progress indicator uses existing `Progress` component with primary color

