import { useState, useCallback, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { sfxShuffle, sfxFlip, sfxReveal, sfxClick } from "@/lib/soulCardSfx";

interface Scenario {
  id: number;
  title: string;
  tag: string;
  emoji: string;
  description: string;
  guideSentence?: string;
}

interface SoulCardsProps {
  scenarios: Scenario[];
  open: boolean;
  onClose: () => void;
  onStart: (scenario: Scenario) => void;
}

function vibrate(pattern: number | number[]) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}

const CARD_BACK_COLORS = [
  "from-[hsl(12,69%,63%)] to-[hsl(12,69%,50%)]",
  "from-[hsl(150,25%,55%)] to-[hsl(150,25%,42%)]",
  "from-[hsl(43,74%,75%)] to-[hsl(43,74%,60%)]",
  "from-[hsl(200,40%,65%)] to-[hsl(200,40%,50%)]",
  "from-[hsl(340,40%,65%)] to-[hsl(340,40%,50%)]",
];

const SHUFFLE_DURATION = 2200;
const REVEAL_DURATION = 1500;
const CARD_COUNT = 5;

type GameState = "idle" | "shuffling" | "revealing" | "revealed";

export default function SoulCards({ scenarios, open, onClose, onStart }: SoulCardsProps) {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [shuffleTick, setShuffleTick] = useState(0);

  // Pick random scenarios
  const drawnScenarios = useMemo(() => {
    const shuffled = [...scenarios].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(CARD_COUNT, shuffled.length));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarios, open]);

  // Auto-start shuffle when opened
  useEffect(() => {
    if (open && gameState === "idle") {
      // Small delay for overlay fade-in
      const t = setTimeout(() => startDraw(), 600);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Shuffle tick animation
  useEffect(() => {
    if (gameState !== "shuffling") return;
    const interval = setInterval(() => {
      setShuffleTick((t) => t + 1);
    }, 120);
    return () => clearInterval(interval);
  }, [gameState]);

  const startDraw = useCallback(() => {
    setGameState("shuffling");
    setSelectedIdx(null);
    setShuffleTick(0);
    vibrate(15);

    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * Math.min(CARD_COUNT, scenarios.length));
      setSelectedIdx(randomIdx);
      setGameState("revealing");
      vibrate([20, 40, 20]);

      setTimeout(() => {
        setGameState("revealed");
        vibrate([15, 30, 15, 30, 15]);
      }, REVEAL_DURATION);
    }, SHUFFLE_DURATION);
  }, [scenarios.length]);

  const handleRedraw = useCallback(() => {
    setGameState("idle");
    setSelectedIdx(null);
    setTimeout(() => startDraw(), 200);
  }, [startDraw]);

  const handleClose = useCallback(() => {
    setGameState("idle");
    setSelectedIdx(null);
    onClose();
  }, [onClose]);

  if (!open) return null;

  const selectedScenario = selectedIdx !== null ? drawnScenarios[selectedIdx] : null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "radial-gradient(circle at 50% 40%, hsl(var(--foreground) / 0.5) 0%, hsl(var(--foreground) / 0.92) 100%)",
        backdropFilter: "blur(20px)",
        animation: "soulOverlayIn 0.4s ease-out forwards",
      }}
      onClick={gameState === "revealed" ? handleClose : undefined}
    >
      {/* Title */}
      <div
        className="absolute top-10 flex flex-col items-center gap-2"
        style={{
          opacity: gameState === "shuffling" ? 1 : gameState === "revealed" ? 0.5 : 0.8,
          transition: "opacity 0.5s",
        }}
      >
        <span
          className="font-heading text-lg font-bold tracking-wide"
          style={{
            color: "hsl(var(--primary-foreground))",
            textShadow: "0 2px 16px hsl(var(--primary) / 0.6)",
          }}
        >
          {gameState === "shuffling" && "🃏 命運正在洗牌中..."}
          {gameState === "revealing" && "✨ 揭曉中..."}
          {gameState === "revealed" && "🌟 命運牌卡已揭曉"}
          {gameState === "idle" && "🃏 心靈牌卡"}
        </span>
        {gameState === "shuffling" && (
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: "hsl(var(--primary))",
                  animation: `dotPulse 0.6s ease-in-out ${i * 0.15}s infinite alternate`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Cards Area */}
      <div
        className="relative"
        style={{ width: 320, height: 420 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Multi-layer reveal VFX ── */}
        {(gameState === "revealing" || gameState === "revealed") && (
          <>
            {/* Layer 1: Warm radial glow burst */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{
                width: gameState === "revealed" ? 600 : 20,
                height: gameState === "revealed" ? 600 : 20,
                background: "radial-gradient(circle, hsl(43 74% 75% / 0.4) 0%, hsl(12 69% 63% / 0.15) 40%, transparent 70%)",
                transition: "all 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
            {/* Layer 2: Secondary pulse ring */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{
                width: gameState === "revealed" ? 400 : 0,
                height: gameState === "revealed" ? 400 : 0,
                border: "2px solid hsl(43 74% 75% / 0.3)",
                transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
                opacity: gameState === "revealed" ? 0 : 1,
              }}
            />
            {/* Layer 3: Inner bright flash */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{
                width: 200,
                height: 200,
                background: "radial-gradient(circle, hsl(43 90% 88% / 0.6) 0%, transparent 60%)",
                opacity: gameState === "revealing" ? 1 : 0,
                transform: `translate(-50%, -50%) scale(${gameState === "revealing" ? 1.5 : 0})`,
                transition: "all 0.8s ease-out",
              }}
            />
          </>
        )}

        {/* ── Golden burst particles ── */}
        {gameState === "revealed" && (
          <>
            {/* Ring 1: Large golden orbs – slow, far */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i / 16) * 360 + (i % 2 === 0 ? 8 : 0);
              const distance = 120 + Math.sin(i * 1.7) * 40;
              const size = 5 + Math.sin(i * 2.3) * 3;
              const delay = 0.05 + i * 0.04;
              const hue = i % 4 === 0 ? "43, 85%, 72%" : i % 4 === 1 ? "35, 90%, 65%" : i % 4 === 2 ? "50, 80%, 78%" : "28, 75%, 60%";
              return (
                <div
                  key={`gold-${i}`}
                  className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: `hsl(${hue})`,
                    boxShadow: `0 0 ${size * 2}px hsl(${hue} / 0.8), 0 0 ${size * 4}px hsl(${hue} / 0.3)`,
                    animation: `particleBurst ${1.2 + Math.sin(i) * 0.3}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`,
                    "--burst-angle": `${angle}deg`,
                    "--burst-distance": `${distance}px`,
                  } as React.CSSProperties}
                />
              );
            })}

            {/* Ring 2: Tiny warm sparkles – fast, close */}
            {Array.from({ length: 20 }).map((_, i) => {
              const angle = (i / 20) * 360 + 15;
              const distance = 50 + Math.cos(i * 3.1) * 30;
              const size = 2 + Math.random() * 2;
              const delay = i * 0.025;
              const colors = ["43, 74%, 75%", "12, 69%, 63%", "30, 80%, 68%", "55, 70%, 70%"];
              const color = colors[i % colors.length];
              return (
                <div
                  key={`spark-${i}`}
                  className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: `hsl(${color})`,
                    boxShadow: `0 0 ${size * 3}px hsl(${color} / 0.6)`,
                    animation: `particleBurst ${0.8 + Math.sin(i * 2) * 0.2}s ease-out ${delay}s forwards`,
                    "--burst-angle": `${angle}deg`,
                    "--burst-distance": `${distance}px`,
                  } as React.CSSProperties}
                />
              );
            })}

            {/* Ring 3: Streaking trails */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * 360 + 22;
              const distance = 140 + i * 10;
              const delay = 0.1 + i * 0.06;
              return (
                <div
                  key={`trail-${i}`}
                  className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
                  style={{
                    width: 2,
                    height: 12,
                    background: "linear-gradient(to bottom, hsl(43, 90%, 80%), transparent)",
                    animation: `particleBurst 1.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`,
                    "--burst-angle": `${angle}deg`,
                    "--burst-distance": `${distance}px`,
                  } as React.CSSProperties}
                />
              );
            })}

            {/* Floating shimmer dots (persist) */}
            {Array.from({ length: 6 }).map((_, i) => {
              const x = -60 + Math.sin(i * 1.8) * 120;
              const y = -80 + Math.cos(i * 2.2) * 100;
              return (
                <div
                  key={`shimmer-${i}`}
                  className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
                  style={{
                    width: 3,
                    height: 3,
                    backgroundColor: "hsl(43, 85%, 78%)",
                    boxShadow: "0 0 8px hsl(43, 85%, 78% / 0.6)",
                    transform: `translate(${x}px, ${y}px)`,
                    animation: `shimmerFloat 2.5s ease-in-out ${i * 0.4}s infinite alternate`,
                  }}
                />
              );
            })}
          </>
        )}

        {/* Card stack */}
        {drawnScenarios.map((scenario, idx) => {
          const isSelected = selectedIdx === idx;
          const isOther = selectedIdx !== null && !isSelected;
          const colorIdx = idx % CARD_BACK_COLORS.length;

          // Shuffling: cards orbit in a circle
          let cardStyle: React.CSSProperties = {};

          if (gameState === "shuffling") {
            const baseAngle = ((shuffleTick * 25 + idx * (360 / drawnScenarios.length)) % 360);
            const rad = (baseAngle * Math.PI) / 180;
            const orbitRadius = 55;
            const x = Math.cos(rad) * orbitRadius;
            const y = Math.sin(rad) * orbitRadius * 0.4; // Elliptical
            const scale = 0.75 + (Math.sin(rad) + 1) * 0.08;
            const zIdx = Math.round((Math.sin(rad) + 1) * 10);
            cardStyle = {
              transform: `translate(${x}px, ${y - 20}px) rotate(${baseAngle * 0.15}deg) scale(${scale})`,
              zIndex: zIdx,
              opacity: 0.85,
              transition: "none",
            };
          } else if (gameState === "revealing") {
            if (isSelected) {
              cardStyle = {
                transform: "translate(0, -30px) scale(1.3)",
                zIndex: 30,
                opacity: 1,
                transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              };
            } else {
              const spreadAngle = (idx - 2) * 35;
              cardStyle = {
                transform: `translate(${spreadAngle * 2}px, 80px) rotate(${spreadAngle}deg) scale(0.5)`,
                zIndex: 1,
                opacity: 0,
                transition: "all 0.6s ease-out",
              };
            }
          } else if (gameState === "revealed") {
            if (isSelected) {
              cardStyle = {
                transform: "translate(0, -40px) scale(1.15)",
                zIndex: 30,
                opacity: 1,
                transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
              };
            } else {
              cardStyle = {
                transform: "translate(0, 100px) scale(0.4)",
                zIndex: 1,
                opacity: 0,
                transition: "all 0.4s ease-out",
                pointerEvents: "none",
              };
            }
          } else {
            // idle: stacked in center
            cardStyle = {
              transform: `translate(${idx * 2 - 4}px, ${idx * -2}px) rotate(${(idx - 2) * 3}deg) scale(0.9)`,
              zIndex: CARD_COUNT - idx,
              opacity: 0.7 + idx * 0.06,
              transition: "all 0.5s ease-out",
            };
          }

          const showFront = isSelected && (gameState === "revealing" || gameState === "revealed");

          return (
            <div
              key={scenario.id}
              className="absolute left-1/2 top-1/2"
              style={{
                width: 160,
                height: 230,
                marginLeft: -80,
                marginTop: -115,
                perspective: "1000px",
                ...cardStyle,
              }}
            >
              <div
                className="relative w-full h-full"
                style={{
                  transformStyle: "preserve-3d",
                  transform: showFront ? "rotateY(180deg)" : "rotateY(0deg)",
                  transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* Card Back */}
                <div
                  className={`absolute inset-0 rounded-2xl border-2 border-border/30 shadow-xl bg-gradient-to-br ${CARD_BACK_COLORS[colorIdx]} flex items-center justify-center`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="text-center">
                    <span className="text-4xl opacity-30">🌿</span>
                    <div className="mt-2 text-[10px] font-bold tracking-widest uppercase opacity-40" style={{ color: "hsl(var(--primary-foreground))" }}>
                      SELf
                    </div>
                  </div>
                  <div className="absolute inset-2 rounded-xl border border-border/20" />
                </div>

                {/* Card Front */}
                <div
                  className="absolute inset-0 rounded-2xl border-2 border-primary/30 bg-card shadow-xl flex flex-col items-center justify-center p-5 text-center gap-2"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <span className="text-5xl">{scenario.emoji}</span>
                  <h4 className="font-heading text-base font-bold text-foreground leading-tight mt-1">
                    {scenario.title}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full border border-primary/40 bg-primary/10 text-foreground">
                    {scenario.tag}
                  </span>
                  {scenario.guideSentence && (
                    <p className="text-[11px] text-muted-foreground italic leading-snug mt-2">
                      「{scenario.guideSentence}」
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action buttons (after reveal) */}
      {gameState === "revealed" && selectedScenario && (
        <div
          className="absolute bottom-16 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
          onClick={(e) => e.stopPropagation()}
        >
          <Button variant="glass" size="lg" onClick={handleRedraw} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            重新抽取
          </Button>
          <Button
            size="lg"
            onClick={() => {
              onStart(selectedScenario);
              handleClose();
            }}
          >
            開始練習
          </Button>
        </div>
      )}

      {/* Close hint */}
      {gameState === "idle" && (
        <div className="absolute bottom-8 text-xs text-muted-foreground/60 font-medium">
          準備抽取中...
        </div>
      )}
      {gameState === "revealed" && (
        <div className="absolute bottom-8 text-xs text-muted-foreground/60 font-medium">
          點擊空白處關閉
        </div>
      )}

      <style>{`
        @keyframes soulOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes dotPulse {
          from { opacity: 0.3; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1.3); }
        }
        @keyframes particleBurst {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(var(--burst-angle)) translateY(0) scale(0);
          }
          15% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(var(--burst-angle)) translateY(calc(var(--burst-distance) * -0.3)) scale(1.4);
          }
          60% {
            opacity: 0.8;
            transform: translate(-50%, -50%) rotate(var(--burst-angle)) translateY(calc(var(--burst-distance) * -0.85)) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(var(--burst-angle)) translateY(calc(var(--burst-distance) * -1.1)) scale(0.3);
          }
        }
        @keyframes shimmerFloat {
          0% { opacity: 0.4; transform: translate(var(--tx, 0), var(--ty, 0)) scale(0.8); }
          100% { opacity: 0.9; transform: translate(var(--tx, 0), var(--ty, 0)) scale(1.3) translateY(-8px); }
        }
      `}</style>
    </div>,
    document.body
  );
}
