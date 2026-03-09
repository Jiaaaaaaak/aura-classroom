import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface OverviewScenario {
  id: number;
  emoji: string;
  title: string;
  description: string;
  category: string;
  difficulty: "初階" | "中階" | "進階";
  estimatedMinutes: number;
  practiceCount: number;
  tags: string[];
}

const MOCK_SCENARIOS: OverviewScenario[] = [
  {
    id: 101, emoji: "😤", title: "學生上課滑手機被抓到", description: "學生在課堂上偷滑手機，被老師發現後態度不佳，需要引導學生理解課堂規範的重要性。",
    category: "自我管理", difficulty: "初階", estimatedMinutes: 8, practiceCount: 342, tags: ["課堂管理", "規範建立"],
  },
  {
    id: 102, emoji: "😢", title: "學生因霸凌問題求助", description: "學生鼓起勇氣向老師反映被同學排擠的情況，情緒低落且缺乏自信，需要老師的同理與支持。",
    category: "社會覺察", difficulty: "進階", estimatedMinutes: 15, practiceCount: 218, tags: ["霸凌", "同理心", "情緒支持"],
  },
  {
    id: 103, emoji: "💢", title: "家長質疑老師的教學方式", description: "家長對孩子的成績不滿，認為是老師教學方法有問題，語氣強硬地要求解釋。",
    category: "人際技巧", difficulty: "進階", estimatedMinutes: 12, practiceCount: 189, tags: ["親師溝通", "衝突處理"],
  },
  {
    id: 104, emoji: "😶", title: "沉默寡言的學生不願參與討論", description: "班上有位同學總是安靜不語，分組討論時完全不參與，其他同學開始抱怨。",
    category: "自我覺察", difficulty: "中階", estimatedMinutes: 10, practiceCount: 275, tags: ["課堂參與", "內向學生"],
  },
  {
    id: 105, emoji: "🤥", title: "學生說謊被揭穿", description: "學生聲稱作業被弟弟撕毀，但老師發現根本沒有寫。學生被揭穿後情緒激動。",
    category: "自我管理", difficulty: "中階", estimatedMinutes: 10, practiceCount: 156, tags: ["誠實", "信任建立"],
  },
  {
    id: 106, emoji: "😰", title: "考試焦慮的優等生", description: "成績一向優異的學生近期因考試壓力過大而出現身體不適症狀，向老師傾訴。",
    category: "自我覺察", difficulty: "中階", estimatedMinutes: 12, practiceCount: 301, tags: ["壓力管理", "情緒調節"],
  },
  {
    id: 107, emoji: "🤬", title: "學生在課堂上公開頂嘴", description: "學生當著全班的面挑戰老師的權威，語氣不敬且帶有攻擊性。",
    category: "人際技巧", difficulty: "進階", estimatedMinutes: 10, practiceCount: 412, tags: ["衝突管理", "情緒控制"],
  },
  {
    id: 108, emoji: "💔", title: "學生父母離婚情緒低落", description: "學生近日得知父母即將離婚，上課恍神、成績下滑，下課獨自發呆。",
    category: "社會覺察", difficulty: "進階", estimatedMinutes: 15, practiceCount: 134, tags: ["家庭議題", "情緒陪伴"],
  },
  {
    id: 109, emoji: "📱", title: "學生沉迷社群媒體", description: "學生整天掛在社群平台上，影響課業與人際關係，但學生認為這是正常社交。",
    category: "負責決策", difficulty: "中階", estimatedMinutes: 10, practiceCount: 267, tags: ["數位素養", "時間管理"],
  },
  {
    id: 110, emoji: "🏃", title: "學生想放棄升學", description: "高三學生突然表示不想考大學了，想直接去打工，家長非常焦急。",
    category: "負責決策", difficulty: "進階", estimatedMinutes: 12, practiceCount: 198, tags: ["生涯規劃", "價值觀"],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "自我覺察": "hsl(12, 69%, 63%)",
  "自我管理": "hsl(150, 25%, 55%)",
  "負責決策": "hsl(43, 74%, 70%)",
  "人際技巧": "hsl(200, 40%, 65%)",
  "社會覺察": "hsl(340, 40%, 65%)",
};

const DIFFICULTY_STYLES: Record<string, string> = {
  "初階": "bg-green-100 text-green-700",
  "中階": "bg-amber-100 text-amber-700",
  "進階": "bg-red-100 text-red-700",
};

interface ScenarioOverviewProps {
  onSelectScenario: (id: number) => void;
}

export default function ScenarioOverview({ onSelectScenario }: ScenarioOverviewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeDifficulty, setActiveDifficulty] = useState<string | null>(null);

  const categories = Object.keys(CATEGORY_COLORS);
  const difficulties = ["初階", "中階", "進階"];

  const filtered = MOCK_SCENARIOS.filter((s) => {
    if (activeCategory && s.category !== activeCategory) return false;
    if (activeDifficulty && s.difficulty !== activeDifficulty) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return s.title.includes(q) || s.description.includes(q) || s.tags.some((t) => t.includes(q));
    }
    return true;
  });

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Toolbar */}
      <div className="shrink-0 px-6 pt-5 pb-3 flex flex-col gap-3">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="搜尋情境名稱、描述或標籤..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-sm rounded-xl border-border/60"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all duration-200 ${
                  activeCategory === cat
                    ? "text-card shadow-sm"
                    : "border border-border text-muted-foreground hover:bg-muted"
                }`}
                style={activeCategory === cat ? { backgroundColor: CATEGORY_COLORS[cat] } : undefined}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="w-px h-5 bg-border" />
          <div className="flex items-center gap-1.5">
            {difficulties.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDifficulty(activeDifficulty === d ? null : d)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all duration-200 ${
                  activeDifficulty === d
                    ? `${DIFFICULTY_STYLES[d]} shadow-sm`
                    : "border border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <span className="text-[11px] text-muted-foreground ml-auto">
            共 {filtered.length} 個情境
          </span>
        </div>
      </div>

      {/* Scenario list */}
      <ScrollArea className="flex-1 px-6 pb-6">
        <div className="flex flex-col gap-3 pt-1">
          {filtered.map((scenario, idx) => {
            const catColor = CATEGORY_COLORS[scenario.category] ?? "hsl(0,0%,60%)";
            return (
              <button
                key={scenario.id}
                onClick={() => onSelectScenario(scenario.id)}
                className="group w-full text-left rounded-2xl border-2 border-border/40 bg-card shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 p-4 flex items-start gap-4 cursor-pointer"
                style={{
                  animation: `listFadeIn 0.35s ease-out ${idx * 0.04}s both`,
                }}
              >
                {/* Emoji */}
                <div
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${catColor}15` }}
                >
                  {scenario.emoji}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading text-sm font-bold text-foreground truncate">
                      {scenario.title}
                    </h4>
                    <span
                      className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full font-bold ${DIFFICULTY_STYLES[scenario.difficulty]}`}
                    >
                      {scenario.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {scenario.description}
                  </p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: `${catColor}15`, color: catColor }}
                    >
                      {scenario.category}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      約 {scenario.estimatedMinutes} 分鐘
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Users className="w-3 h-3" />
                      {scenario.practiceCount} 人練習
                    </div>
                    {scenario.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[9px] px-1.5 py-0 h-4 font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight className="shrink-0 w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all mt-1" />
              </button>
            );
          })}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
              <Search className="w-8 h-8 opacity-40" />
              <p className="text-sm font-medium">找不到符合條件的情境</p>
              <p className="text-xs">請調整搜尋或篩選條件</p>
            </div>
          )}
        </div>
      </ScrollArea>

      <style>{`
        @keyframes listFadeIn {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
