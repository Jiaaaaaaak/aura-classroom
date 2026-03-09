import { useRef, useState, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles } from "lucide-react";

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

export default function SkillTreeMap({ groups, onSelectScenario, onOpenSoulCards }: SkillTreeMapProps) {
  const [activeGroupId, setActiveGroupId] = useState(groups[0]?.id ?? "");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToGroup = useCallback((groupId: string) => {
    const el = sectionRefs.current[groupId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveGroupId(groupId);
    }
  }, []);

  // Scroll spy
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      let closest = groups[0]?.id ?? "";
      let closestDist = Infinity;
      for (const g of groups) {
        const el = sectionRefs.current[g.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const dist = Math.abs(rect.top - containerRect.top - 40);
          if (dist < closestDist) {
            closestDist = dist;
            closest = g.id;
          }
        }
      }
      setActiveGroupId(closest);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [groups]);

  return (
    <div className="h-full flex bg-background animate-in fade-in duration-500">
      {/* Fixed Left Nav */}
      <nav className="w-56 shrink-0 border-r border-border bg-card/60 backdrop-blur-sm flex flex-col p-4 gap-2">
        <span className="font-heading text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-2 px-2">
          Core Competencies
        </span>

        {groups.map((g) => (
          <button
            key={g.id}
            onClick={() => scrollToGroup(g.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 text-sm font-medium ${
              activeGroupId === g.id
                ? "bg-primary/10 text-primary font-bold shadow-sm"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            }`}
          >
            <span className="text-lg">{g.icon}</span>
            <span className="truncate">{g.label}</span>
          </button>
        ))}

        <div className="border-t border-border my-3" />

        {/* Soul Cards Entry */}
        <button
          onClick={onOpenSoulCards}
          className="flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-300 text-sm font-bold text-primary hover:bg-primary/10 group relative overflow-hidden"
        >
          <span className="text-lg relative">
            🃏
            <Sparkles className="w-3 h-3 text-accent absolute -top-1 -right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </span>
          <span>心靈牌卡</span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
        </button>
      </nav>

      {/* Scrollable Content */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-8 py-8">
        <div className="max-w-3xl mx-auto space-y-12">
          {groups.map((group) => (
            <section
              key={group.id}
              ref={(el: HTMLDivElement | null) => { sectionRefs.current[group.id] = el; }}
              className="scroll-mt-8"
            >
              {/* Group Header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm"
                  style={{ background: `hsl(${group.color} / 0.15)` }}
                >
                  {group.icon}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground">{group.label}</h3>
                  <p className="text-xs text-muted-foreground">{group.description}</p>
                </div>
              </div>

              {/* Connector + Scenario Nodes */}
              <div className="relative ml-5 pl-6 border-l-2 border-border/60 space-y-3">
                {group.scenarios.map((scenario, idx) => (
                  <div key={scenario.id} className="relative group">
                    {/* Connector dot */}
                    <div
                      className="absolute -left-[31px] top-4 w-3 h-3 rounded-full border-2 border-border bg-card group-hover:border-primary group-hover:bg-primary/20 transition-all"
                    />

                    {/* Scenario Node Card */}
                    <button
                      onClick={() => onSelectScenario(scenario.id)}
                      className="w-full text-left p-4 rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm hover:border-primary/40 hover:shadow-md hover:scale-[1.01] transition-all duration-200 flex items-center gap-4"
                    >
                      <span className="text-2xl shrink-0">{scenario.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground truncate">
                          {scenario.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                          {scenario.description}
                        </p>
                      </div>
                      <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full border border-border bg-muted text-muted-foreground">
                        {scenario.tag}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
