

## UX Analysis: Scenario Selection Redundancy

### Current Problem

The two views serve nearly identical purposes — both let users browse scenarios and click to start:

| Feature | 情境選擇 (Grid) | 情境總覽 (List) |
|---------|-----------------|-----------------|
| Browse scenarios | Yes | Yes |
| Category filter | Yes | Yes |
| Search | No | Yes |
| Metadata (duration, count) | No | Yes |
| Data source | `allScenarios` (real) | `MOCK_SCENARIOS` (separate, IDs 101-110) |
| Click action | Open detail → start | Broken (IDs don't match) |

Two tabs that do the same thing creates decision paralysis and fragments the experience.

### Proposed Redesign: Single Unified View

Merge into **one view** with a layout toggle (grid/list) instead of two separate "tabs." The user journey becomes:

```text
┌─────────────────────────────────────────────┐
│  [Search bar]          [Grid|List] [🃏牌卡] │
│  [全部] [自我覺察] [社會覺察] [人際技巧] ...│
│─────────────────────────────────────────────│
│                                             │
│  Grid mode:  Visual cards (current grid)    │
│  List mode:  Compact rows with metadata     │
│              (duration, practice count)      │
│                                             │
│  Same data source, same click behavior.     │
└─────────────────────────────────────────────┘
```

### Key Changes

1. **Merge into `SkillTreeMap`**: Add search bar to grid view. Remove `ScenarioOverview` as a separate component. The grid/list toggle becomes a **display preference**, not a navigation destination.

2. **Unified data source**: Both layouts render from `COMPETENCY_GROUPS` / `allScenarios`. No more separate mock data with mismatched IDs.

3. **Search works in both modes**: Add the search input to the shared toolbar. Filter applies to both grid and list rendering.

4. **List mode is a compact layout inside SkillTreeMap**: Renders scenario rows with metadata (estimated time, practice count, tags) — taken from the best parts of the old ScenarioOverview design.

5. **Remove `ScenarioOverview.tsx`**: Its search + list UI logic is absorbed into `SkillTreeMap`.

### Files to Change

- **`src/components/chatroom/SkillTreeMap.tsx`**: Add search input, merge list-mode rendering inline, use single data source
- **`src/components/chatroom/ScenarioOverview.tsx`**: Delete
- **`src/pages/Chatroom.tsx`**: Remove ScenarioOverview import

### User Journey After Redesign

1. Enter `/chatroom` → See unified scenario browser (grid by default)
2. Search or filter by category to narrow down
3. Toggle to list view for a more scannable, detail-rich layout
4. Click any scenario → Detail → Profile → Start
5. Or click 心靈牌卡 → Gacha draw → Start

One entry point, one mental model, zero confusion.

