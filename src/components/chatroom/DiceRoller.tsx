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
    "rotateY(0deg) translateZ(60px)",      // front
    "rotateY(180deg) translateZ(60px)",     // back
    "rotateY(90deg) translateZ(60px)",      // right
    "rotateY(-90deg) translateZ(60px)",     // left
    "rotateX(90deg) translateZ(60px)",      // top
    "rotateX(-90deg) translateZ(60px)",     // bottom
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
      className="group flex flex-col items-center justify-center gap-3 px-10 py-6 rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
    >
      {/* 3D Dice */}
      <div className="relative" style={{ perspective: "600px", width: 120, height: 120 }}>
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
              className="absolute inset-0 flex items-center justify-center rounded-2xl border-2 border-border/50 backdrop-blur-sm"
              style={{
                width: 120,
                height: 120,
                transform,
                backfaceVisibility: "hidden",
                background: "hsl(var(--card) / 0.95)",
                boxShadow: "inset 0 0 20px hsl(var(--primary) / 0.05)",
              }}
            >
              <span className="text-4xl select-none">{FACE_EMOJIS[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-heading text-lg font-bold text-foreground">
          {isRolling ? "骰子擲出中..." : "隨機挑戰"}
        </span>
        {!isRolling && (
          <p className="text-xs text-muted-foreground font-medium leading-relaxed">
            點擊骰子隨機挑選一個<br />未知情境進行練習
          </p>
        )}
      </div>

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
