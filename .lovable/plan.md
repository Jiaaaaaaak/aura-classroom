

## Plan: Dice Roll Scenario Preview

**Goal**: After the dice lands, show a preview of the randomly selected scenario so the user can confirm before starting.

### Current Flow
Dice rolls → `onRollComplete` → `handleStart()` → voice prompt → session starts (no preview)

### New Flow
Dice rolls → lands on a face → show scenario preview overlay → user clicks "開始對話" → voice prompt → session starts

### Changes

**1. `src/components/chatroom/DiceRoller.tsx`**
- Change `onRollComplete` callback to return the landed face index so the parent knows which scenario was "rolled"
- Keep animation logic unchanged

**2. `src/pages/Chatroom.tsx`**
- Add new state `rolledScenario` to hold the randomly picked scenario after dice lands
- On `onRollComplete`, randomly pick a scenario from `allScenarios` and set it to `rolledScenario` (instead of immediately calling `handleStart`)
- When `rolledScenario` is set and `!isStarted`, render the `ScenarioDetail` component with that scenario, so the user sees the scenario title, emoji, description, and tag
- On confirm ("開始對話") from `ScenarioDetail`, call `handleStart(rolledScenario)` which proceeds to the voice prompt as usual
- On close, clear `rolledScenario` back to null (user cancels)

This reuses the existing `ScenarioDetail` component, keeping UI consistent with manually selected scenarios.

