

## Plan: Remove Grades/Difficulty + Redesign Soul Cards as Gacha-style Auto-Reveal

### Changes Overview

**1. Remove difficulty levels** from ScenarioOverview
**2. Remove grade/score** from History, Collection, and collectionData
**3. Redesign Soul Cards** with a gacha-game inspired auto-reveal animation

---

### 1. Remove Difficulty — `ScenarioOverview.tsx`
- Remove `difficulty` field from `OverviewScenario` interface and all mock data
- Remove `DIFFICULTY_STYLES` constant
- Remove difficulty filter buttons and difficulty badge from list items

### 2. Remove Grade/Score — Multiple Files

**`src/lib/collectionData.ts`**:
- Remove `grade` from `PracticeRecord` interface and all `historyItems` entries
- Remove `bestGrade` from `CollectionCard` and `getCollectionCards()`
- Remove `GRADE_ORDER` constant and related logic

**`src/pages/History.tsx`**:
- Remove `gradeStyles` function
- Remove the Score Badge (`<Badge>`) from each history list item

**`src/pages/Collection.tsx`**:
- Remove `GRADE_SCORE`, `gradeColor`
- Remove best grade from stats grid (keep practice count + duration)
- Remove growth chart (it was score-based)
- Change stats grid from 3-col to 2-col

### 3. Redesign Soul Cards — `SoulCards.tsx`

**Inspiration**: Gacha games (e.g., Genshin Impact wish, FGO summon). Instead of the user clicking a card to flip, the experience is:

**New Flow (3 phases)**:
1. **`shuffling`** — Cards are stacked in center, rapidly cycling/shuffling with a cascade animation (cards fly around in a circle or shuffle like a deck). Lasts ~2 seconds automatically.
2. **`revealing`** — Cards stop. The chosen card rises to center, scales up, does a dramatic 3D flip with a glow burst effect. Auto-plays over ~1.5 seconds.
3. **`revealed`** — Card is face-up, enlarged, with scenario details (emoji, title, tag, guide sentence) displayed below. Action buttons appear: "重新抽取" and "開始練習".

**Visual Effects**:
- Shuffling: Cards orbit in a tight circle, opacity pulsing, with slight motion blur feel
- Reveal moment: Golden/warm radial glow burst behind the card as it flips
- Card scales from 1.0 → 1.3 during flip, settles at 1.15
- Particle-like sparkle dots (CSS-only, using pseudo-elements or small divs) radiate outward on reveal

**Key difference from current**: User clicks ONE button to trigger the draw — no manual card selection. The randomness and reveal are fully automated and cinematic, like pulling a gacha.

**Entry**: Single "抽取心靈牌卡" button triggers the overlay → shuffle auto-starts → auto-reveals → user decides to accept or redraw.

