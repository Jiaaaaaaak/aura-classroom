

## Plan: Enlarge and Crop Character to 3/4 Body Shot

### Problem
Character image is too small at `h-[55vh] max-h-[500px]` with `object-contain`, showing the full body.

### Solution
Use `object-cover` with `object-top` inside a fixed-height container to crop the image from below (cutting off at roughly knee level), creating a 3/4 bust composition.

### Changes in `src/pages/Chatroom.tsx` (lines 212-221)

Replace the current character container with:
- A container div sized to ~85vh height, with `overflow-hidden` to crop the bottom
- The `<img>` itself rendered much larger (e.g., `h-[110vh]`) with `object-contain` and `object-top`, so the top (head) is always visible and the bottom (feet/legs) gets clipped by the container
- Remove `max-h-[500px]` constraint

This achieves a natural crop at approximately the knee/thigh area without distorting the image.

