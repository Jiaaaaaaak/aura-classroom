

## Plan: Hearthstone-style Card Draw Animation

The uploaded image shows Hearthstone's card reveal: cards are dealt face-down in a fan/spread layout, and the user **taps a card to flip it** — creating anticipation through player choice rather than auto-reveal.

### Current vs. Hearthstone Style

| Current | Hearthstone-inspired |
|---------|---------------------|
| Auto-shuffle orbit animation | Cards dealt from deck onto "table" one-by-one |
| Random auto-pick, auto-flip | User **taps** a face-down card to choose |
| Single card reveals | Chosen card flips with dramatic 3D rotation + glow |
| Other cards vanish | Unchosen cards slide away after selection |

### New Animation Flow (4 phases)

```text
idle → dealing → picking → revealed

1. DEALING (~1.5s): Cards fly in one-by-one from a deck position (top-center),
   landing in a fan spread (like Hearthstone's 3-5 card hand layout).
   Each card arrives with a subtle "thwap" sound stagger.

2. PICKING (user interaction): All cards face-down in a fan.
   Cards have hover glow + slight lift. User taps one to select.
   Title says "選擇你的命運牌卡..."

3. REVEALING (~1.5s): Selected card rises to center, scales up,
   does dramatic 3D Y-axis flip. Unchosen cards slide down and fade.
   Golden burst particles fire on flip completion.

4. REVEALED: Card face-up with scenario details. Same action buttons
   (重新抽取 / 開始練習). Particle effects persist.
```

### Card Layout (Fan Spread)

```text
        ┌──┐
   ┌──┐ │  │ ┌──┐
  ┌──┐│  │ │  │┌──┐
  │  ││  │ │  ││  │
  │ 1││ 2│ │3 ││ 4│   ← Slight rotation per card, like a hand of cards
  └──┘└──┘ └──┘└──┘
     -15°  -7°  0°  7°  15°
```

### Key Changes to `SoulCards.tsx`

1. **New state `"dealing"` + `"picking"`** replacing `"shuffling"`
2. **Dealing animation**: Cards start off-screen (top), stagger-animate into fan positions with rotation
3. **Fan layout math**: Each card gets `rotate((idx - center) * 12deg)` and `translateY` for arc effect
4. **User click handler on cards** during `picking` state — replaces random auto-selection
5. **Hover effect**: Cards lift slightly (`translateY(-12px)`) and glow on hover during picking
6. **Selected card flip**: Same 3D `rotateY(180deg)` but with added vertical rise + scale
7. **Unchosen cards exit**: Animate down + fade out when a card is picked
8. **Card back redesign**: Add inner ornamental border pattern (double border + central emblem) to feel more like a proper card game

### Files to Change

- **`src/components/chatroom/SoulCards.tsx`** — Full rewrite of animation states and card positioning
- **`src/lib/soulCardSfx.ts`** — Add `sfxDeal()` sound for card dealing (quick "thwap" per card)

