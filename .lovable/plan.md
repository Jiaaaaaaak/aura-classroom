

## Plan: Casino-Style Dice Rolling Experience

### Problem
1. The dice currently animates in-place (top-right corner) — no dramatic "center stage" moment
2. The "隨機挑戰" label is obscured by the dice

### Design Concept
When clicked, the dice flies from its corner position to the **center of the screen** with a full-screen overlay (like a casino spotlight), spins dramatically, then lands. Pure CSS + React state — no extra libraries needed. The existing CSS keyframe approach is powerful enough for this casino feel.

### Changes

**1. `src/components/chatroom/DiceRoller.tsx` — Refactor into two modes**

- **Idle state (corner)**: Smaller dice (56px) with the "隨機挑戰" label displayed **below** with proper spacing so it's not obscured
- **Rolling state (fullscreen overlay)**: When clicked, render a **fixed fullscreen overlay** (`fixed inset-0 z-50`) with dark backdrop + blur. The dice scales up to ~120px and animates center-screen with:
  - Dramatic entrance: dice flies from click origin toward center
  - Casino-style spin: faster, more rotations, with glow/shadow effects
  - Particle/sparkle burst using CSS pseudo-elements on landing
  - Pulsing light ring behind the dice during spin
- Keep existing haptic vibrations synced to bounces

**2. `src/pages/Chatroom.tsx` — Minor adjustments**

- The DiceRoller now self-manages its overlay, so parent just passes the same props
- No structural changes needed — `onRollComplete` still fires after animation ends

### Animation Breakdown (no extra libraries)

```text
Click → Overlay fades in (200ms)
     → Dice scales from 56px to 120px, moves to center (300ms decelerate)
     → Casino spin phase: chaotic 3D rotation + glow ring (1.5s)
     → Bounce landing with scale squash (0.7s)
     → Brief pause showing landed face + sparkle burst (0.5s)
     → onRollComplete fires → overlay stays until ScenarioDetail takes over
```

Effects achieved with pure CSS:
- `box-shadow` glow animation behind dice during spin
- `radial-gradient` spotlight on overlay background
- Scale squash-stretch on bounce (`scaleY(0.85) scaleX(1.15)`)
- CSS `@keyframes` sparkle dots using `::before`/`::after`

### Label Fix
Move "隨機挑戰" text below the dice button with `mt-1` gap, ensure the dice container doesn't overflow onto it.

