

## Plan: Personality-Based AI Student Responses

### Current State
- ChatPanel has **hardcoded** student responses (e.g., "我覺得大家都針對我...")
- `studentProfile` (personality + grade) is stored in Chatroom.tsx but **not passed** to ChatPanel
- No response variation based on personality traits

### Approach
Since there's no backend/AI integration yet, create a **local response mapping system** that varies the student's initial message, reply style, and emotional tone based on the selected personality trait and grade level. This lays the groundwork for future AI integration.

### Changes

**1. Create `src/lib/studentPersonality.ts` — Response config per personality**

A mapping from each personality ID to:
- `initialMessage`: The student's opening line (replacing the hardcoded one)
- `responses`: Array of possible replies (cycled through), each with `content` and `emotion`
- `speakingStyle`: Description string (for future AI prompt injection)

Example entries:
- `hedgehog` (防衛刺蝟型): Defensive, short, hostile tone. "你管我！反正沒人在乎我。"
- `anxious` (焦慮退縮型): Hesitant, self-doubting. "我...我不知道...也許是我的錯..."
- `compliant` (順從壓抑型): Agreeable surface, suppressed. "好...老師說的對..."

Grade level modifies vocabulary complexity (e.g., lower elementary uses simpler words).

**2. Update `src/components/chatroom/ChatPanel.tsx`**

- Accept new props: `personalityId?: string`, `gradeId?: string`
- Import the response config from `studentPersonality.ts`
- Use `personalityId` to:
  - Set the initial message from the personality config
  - Pick responses from the personality's response pool instead of the hardcoded reply
  - Set the corresponding emotion for each response
- Use `gradeId` to select age-appropriate vocabulary variants

**3. Update `src/pages/Chatroom.tsx`**

- Pass `studentProfile.personality` and `studentProfile.grade` to `ChatPanel`

### Response Data Structure

```typescript
interface PersonalityConfig {
  initialMessage: string;
  responses: Array<{ content: string; emotion: string }>;
  speakingStyle: string; // for future AI prompt
}

// Grade-adjusted variants
interface GradeVariant {
  lower: string;  // 低年級 - simple
  mid: string;    // 中年級
  upper: string;  // 高年級
  junior: string; // 國中 - complex
}
```

This creates 10 distinct conversation experiences while keeping the mock structure ready for AI replacement.

