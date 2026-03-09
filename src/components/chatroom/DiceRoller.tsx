import { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

const FACE_EMOJIS = ["📝", "👥", "😤", "🤝", "🌱", "💭"];

interface DiceRollerProps {
  onRollComplete: () => void;
  onClick: () => void;
  isRolling: boolean;
}

function vibrate(pattern: number | number[]) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}

export default function DiceRoller({ onRollComplete, onClick, isRolling }: DiceRollerProps) {
  const [finalFace, setFinalFace] = useState(0);
  const [phase, setPhase] = useState<"idle" | "overlay-in" | "spinning" | "landing" | "reveal">("idle");
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(() => {
    if (isRolling || phase !== "idle") return;
    const face = Math.floor(Math.random() * 6);
    setFinalFace(face);
    onClick();

    // Phase 1: overlay appears
    setPhase("overlay-in");
    vibrate(30);

    // Phase 2: spinning in center
    setTimeout(() => setPhase("spinning"), 250);

    // Phase 3: landing bounce
    setTimeout(() => {
      setPhase("landing");
      vibrate(15);
    }, 1800);

    // Phase 4: reveal sparkle
    setTimeout(() => {
      setPhase("reveal");
      vibrate([20, 30, 40]);
    }, 2500);

    // Done
    setTimeout(() => {
      onRollComplete();
      // Keep overlay briefly so ScenarioDetail can take over
      setTimeout(() => setPhase("idle"), 300);
    }, 3200);
  }, [isRolling, phase, onClick, onRollComplete]);

  const faceTransforms = [
    "rotateY(0deg) translateZ(60px)",
    "rotateY(180deg) translateZ(60px)",
    "rotateY(90deg) translateZ(60px)",
    "rotateY(-90deg) translateZ(60px)",
    "rotateX(90deg) translateZ(60px)",
    "rotateX(-90deg) translateZ(60px)",
  ];

  const landRotations = [
    "rotateX(0deg) rotateY(0deg)",
    "rotateX(0deg) rotateY(180deg)",
    "rotateX(0deg) rotateY(-90deg)",
    "rotateX(0deg) rotateY(90deg)",
    "rotateX(-90deg) rotateY(0deg)",
    "rotateX(90deg) rotateY(0deg)",
  ];

  const isActive = phase !== "idle";

  const diceSize = isActive ? 120 : 56;
  const tzHalf = isActive ? 60 : 28;

  const renderDice = (size: number, tz: number, extraClass?: string) => (
    <div className={extraClass} style={{ perspective: "600px", width: size, height: size }}>
      <div
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          width: size,
          height: size,
          animation:
            phase === "spinning"
              ? "casinoSpin 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards"
              : phase === "landing"
                ? "casinoLand 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
                : phase === "reveal"
                  ? undefined
                  : undefined,
          transform:
            phase === "overlay-in"
              ? "rotateX(-15deg) rotateY(25deg) scale(0.4)"
              : phase === "reveal" || phase === "landing"
                ? landRotations[finalFace]
                : !isActive
                  ? "rotateX(-15deg) rotateY(25deg)"
                  : undefined,
          transition: phase === "overlay-in" ? "transform 0.3s cubic-bezier(0, 0, 0.2, 1)" : undefined,
          ["--land-rotation" as any]: landRotations[finalFace],
        }}
      >
        {faceTransforms.map((ft, i) => {
          const t = ft.replace(/translateZ\(\d+px\)/, `translateZ(${tz}px)`);
          return (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center rounded-xl border border-border/30"
              style={{
                width: size,
                height: size,
                transform: t,
                backfaceVisibility: "hidden",
                background: "hsl(var(--card) / 0.92)",
                boxShadow: "inset 0 2px 4px hsl(var(--foreground) / 0.08)",
              }}
            >
              <span className={`select-none ${isActive ? "text-4xl" : "text-xl"}`}>
                {FACE_EMOJIS[i]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Fullscreen overlay portal
  const overlay = isActive
    ? createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, hsl(var(--foreground) / 0.5) 0%, hsl(var(--foreground) / 0.85) 100%)",
            backdropFilter: "blur(12px)",
            animation: "overlayFadeIn 0.25s ease-out forwards",
          }}
        >
          {/* Glow ring behind dice */}
          <div
            className="absolute rounded-full"
            style={{
              width: 240,
              height: 240,
              background:
                "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, hsl(var(--primary) / 0.1) 50%, transparent 70%)",
              animation:
                phase === "spinning"
                  ? "glowPulse 0.6s ease-in-out infinite alternate"
                  : phase === "reveal"
                    ? "glowBurst 0.5s ease-out forwards"
                    : undefined,
            }}
          />

          {/* Sparkle particles on reveal */}
          {phase === "reveal" && (
            <>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: 6,
                    height: 6,
                    background: `hsl(var(--${i % 2 === 0 ? "primary" : "accent"}))`,
                    animation: `sparkle${i} 0.8s ease-out forwards`,
                    opacity: 0,
                  }}
                />
              ))}
            </>
          )}

          {/* Center dice */}
          <div className="relative">
            {renderDice(120, 60, "relative")}
          </div>

          {/* Label below dice */}
          <div
            className="absolute font-heading text-lg font-bold tracking-wide"
            style={{
              bottom: "calc(50% - 100px)",
              color: "hsl(var(--primary-foreground))",
              opacity: phase === "reveal" ? 1 : 0.6,
              transition: "opacity 0.3s",
              textShadow: "0 2px 8px hsl(var(--primary) / 0.5)",
            }}
          >
            {phase === "reveal" ? "✨ 挑戰決定！" : "🎲 擲骰中..."}
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="group flex flex-col items-center gap-2 rounded-xl opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
        style={{ minWidth: 72 }}
      >
        <div className="relative">
          {renderDice(56, 28, "relative")}
        </div>
        <span className="text-xs font-medium text-muted-foreground/70 whitespace-nowrap">
          {isRolling ? "擲骰中..." : "隨機挑戰"}
        </span>
      </button>

      {overlay}

      <style>{`
        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes casinoSpin {
          0% {
            transform: rotateX(-15deg) rotateY(25deg) scale(1);
          }
          15% {
            transform: rotateX(360deg) rotateY(-300deg) rotateZ(90deg) scale(1.1);
          }
          30% {
            transform: rotateX(720deg) rotateY(600deg) rotateZ(-180deg) scale(1.15);
          }
          50% {
            transform: rotateX(1200deg) rotateY(-1000deg) rotateZ(270deg) scale(1.1);
          }
          70% {
            transform: rotateX(1600deg) rotateY(1300deg) rotateZ(-100deg) scale(1.05);
          }
          85% {
            transform: rotateX(1900deg) rotateY(-1500deg) rotateZ(40deg) scale(1);
          }
          100% {
            transform: var(--land-rotation) scale(1);
          }
        }

        @keyframes casinoLand {
          0% {
            transform: var(--land-rotation) translateY(0) scaleY(1) scaleX(1);
          }
          30% {
            transform: var(--land-rotation) translateY(12px) scaleY(0.82) scaleX(1.18);
          }
          50% {
            transform: var(--land-rotation) translateY(-18px) scaleY(1.1) scaleX(0.95);
          }
          70% {
            transform: var(--land-rotation) translateY(5px) scaleY(0.94) scaleX(1.06);
          }
          85% {
            transform: var(--land-rotation) translateY(-4px) scaleY(1.02) scaleX(0.99);
          }
          100% {
            transform: var(--land-rotation) translateY(0) scaleY(1) scaleX(1);
          }
        }

        @keyframes glowPulse {
          from {
            transform: scale(1);
            opacity: 0.6;
          }
          to {
            transform: scale(1.3);
            opacity: 1;
          }
        }

        @keyframes glowBurst {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(2);
            opacity: 0.6;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        ${[...Array(8)]
          .map((_, i) => {
            const angle = (i * 45) * (Math.PI / 180);
            const dist = 80 + Math.random() * 60;
            const x = Math.cos(angle) * dist;
            const y = Math.sin(angle) * dist;
            return `
              @keyframes sparkle${i} {
                0% { transform: translate(0, 0) scale(1); opacity: 1; }
                100% { transform: translate(${x.toFixed(0)}px, ${y.toFixed(0)}px) scale(0); opacity: 0; }
              }
            `;
          })
          .join("")}
      `}</style>
    </>
  );
}
