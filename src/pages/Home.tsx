import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Search, Bell, Heart, Activity, Users, MessageCircle, ShieldCheck } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const user = { name: "王老師" };

  return (
    <AppLayout>
      <div className="flex flex-col min-h-full">
        {/* Welcome header */}
        <div className="px-8 md:px-14 pt-10 pb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left */}
            <div className="pl-12 md:pl-0">
              <h1 className="font-heading text-[28px] font-bold text-foreground">
                早安，{user.name} 👋
              </h1>
              <p className="text-base text-muted-foreground mt-1">
                今天想練習哪個情境呢？
              </p>
            </div>
            {/* Right */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 h-10 px-3.5 border border-[#E5E2D9] bg-white rounded-sm">
                <Search className="w-4 h-4 text-[#A09C94]" />
                <input
                  type="text"
                  placeholder="搜尋情境或資源..."
                  className="text-[13px] bg-transparent outline-none placeholder:text-[#A09C94] w-44"
                />
              </div>
              <div className="relative w-10 h-10 border border-[#E5E2D9] bg-white flex items-center justify-center rounded-sm cursor-pointer hover:bg-muted/30 transition-colors">
                <Bell className="w-[18px] h-[18px] text-foreground" />
                <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Hero card */}
        <div className="px-8 md:px-14 pb-12">
          <div className="bg-[#3D3831] p-10 md:p-14 flex flex-col gap-6">
            <span className="font-heading text-[11px] font-semibold tracking-widest text-primary">
              PLATFORM VISION
            </span>
            <h2 className="font-heading text-2xl md:text-[32px] font-bold text-[#FAF9F6] leading-tight">
              在安心的空間裡，練習溫柔而堅定的對話
            </h2>
            <p className="text-base text-[#A09C94] leading-[1.7] max-w-[700px]">
              透過 Satir 薩提爾溝通模式與 SEL 社會情緒學習理論，我們為教師打造一個無壓力的
              AI 對話練習場。在這裡，每一次的嘗試都是成長。
            </p>
            <div className="flex gap-12 pt-4">
              <div className="flex flex-col gap-1">
                <span className="font-heading text-[28px] font-bold text-primary">500+</span>
                <span className="font-heading text-xs font-semibold tracking-widest text-[#A09C94]">練習情境</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-heading text-[28px] font-bold text-secondary">2,400+</span>
                <span className="font-heading text-xs font-semibold tracking-widest text-[#A09C94]">教師使用者</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-heading text-[28px] font-bold text-accent">96%</span>
                <span className="font-heading text-xs font-semibold tracking-widest text-[#A09C94]">正向回饋率</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core concepts */}
        <div className="px-8 md:px-14 pb-12">
          <div className="flex flex-col gap-6">
            <div>
              <span className="font-heading text-[11px] font-semibold tracking-widest text-primary">
                CORE CONCEPTS
              </span>
              <h3 className="font-heading text-xl font-bold text-foreground mt-2">理論基礎</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Satir Model */}
              <div className="bg-white border border-[#E5E2D9] p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/20 flex items-center justify-center rounded-lg">
                    <Activity className="w-5 h-5 text-secondary" />
                  </div>
                  <h4 className="font-heading text-lg font-bold text-foreground">薩提爾冰山理論</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  我們不只看見行為，更看見感受。透過系統的回饋，學習覺察學生行為背後的感受、觀點與渴望，並練習一致性的溝通姿態。
                </p>
              </div>

              {/* SEL */}
              <div className="bg-white border border-[#E5E2D9] p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 flex items-center justify-center rounded-lg">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-heading text-lg font-bold text-foreground">社會情緒學習 (SEL)</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  基於 CASEL 架構，我們陪伴你引導學生發展五大核心能力：自我覺察、自我管理、社會覺察、人際技巧與負責任的決策。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="px-8 md:px-14 pb-12">
          <div className="bg-white border border-[#E5E2D9] p-8 shadow-sm">
            <h3 className="font-heading text-xl font-bold text-foreground text-center mb-8">如何開始？</h3>
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent-foreground" />
                </div>
                <h4 className="font-heading font-semibold text-foreground">1. 選擇情境</h4>
                <p className="text-sm text-muted-foreground">挑選一個你曾在課堂上遇到，或感到棘手的學生情緒事件。</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-heading font-semibold text-foreground">2. 語音模擬互動</h4>
                <p className="text-sm text-muted-foreground">打開麥克風，用平常說話的方式與 AI 虛擬學生對話。</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-secondary" />
                </div>
                <h4 className="font-heading font-semibold text-foreground">3. 獲得專家回饋</h4>
                <p className="text-sm text-muted-foreground">對話結束後，查看量化雷達圖與具體的「換句話說」建議。</p>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={() => navigate("/chatroom")}
                className="font-heading text-sm font-semibold tracking-wider bg-primary text-white px-8 py-3 hover:opacity-90 transition-opacity"
              >
                開始練習
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto px-8 md:px-14 py-6 border-t border-[#E5E2D9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© 2025 SELf-corner. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <span className="cursor-pointer hover:text-foreground transition-colors">使用教學</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">隱私政策</span>
            <span className="cursor-pointer text-primary hover:underline">意見回饋</span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
