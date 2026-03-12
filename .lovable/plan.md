

## Plan: RPG-Style Student Character Display in Chatroom

### Goal
Replace the current emoji-based student avatar with full-size character illustrations from `img/students/`, creating a visual novel / RPG dialogue feel as shown in the reference image.

### Current State
- Student avatar is a small circle with emoji (😤, 🥺, etc.) in top-left corner
- 10 student characters exist in `img/students/` with 9 emotion variants each
- 10 personality traits defined in `StudentProfileSelect.tsx`
- Emotion states tracked via `studentEmotion` in Chatroom: `neutral`, `angry`, `sad`, `thinking`

### Changes

**1. Create character mapping utility (`src/lib/studentCharacter.ts`)**
- Map each personality ID to a student character name:
  - hedgehog → 芷婷, impulsive → 宇傑, anxious → 思妤, pressured → 宇翔, compliant → 品妍, bully → 建宇, justice → 柏翰, gifted → 睿明, creative → 家瑜, marginal → 柏宇
- Map emotion states to Chinese emotion filenames:
  - neutral → 中性, angry → 憤怒, sad → 悲傷, thinking → 好奇, frustrated → 挫折, anxious → 焦慮, confident → 自信, happy → 開心, surprised → 驚訝
- Export a function `getStudentImagePath(personalityId, emotion)` → returns `/img/students/芷婷_憤怒.png`

**2. Update Chatroom.tsx - Active Session View**
- Replace the small emoji avatar overlay with a large, centered character illustration
- Character image: positioned at center-bottom of the viewport, covering roughly 60-70% height, like a visual novel character
- Cross-fade + subtle scale animation on emotion change (300ms)
- Keep the student info badge (name, grade, personality) in top-left as a compact overlay card with the character's avatar thumbnail

**3. Update ChatPanel.tsx - RPG dialogue style**
- Chat messages stay at the bottom but styled more like RPG dialogue boxes
- Student messages appear in a semi-transparent dialogue box at bottom with the student name label
- Teacher messages appear as right-aligned bubbles above

**4. Expand emotion states**
- Extend `studentEmotion` type to include all 9 available emotions: `neutral`, `angry`, `sad`, `thinking`, `frustrated`, `anxious`, `confident`, `happy`, `surprised`
- Update `studentPersonality.ts` emotion strings to use the expanded set
- Character image updates automatically on emotion change

### Technical Details
- Images served from `/img/students/` (public directory, no import needed)
- Character transition uses CSS `transition` on `opacity` + `transform` for cross-fade
- Preload adjacent emotion images to avoid flicker
- `object-contain` + `object-bottom` to anchor character to bottom of viewport

