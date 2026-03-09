import { useState, useCallback, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

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
        {/* Glow burst on reveal */}
        {(gameState === "revealing" || gameState === "revealed") && (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: gameState === "revealed" ? 500 : 0,
              height: gameState === "revealed" ? 500 : 0,
              background: "radial-gradient(circle, hsl(43 74% 75% / 0.35) 0%, transparent 70%)",
              transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
              pointerEvents: "none",
            }}
          />
        )}

        {/* Sparkle particles on reveal */}
        {gameState === "revealed" && (
          <>
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * 360;
              const distance = 80 + Math.random() * 60;
              const size = 3 + Math.random() * 4;
              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 rounded-full"
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: i % 3 === 0 ? "hsl(43, 74%, 75%)" : i % 3 === 1 ? "hsl(12, 69%, 63%)" : "hsl(var(--primary))",
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${distance}px)`,
                    opacity: 0,
                    animation: `sparkleOut 1s ease-out ${0.1 + i * 0.05}s forwards`,
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
        @keyframes sparkleOut {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
          30% { opacity: 1; transform: translate(-50%, -50%) scale(1.5); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5) translateY(-30px); }
        }
      `}</style>
    </div>,
    document.body
  );
}
