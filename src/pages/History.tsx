import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Search, Calendar, ChevronDown, ChevronRight } from "lucide-react";

const historyItems = [
  { id: 1, date: "03/01", weekday: "週六", emoji: "😤", title: "國中生拒絕交作業", duration: "15:42", rounds: 12, grade: "A+" },
  { id: 2, date: "02/27", weekday: "週四", emoji: "🥺", title: "考場失利後的自責", duration: "12:08", rounds: 9, grade: "A" },
  { id: 3, date: "02/25", weekday: "週二", emoji: "👥", title: "分組被落單的窘迫", duration: "18:30", rounds: 14, grade: "B+" },
  { id: 4, date: "02/20", weekday: "週四", emoji: "🤝", title: "好朋友吵架的糾結", duration: "10:15", rounds: 8, grade: "A+" },
  { id: 5, date: "02/15", weekday: "週六", emoji: "🌱", title: "面對新環境的焦慮", duration: "14:22", rounds: 11, grade: "B" },
];

const gradeColor = (grade: string) => {
  if (grade.startsWith("A")) return "bg-[#81B29A15] text-[#81B29A]";
  return "bg-[#F2CC8F20] text-[#B8A06A]";
};

export default function History() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = historyItems.filter(
    (item) => item.title.includes(searchQuery) || item.date.includes(searchQuery)
  );

  return (
    <AppLayout>
      <div className="p-8 md:p-10 md:px-14 flex flex-col gap-8 min-h-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pl-12 md:pl-0">
          <div>
            <span className="font-heading text-[11px] font-semibold tracking-widest text-primary">
              PRACTICE HISTORY
            </span>
            <h1 className="font-heading text-[28px] font-bold text-foreground mt-1">
              練習歷史紀錄
            </h1>
          </div>
          <div className="flex items-center gap-2 h-10 px-3.5 border border-[#E5E2D9] bg-white rounded-sm w-full md:w-[280px]">
            <Search className="w-4 h-4 text-[#A09C94] shrink-0" />
            <input
              type="text"
              placeholder="搜尋情境或關鍵字..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-[13px] bg-transparent outline-none placeholder:text-[#A09C94]"
            />
          </div>
        </div>

        {/* Filter row */}
        <div className="flex items-center gap-3 flex-wrap">
          <button className="flex items-center gap-1.5 px-3.5 py-2 border border-[#E5E2D9] text-muted-foreground hover:bg-white transition-colors rounded-sm">
            <Calendar className="w-3.5 h-3.5" />
            <span className="font-heading text-xs font-semibold">最近 30 天</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-2 border border-[#E5E2D9] text-muted-foreground hover:bg-white transition-colors rounded-sm">
            <span className="font-heading text-xs font-semibold">所有情緒類型</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <div className="flex-1" />
          <span className="text-[13px] text-[#A09C94]">共 {filtered.length} 筆紀錄</span>
        </div>

        {/* History list */}
        <div className="flex flex-col gap-3">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate("/feedback")}
              className="flex items-center gap-5 px-6 py-4 bg-white border border-[#E5E2D9] shadow-sm hover:shadow-md transition-shadow text-left w-full"
            >
              {/* Date */}
              <div className="w-16 shrink-0">
                <div className="font-heading text-sm font-semibold text-foreground">{item.date}</div>
                <div className="text-xs text-[#A09C94]">{item.weekday}</div>
              </div>

              {/* Emoji */}
              <span className="text-3xl shrink-0">{item.emoji}</span>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="font-heading text-[15px] font-semibold text-foreground truncate">{item.title}</div>
                <div className="text-xs text-[#A09C94] mt-0.5">
                  練習時長 {item.duration} · 回合數 {item.rounds}
                </div>
              </div>

              {/* Score badge */}
              <div className={`px-2.5 py-1 font-heading text-[13px] font-bold rounded-sm shrink-0 ${gradeColor(item.grade)}`}>
                {item.grade}
              </div>

              {/* Arrow */}
              <ChevronRight className="w-[18px] h-[18px] text-[#A09C94] shrink-0" />
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="py-16 text-center text-muted-foreground flex flex-col items-center gap-2">
              <Search className="h-8 w-8 opacity-20" />
              <p>找不到符合的練習紀錄</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
