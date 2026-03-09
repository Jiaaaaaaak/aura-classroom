

## Plan: Redesign Skill Tree as Card-Based Wheel + Fix Soul Cards Bug

### Problem 1: SkillTreeMap UI feels like a boring list
The current linear tree with scroll-spy sidebar doesn't match the warm, card-based aesthetic of Soul Cards. User wants either a **circular/ring layout** or a **card-consistent presentation**.

### Problem 2: Soul Cards leftmost card flip bug
When the leftmost card (index 0) is selected and revealed, clicking "重新抽取" doesn't flip it back to face-down properly.

---

### Approach: Card Wheel Layout

Replace the linear SkillTreeMap with a **two-level card interface**:

**Level 1 — Competency Wheel**: The 5 SEL competency groups displayed as large cards arranged in a circular/radial pattern around a center point. Each card uses the same warm gradient styling as Soul Cards backs. Clicking a competency card transitions to Level 2.

**Level 2 — Scenario Cards**: The scenarios within the selected competency fan out as smaller cards (similar to Soul Cards spread), but face-up. Each shows emoji, title, and description. Clicking one opens the existing ScenarioDetail. A back button returns to Level 1.

The Soul Cards entry button moves to the center of the wheel (Level 1) as a special "mystery" card.

```text
Level 1 (Wheel):              Level 2 (Fan):
                               
      [自我覺察]                  [情境A] [情境B]
  [負責決策]  [自我管理]      ← Back to wheel
      [🃏牌卡]                    
  [人際技巧]  [社會覺察]
```

### Changes

**1. `src/components/chatroom/SkillTreeMap.tsx` — Full rewrite**
- Remove scroll-spy sidebar and linear layout
- Level 1: 5 competency cards positioned radially using `transform: rotate(Xdeg) translateY(-R)` around center
- Each card: gradient background matching its competency color, icon, label, scenario count badge
- Center: Soul Cards entry with sparkle effect
- Level 2: On competency click, animate other cards out, selected card moves to top, scenarios fan out below as face-up cards in a grid or arc
- Smooth transitions between levels using CSS transforms + state

**2. `src/components/chatroom/SoulCards.tsx` — Fix leftmost card bug**
- Root cause: When `selectedIdx` is `0` (falsy in some JS contexts), the floating animation condition `!selectedIdx` evaluates to `true` even during flip, causing animation conflicts. Fix: change `!selectedIdx` check to `selectedIdx === null`.
- Line 143: Change `!selectedIdx && !flipping` to `selectedIdx === null && !flipping`

### Visual Design
- Competency cards use same `rounded-2xl border-2 shadow-xl bg-gradient-to-br` pattern as Soul Card backs
- Hover: lift + glow (same `translateY(-8px)` + box-shadow pattern)
- Transitions: 0.5s cubic-bezier for smooth card movements
- Maintains warm palette (#FAF9F6 background, terracotta accents)

