import { useState, useCallback } from "react";
import { Sparkles, ArrowLeft } from "lucide-react";

interface Scenario {
  id: number;
  title: string;
  tag: string;
  emoji: string;
  description: string;
  guideSentence?: string;
}

interface CompetencyGroup {
  id: string;
  label: string;
  icon: string;
  color: string;
  description: string;
  scenarios: Scenario[];
}

interface SkillTreeMapProps {
  groups: CompetencyGroup[];
  onSelectScenario: (id: number) => void;
  onOpenSoulCards: () => void;
}

// Warm gradient pairs for competency cards (consistent with SoulCards backs)
const COMPETENCY_GRADIENTS = [
  "from-[hsl(12,69%,63%)] to-[hsl(12,69%,50%)]",
  "from-[hsl(150,25%,55%)] to-[hsl(150,25%,42%)]",
  "from-[hsl(43,74%,75%)] to-[hsl(43,74%,60%)]",
  "from-[hsl(200,40%,65%)] to-[hsl(200,40%,50%)]",
  "from-[hsl(340,40%,65%)] to-[hsl(340,40%,50%)]",
];

export default function SkillTreeMap({ groups, onSelectScenario, onOpenSoulCards }: SkillTreeMapProps) {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);

  const handleGroupClick = useCallback((groupId: string) => {
    if (animating) return;
    setAnimating(true);
    setSelectedGroup(groupId);
    setTimeout(() => setAnimating(false), 500);
  }, [animating]);

  const handleBack = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setSelectedGroup(null);
    setTimeout(() => setAnimating(false), 500);
  }, [animating]);

  const activeGroup = groups.find((g) => g.id === selectedGroup);

  return (
    <div className="h-full flex items-center justify-center bg-background overflow-hidden relative">
      {/* Level 1: Competency Wheel */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-500"
        style={{
          opacity: selectedGroup ? 0 : 1,
          transform: selectedGroup ? "scale(0.8)" : "scale(1)",
          pointerEvents: selectedGroup ? "none" : "auto",
        }}
      >
        <div className="relative" style={{ width: 420, height: 420 }}>
          {/* Center: Soul Cards entry */}
          <button
            onClick={onOpenSoulCards}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-24 h-24 rounded-2xl border-2 border-border/30 bg-card shadow-xl flex flex-col items-center justify-center gap-1 hover:scale-110 hover:shadow-2xl transition-all duration-300 group"
          >
            <span className="text-3xl relative">
              🃏
              <Sparkles className="w-3.5 h-3.5 text-primary absolute -top-1.5 -right-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
            <span className="text-[10px] font-bold text-primary tracking-wide">心靈牌卡</span>
          </button>

          {/* Competency cards arranged in a circle */}
          {groups.map((group, idx) => {
            const angle = (idx / groups.length) * 360 - 90; // start from top
            const rad = (angle * Math.PI) / 180;
            const radius = 155;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            return (
              <button
                key={group.id}
                onClick={() => handleGroupClick(group.id)}
                className="absolute rounded-2xl border-2 border-border/20 shadow-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:shadow-2xl transition-all duration-300"
                style={{
                  width: 120,
                  height: 140,
                  left: "50%",
                  top: "50%",
                  marginLeft: -60,
                  marginTop: -70,
                  transform: `translate(${x}px, ${y}px) scale(1)`,
                  animation: `wheelCardFloat ${3 + idx * 0.5}s ease-in-out infinite alternate ${idx * 0.4}s`,
                }}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${COMPETENCY_GRADIENTS[idx % COMPETENCY_GRADIENTS.length]} opacity-90`} />
                {/* Inner border */}
                <div className="absolute inset-2 rounded-xl border border-border/15" />
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <span className="text-3xl">{group.icon}</span>
                  <span className="text-xs font-bold tracking-wide text-card" style={{ textShadow: "0 1px 4px hsl(var(--foreground) / 0.3)" }}>
                    {group.label}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-card/20 text-card font-medium">
                    {group.scenarios.length} 情境
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Level 2: Scenario Cards Fan */}
      <div
        className="absolute inset-0 flex flex-col items-center transition-all duration-500"
        style={{
          opacity: selectedGroup ? 1 : 0,
          transform: selectedGroup ? "scale(1)" : "scale(1.1)",
          pointerEvents: selectedGroup ? "auto" : "none",
        }}
      >
        {activeGroup && (
          <>
            {/* Header */}
            <div className="flex items-center gap-4 mt-8 mb-6">
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                返回
              </button>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm"
                  style={{ background: `hsl(${activeGroup.color} / 0.15)` }}
                >
                  {activeGroup.icon}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground">{activeGroup.label}</h3>
                  <p className="text-xs text-muted-foreground">{activeGroup.description}</p>
                </div>
              </div>
            </div>

            {/* Scenario cards grid/fan */}
            <div className="flex-1 flex items-center justify-center pb-8">
              <div className="relative" style={{ width: Math.min(activeGroup.scenarios.length * 170, 700), height: 280 }}>
                {activeGroup.scenarios.map((scenario, idx) => {
                  const total = activeGroup.scenarios.length;
                  const fanSpread = Math.min(total * 18, 60);
                  const fanStart = -fanSpread / 2;
                  const angle = total === 1 ? 0 : fanStart + (idx / (total - 1)) * fanSpread;
                  const rad = (angle * Math.PI) / 180;
                  const fanRadius = 140;
                  const x = Math.sin(rad) * fanRadius;
                  const y = -Math.cos(rad) * fanRadius + fanRadius;

                  return (
                    <button
                      key={scenario.id}
                      onClick={() => onSelectScenario(scenario.id)}
                      className="absolute rounded-2xl border-2 border-primary/20 bg-card shadow-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center gap-2 cursor-pointer"
                      style={{
                        width: 140,
                        height: 200,
                        left: "50%",
                        bottom: 0,
                        marginLeft: -70,
                        transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`,
                        animation: `scenarioCardIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.08}s both`,
                      }}
                    >
                      <span className="text-3xl">{scenario.emoji}</span>
                      <h4 className="font-heading text-xs font-bold text-foreground leading-tight line-clamp-2">
                        {scenario.title}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full border border-border bg-muted text-muted-foreground">
                        {scenario.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes wheelCardFloat {
          0% { transform: translate(var(--tw-translate-x, 0), var(--tw-translate-y, 0)) translateY(0); }
          100% { transform: translate(var(--tw-translate-x, 0), var(--tw-translate-y, 0)) translateY(-6px); }
        }
        @keyframes scenarioCardIn {
          from {
            opacity: 0;
            transform: translate(0, 40px) rotate(0deg) scale(0.8);
          }
        }
      `}</style>
    </div>
  );
}
