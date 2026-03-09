

## Plan: Skill Tree Map + Soul Cards System

This is a large feature set. I'll break it into two main parts that replace the current scenario selection UI.

### Part 1: Skill Tree Map Layout (replaces grid + "換一批" button)

**New component: `src/components/chatroom/SkillTreeMap.tsx`**

- Displays all 5 SEL core competencies as main branch nodes arranged vertically with connecting lines
- Each branch expands to show its child scenarios inline
- Left sidebar acts as a fixed scroll-spy nav (clicking a competency scrolls to that section)
- Remove "換一批" button entirely since all scenarios are visible
- Remove tag filter pills (the tree structure itself is the categorization)
- Visual states:未探索 (frosted/muted), 已探索 (bright/colored) — currently all "unexplored" since no history tracking yet
- Connector lines between nodes using CSS borders/pseudo-elements
- Each scenario node is clickable → opens ScenarioDetail as before

**Layout structure:**
```text
┌──────────────┬──────────────────────────────────┐
│ Fixed Nav     │  Scrollable Content Area         │
│               │                                  │
│ ● 自我覺察   │  ── 自我覺察 ──────────────────  │
│ ● 自我管理   │     ├ 考場失利後的自責            │
│ ● 社會覺察   │     └ 面對新環境的焦慮            │
│ ● 人際技巧   │                                  │
│ ● 負責決策   │  ── 自我管理 ──────────────────  │
│               │     └ 被當眾誤解的憤怒            │
│ ─────────── │                                  │
│ 🃏 心靈牌卡  │  ── 社會覺察 ──────────────────  │
│               │     └ 分組被落單的窘迫            │
│               │  ...                             │
└──────────────┴──────────────────────────────────┘
```

- Each competency section has an icon, title, and brief description
- Scenario nodes within each section use compact cards with emoji + title + click to expand

**Data restructure in `Chatroom.tsx`:**
- Group `allScenarios` by tag into a `COMPETENCY_GROUPS` structure
- Each group: `{ id, label, icon, color, description, scenarios[] }`

### Part 2: Soul Cards (replaces DiceRoller)

**New component: `src/components/chatroom/SoulCards.tsx`**

Replaces the dice with a card-draw ritual:

1. **Entry button** — In the skill tree left nav, a "🃏 心靈牌卡" button with subtle glow
2. **Fullscreen overlay** (via `createPortal`, same pattern as DiceRoller):
   - **Phase 1 — Spread**: 5-7 cards fan out face-down with subtle floating animation. Card backs use warm gradient matching SEL theme colors.
   - **Phase 2 — Selection**: User hovers cards (slight lift + glow). Clicking one triggers haptic feedback.
   - **Phase 3 — Reveal**: Selected card does a 3D flip (`backface-visibility: hidden`, `rotateY(180deg)`). Front shows: emoji, scenario title, tag badge, and a poetic guide sentence.
   - **Phase 4 — Action**: "開始練習" and "重新抽取" buttons appear below the revealed card.

**Animation approach** — Pure CSS (same as DiceRoller):
- Card fan-out: staggered `transform: rotate(Xdeg) translateX(Ypx)` per card
- Hover lift: `translateY(-20px)` + `box-shadow` glow
- 3D flip: `rotateY(180deg)` with `backface-visibility: hidden`
- Sparkle particles reused from DiceRoller pattern

**Guide sentences** — Add a `guideSentence` field to each scenario in `allScenarios`:
- e.g. "有時候，憤怒只是保護受傷心靈的外殼。"

### Part 3: Wire it up in `Chatroom.tsx`

- Replace the current scenario selection view (grid + tags + DiceRoller) with `SkillTreeMap`
- `SkillTreeMap` receives `allScenarios`, `onSelectScenario`, and `onDrawCard` callbacks
- Remove `DiceRoller` import and usage
- Remove `displayedScenarios`, `handleRefresh`, `activeTag` state (no longer needed)
- Keep `ScenarioDetail` for showing scenario details on click
- `SoulCards` overlay is triggered from within `SkillTreeMap`

### Files to create/modify

| File | Action |
|---|---|
| `src/components/chatroom/SkillTreeMap.tsx` | **Create** — Tree layout with scroll-spy nav + soul cards entry |
| `src/components/chatroom/SoulCards.tsx` | **Create** — Fullscreen card-draw overlay with 3D flip |
| `src/pages/Chatroom.tsx` | **Modify** — Replace grid/tags/dice with SkillTreeMap, add guide sentences to scenarios, remove old state |
| `src/components/chatroom/DiceRoller.tsx` | **Delete** (no longer used) |
| `src/components/chatroom/ScenarioCard.tsx` | **Keep** but adapt for tree node styling (smaller, inline) |

