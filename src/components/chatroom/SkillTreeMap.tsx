import { useState } from "react";
import { Sparkles, LayoutGrid, List } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ScenarioOverview from "./ScenarioOverview";

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

const COMPETENCY_COLORS = [
  "hsl(12, 69%, 63%)",
  "hsl(150, 25%, 55%)",
  "hsl(43, 74%, 70%)",
  "hsl(200, 40%, 65%)",
  "hsl(340, 40%, 65%)",
];

type ViewMode = "grid" | "overview";

export default function SkillTreeMap({ groups, onSelectScenario, onOpenSoulCards }: SkillTreeMapProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const filteredScenarios = activeFilter
    ? groups.find((g) => g.id === activeFilter)?.scenarios ?? []
    : groups.flatMap((g) => g.scenarios);

  if (viewMode === "overview") {
    return (
      <div className="h-full flex flex-col bg-background overflow-hidden">
        {/* Tab bar */}
        <div className="shrink-0 px-6 pt-5 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-1 bg-muted rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-muted-foreground hover:bg-background/60 transition-all"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              情境選擇
            </button>
            <button
              onClick={() => setViewMode("overview")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-background text-foreground shadow-sm transition-all"
            >
              <List className="w-3.5 h-3.5" />
              情境總覽
            </button>
          </div>

          <button
            onClick={onOpenSoulCards}
            className="shrink-0 ml-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
          >
            <span className="text-lg">🃏</span>
            <span className="text-xs font-bold tracking-wide">心靈牌卡</span>
            <Sparkles className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <ScenarioOverview onSelectScenario={onSelectScenario} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Top: Tab switch + Filter tabs + Soul Cards button */}
      <div className="shrink-0 px-6 pt-5 pb-3 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* View mode toggle */}
            <div className="flex items-center gap-1 bg-muted rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-background text-foreground shadow-sm transition-all"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                情境選擇
              </button>
              <button
                onClick={() => setViewMode("overview")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-muted-foreground hover:bg-background/60 transition-all"
              >
                <List className="w-3.5 h-3.5" />
                情境總覽
              </button>
            </div>

            {/* Competency filter chips */}
            <div className="hidden md:flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setActiveFilter(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  !activeFilter
                    ? "bg-foreground text-background shadow-md"
                    : "border border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                全部
              </button>
              {groups.map((group, idx) => (
                <button
                  key={group.id}
                  onClick={() => setActiveFilter(activeFilter === group.id ? null : group.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                    activeFilter === group.id
                      ? "text-card shadow-md"
                      : "border border-border text-muted-foreground hover:bg-muted"
                  }`}
                  style={
                    activeFilter === group.id
                      ? { backgroundColor: COMPETENCY_COLORS[idx % COMPETENCY_COLORS.length] }
                      : undefined
                  }
                >
                  <span className="text-sm">{group.icon}</span>
                  {group.label}
                </button>
              ))}
            </div>
          </div>

          {/* Soul Cards button */}
          <button
            onClick={onOpenSoulCards}
            className="shrink-0 ml-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
          >
            <span className="text-lg">🃏</span>
            <span className="text-xs font-bold tracking-wide">心靈牌卡</span>
            <Sparkles className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Mobile filter chips */}
        <div className="flex md:hidden items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveFilter(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
              !activeFilter
                ? "bg-foreground text-background shadow-md"
                : "border border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            全部
          </button>
          {groups.map((group, idx) => (
            <button
              key={group.id}
              onClick={() => setActiveFilter(activeFilter === group.id ? null : group.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                activeFilter === group.id
                  ? "text-card shadow-md"
                  : "border border-border text-muted-foreground hover:bg-muted"
              }`}
              style={
                activeFilter === group.id
                  ? { backgroundColor: COMPETENCY_COLORS[idx % COMPETENCY_COLORS.length] }
                  : undefined
              }
            >
              <span className="text-sm">{group.icon}</span>
              {group.label}
            </button>
          ))}
        </div>

        {/* Active group description */}
        {activeFilter && (
          <p className="text-xs text-muted-foreground font-medium animate-in fade-in duration-300">
            {groups.find((g) => g.id === activeFilter)?.description}
          </p>
        )}
      </div>

      {/* Scenario cards grid */}
      <ScrollArea className="flex-1 px-6 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-1">
          {filteredScenarios.map((scenario, idx) => {
            const groupIdx = groups.findIndex((g) => g.scenarios.some((s) => s.id === scenario.id));
            const groupColor = COMPETENCY_COLORS[groupIdx % COMPETENCY_COLORS.length];

            return (
              <button
                key={scenario.id}
                onClick={() => onSelectScenario(scenario.id)}
                className="group relative rounded-2xl border-2 border-border/40 bg-card shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center p-5 text-center gap-3 cursor-pointer"
                style={{
                  animation: `cardFadeIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.05}s both`,
                }}
              >
                {/* Color accent bar */}
                <div
                  className="absolute top-0 left-4 right-4 h-1 rounded-b-full opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: groupColor }}
                />

                <span className="text-4xl mt-2 group-hover:scale-110 transition-transform duration-300">
                  {scenario.emoji}
                </span>
                <h4 className="font-heading text-sm font-bold text-foreground leading-tight line-clamp-2">
                  {scenario.title}
                </h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                  {scenario.description}
                </p>
                <span
                  className="text-[10px] px-2.5 py-1 rounded-full font-medium"
                  style={{
                    backgroundColor: `${groupColor}15`,
                    color: groupColor,
                  }}
                >
                  {scenario.tag}
                </span>
              </button>
            );
          })}
        </div>
      </ScrollArea>

      <style>{`
        @keyframes cardFadeIn {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
