import { useState } from "react";

const FACE_EMOJIS = ["📝", "👥", "😤", "🤝", "🌱", "💭"];

interface DiceRollerProps {
  onRollComplete: () => void;
  onClick: () => void;
  isRolling: boolean;
}

export default function DiceRoller({ onRollComplete, onClick, isRolling }: DiceRollerProps) {
  const [finalFace, setFinalFace] = useState(0);

  const handleClick = () => {
    if (isRolling) return;
    const face = Math.floor(Math.random() * 6);
    setFinalFace(face);
    onClick();
    setTimeout(() => {
      onRollComplete();
    }, 1800);
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
              ? `diceRoll 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards`
              : undefined,
            transform: isRolling ? undefined : "rotateX(-15deg) rotateY(25deg)",
            // CSS custom property for final landing
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
        @keyframes diceRoll {
          0% {
            transform: rotateX(-15deg) rotateY(25deg);
          }
          15% {
            transform: rotateX(200deg) rotateY(-150deg) rotateZ(90deg) translateY(-30px);
          }
          35% {
            transform: rotateX(520deg) rotateY(280deg) rotateZ(-45deg) translateY(-50px);
          }
          55% {
            transform: rotateX(800deg) rotateY(-400deg) rotateZ(120deg) translateY(-20px);
          }
          75% {
            transform: rotateX(1100deg) rotateY(600deg) rotateZ(-30deg) translateY(0px);
          }
          100% {
            transform: var(--land-rotation);
          }
        }
      `}</style>
    </button>
  );
}
