import { useState, useRef } from "react";

const FACE_EMOJIS = ["📝", "👥", "😤", "🤝", "🌱", "💭"];

interface DiceRollerProps {
  onRollComplete: () => void;
  onClick: () => void;
  isRolling: boolean;
}

// Haptic feedback helper
function vibrate(pattern: number | number[]) {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

export default function DiceRoller({ onRollComplete, onClick, isRolling }: DiceRollerProps) {
  const [finalFace, setFinalFace] = useState(0);
  const containerRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (isRolling) return;
    const face = Math.floor(Math.random() * 6);
    setFinalFace(face);
    onClick();

    // Initial throw vibration
    vibrate(30);

    // Bounce vibrations at each landing moment
    setTimeout(() => vibrate(15), 1400);  // first bounce
    setTimeout(() => vibrate(10), 1700);  // second bounce
    setTimeout(() => vibrate([20, 30, 40]), 2000); // final land

    setTimeout(() => {
      onRollComplete();
    }, 2400);
  };

  // Each face rotation
  const faceTransforms = [
    "rotateY(0deg) translateZ(36px)",
    "rotateY(180deg) translateZ(36px)",
    "rotateY(90deg) translateZ(36px)",
    "rotateY(-90deg) translateZ(36px)",
    "rotateX(90deg) translateZ(36px)",
    "rotateX(-90deg) translateZ(36px)",
  ];

  // Target rotation to land on each face
  const landRotations = [
    "rotateX(0deg) rotateY(0deg)",
    "rotateX(0deg) rotateY(180deg)",
    "rotateX(0deg) rotateY(-90deg)",
    "rotateX(0deg) rotateY(90deg)",
    "rotateX(-90deg) rotateY(0deg)",
    "rotateX(90deg) rotateY(0deg)",
  ];

  return (
    <button
      ref={containerRef}
      onClick={handleClick}
      className="group flex flex-col items-center justify-center gap-1 rounded-xl opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
    >
      {/* 3D Dice */}
      <div className="relative" style={{ perspective: "400px", width: 72, height: 72 }}>
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transition: isRolling ? "none" : undefined,
            animation: isRolling
              ? `diceThrow 2.2s cubic-bezier(0.22, 1, 0.36, 1) forwards`
              : undefined,
            transform: isRolling ? undefined : "rotateX(-15deg) rotateY(25deg)",
            ["--land-rotation" as any]: landRotations[finalFace],
          }}
        >
          {faceTransforms.map((transform, i) => (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center rounded-xl border border-border/30"
              style={{
                width: 72,
                height: 72,
                transform,
                backfaceVisibility: "hidden",
                background: "hsl(var(--card) / 0.9)",
                boxShadow: "inset 0 1px 2px hsl(var(--foreground) / 0.06)",
              }}
            >
              <span className="text-2xl select-none">{FACE_EMOJIS[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <span className="text-xs font-medium text-muted-foreground/70">
        {isRolling ? "擲骰中..." : "隨機挑戰"}
      </span>

      <style>{`
        @keyframes diceThrow {
          /* Launch upward with spin */
          0% {
            transform: rotateX(-15deg) rotateY(25deg) translateY(0px) scale(1);
          }
          8% {
            transform: rotateX(60deg) rotateY(-40deg) rotateZ(20deg) translateY(10px) scale(0.95);
          }
          /* Flying up — fast chaotic spin */
          20% {
            transform: rotateX(360deg) rotateY(-200deg) rotateZ(80deg) translateY(-80px) scale(1.05);
          }
          35% {
            transform: rotateX(700deg) rotateY(350deg) rotateZ(-120deg) translateY(-110px) scale(1.1);
          }
          /* Peak */
          45% {
            transform: rotateX(1000deg) rotateY(-500deg) rotateZ(160deg) translateY(-120px) scale(1.08);
          }
          /* Falling down */
          58% {
            transform: rotateX(1300deg) rotateY(650deg) rotateZ(-60deg) translateY(-40px) scale(1);
          }
          /* First bounce impact */
          65% {
            transform: rotateX(1500deg) rotateY(-720deg) rotateZ(30deg) translateY(8px) scale(0.92);
          }
          /* Small bounce up */
          74% {
            transform: rotateX(1600deg) rotateY(780deg) rotateZ(-15deg) translateY(-20px) scale(1);
          }
          /* Second bounce impact */
          80% {
            transform: rotateX(1650deg) rotateY(-800deg) rotateZ(8deg) translateY(4px) scale(0.96);
          }
          /* Tiny bounce */
          87% {
            transform: rotateX(1680deg) rotateY(820deg) rotateZ(-4deg) translateY(-6px) scale(1);
          }
          /* Settle */
          93% {
            transform: var(--land-rotation) translateY(2px) scale(0.98);
          }
          100% {
            transform: var(--land-rotation) translateY(0px) scale(1);
          }
        }
      `}</style>
    </button>
  );
}
