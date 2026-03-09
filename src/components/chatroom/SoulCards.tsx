import { useState, useCallback, useMemo } from "react";
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

const CARD_COUNT = 5;

// Warm palette for card backs
const CARD_BACK_COLORS = [
  "from-[hsl(12,69%,63%)] to-[hsl(12,69%,50%)]",    // Terracotta
  "from-[hsl(150,25%,55%)] to-[hsl(150,25%,42%)]",   // Sage
  "from-[hsl(43,74%,75%)] to-[hsl(43,74%,60%)]",     // Gold
  "from-[hsl(200,40%,65%)] to-[hsl(200,40%,50%)]",    // Blue
  "from-[hsl(340,40%,65%)] to-[hsl(340,40%,50%)]",    // Pink
];

export default function SoulCards({ scenarios, open, onClose, onStart }: SoulCardsProps) {
  const [phase, setPhase] = useState<"spread" | "revealed">("spread");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [flipping, setFlipping] = useState(false);

  // Pick random scenarios for the spread
  const drawnScenarios = useMemo(() => {
    const shuffled = [...scenarios].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(CARD_COUNT, shuffled.length));
  }, [scenarios, open]); // re-shuffle when opened

  const handleCardClick = useCallback((idx: number) => {
    if (phase !== "spread" || flipping) return;
    vibrate(20);
    setSelectedIdx(idx);
    setFlipping(true);

    // Flip animation duration
    setTimeout(() => {
      setFlipping(false);
      setPhase("revealed");
      vibrate([15, 30, 15]);
    }, 800);
  }, [phase, flipping]);

  const handleRedraw = useCallback(() => {
    setPhase("spread");
    setSelectedIdx(null);
    setFlipping(false);
  }, []);

  const handleClose = useCallback(() => {
    setPhase("spread");
    setSelectedIdx(null);
    setFlipping(false);
    onClose();
  }, [onClose]);

  if (!open) return null;

  const selectedScenario = selectedIdx !== null ? drawnScenarios[selectedIdx] : null;

  // Fan-out positions
  const totalCards = drawnScenarios.length;
  const fanSpread = 60; // total degrees
  const fanStartAngle = -fanSpread / 2;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "radial-gradient(circle at 50% 40%, hsl(var(--foreground) / 0.5) 0%, hsl(var(--foreground) / 0.88) 100%)",
        backdropFilter: "blur(16px)",
        animation: "soulOverlayIn 0.35s ease-out forwards",
      }}
      onClick={phase === "spread" ? handleClose : undefined}
    >
      {/* Title */}
      <div
        className="absolute top-12 font-heading text-lg font-bold tracking-wide"
        style={{
          color: "hsl(var(--primary-foreground))",
          textShadow: "0 2px 12px hsl(var(--primary) / 0.5)",
          opacity: phase === "revealed" ? 0.6 : 1,
          transition: "opacity 0.3s",
        }}
      >
        {phase === "revealed" ? "✨ 命運已揭曉" : "🃏 選擇一張心靈牌卡"}
      </div>

      {/* Card Fan */}
      <div
        className="relative"
        style={{ width: 400, height: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {drawnScenarios.map((scenario, idx) => {
          const angle = fanStartAngle + (idx / (totalCards - 1 || 1)) * fanSpread;
          const isSelected = selectedIdx === idx;
          const isOther = selectedIdx !== null && !isSelected;

          // Position: fan from center bottom
          const rad = (angle * Math.PI) / 180;
          const fanRadius = 160;
          const x = Math.sin(rad) * fanRadius;
          const y = -Math.cos(rad) * fanRadius + fanRadius;

          return (
            <div
              key={scenario.id}
              className="absolute cursor-pointer"
              style={{
                left: "50%",
                bottom: 0,
                width: 140,
                height: 200,
                marginLeft: -70,
                transform: isOther
                  ? `translate(${x}px, ${y}px) rotate(${angle}deg) scale(0.7)`
                  : isSelected && phase === "revealed"
                    ? "translate(0, -40px) rotate(0deg) scale(1.15)"
                    : `translate(${x}px, ${y}px) rotate(${angle}deg)`,
                opacity: isOther ? 0.2 : 1,
                transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                perspective: "800px",
                zIndex: isSelected ? 20 : 10 - Math.abs(idx - Math.floor(totalCards / 2)),
                animation: selectedIdx === null && !flipping
                  ? `soulCardFloat${idx} 3s ease-in-out infinite alternate ${idx * 0.3}s`
                  : undefined,
                pointerEvents: isOther ? "none" : "auto",
              }}
              onClick={() => handleCardClick(idx)}
            >
              <div
                className="relative w-full h-full"
                style={{
                  transformStyle: "preserve-3d",
                  transform: (isSelected && (flipping || phase === "revealed"))
                    ? "rotateY(180deg)"
                    : "rotateY(0deg)",
                  transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* Card Back */}
                <div
                  className={`absolute inset-0 rounded-2xl border-2 border-border/30 shadow-xl bg-gradient-to-br ${CARD_BACK_COLORS[idx % CARD_BACK_COLORS.length]} flex items-center justify-center`}
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="text-center">
                    <span className="text-4xl opacity-30">🌿</span>
                    <div className="mt-2 text-[10px] font-bold tracking-widest uppercase opacity-40" style={{ color: "hsl(var(--primary-foreground))" }}>
                      SELf
                    </div>
                  </div>
                  {/* Decorative border pattern */}
                  <div className="absolute inset-2 rounded-xl border border-border/20" />
                </div>

                {/* Card Front */}
                <div
                  className="absolute inset-0 rounded-2xl border-2 border-primary/30 bg-card shadow-xl flex flex-col items-center justify-center p-4 text-center gap-2"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <span className="text-4xl">{scenario.emoji}</span>
                  <h4 className="font-heading text-sm font-bold text-foreground leading-tight">
                    {scenario.title}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full border border-primary/40 bg-primary/10 text-foreground">
                    {scenario.tag}
                  </span>
                  {scenario.guideSentence && (
                    <p className="text-[11px] text-muted-foreground italic leading-snug mt-1">
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
      {phase === "revealed" && selectedScenario && (
        <div
          className="absolute bottom-16 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="glass"
            size="lg"
            onClick={handleRedraw}
            className="gap-2"
          >
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
      {phase === "spread" && (
        <div className="absolute bottom-8 text-xs text-muted-foreground/60 font-medium">
          點擊空白處關閉
        </div>
      )}

      <style>{`
        @keyframes soulOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        ${drawnScenarios.map((_, i) => `
          @keyframes soulCardFloat${i} {
            0% { transform: translate(${Math.sin(((fanStartAngle + (i / (totalCards - 1 || 1)) * fanSpread) * Math.PI) / 180) * 160}px, ${-Math.cos(((fanStartAngle + (i / (totalCards - 1 || 1)) * fanSpread) * Math.PI) / 180) * 160 + 160}px) rotate(${fanStartAngle + (i / (totalCards - 1 || 1)) * fanSpread}deg) translateY(0); }
            100% { transform: translate(${Math.sin(((fanStartAngle + (i / (totalCards - 1 || 1)) * fanSpread) * Math.PI) / 180) * 160}px, ${-Math.cos(((fanStartAngle + (i / (totalCards - 1 || 1)) * fanSpread) * Math.PI) / 180) * 160 + 160}px) rotate(${fanStartAngle + (i / (totalCards - 1 || 1)) * fanSpread}deg) translateY(-8px); }
          }
        `).join("")}
      `}</style>
    </div>,
    document.body
  );
}
