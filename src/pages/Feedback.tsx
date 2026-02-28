import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";
import { ArrowRight, Lightbulb, Sparkles, RefreshCw, Share2 } from "lucide-react";
import AppLayout from "@/components/AppLayout";

const radarData = [
  { subject: "自我覺察", value: 92 },
  { subject: "一致性表達", value: 75 },
  { subject: "社會覺察", value: 65 },
  { subject: "同理心連結", value: 80 },
  { subject: "情緒調節", value: 85 },
];

const defaultChatHistory = [
  { role: "assistant", content: "老師辛苦了！這是一場不容易的對話。關於剛剛的分析報告，或是針對小傑的情況，您有任何想進一步討論的嗎？" },
];

const defaultTranscript = [
  { role: "teacher", content: "小傑，我看你剛才收書包的時候動作有點快，臉色也不太好，還跟小明拌了兩句嘴。現在感覺還好嗎？想聊聊剛才發生了什麼事嗎？" },
  { role: "student", content: "沒什麼啦，就是覺得很煩。小明在那邊一直吵，問一些笨問題，我叫他閉嘴他還不理我。我覺得大家今天都在針對我。" },
  { role: "teacher", content: "聽起來你現在覺得很有壓力，甚至覺得有點委屈，對嗎？當你覺得『大家都在針對你』的時候，心裡面是什麼感覺？是生氣、挫折，還是覺得累了？", highlight: true, note: "很好的情緒指認！幫助學生進行自我覺察。" },
  { role: "student", content: "……都有吧。昨晚沒睡好，今天的數學小考我又沒寫完，然後小明又在那邊鬧，我那時候真的覺得快爆炸了，手心都在冒汗。" },
  { role: "teacher", content: "謝謝你跟我分享這些。你能感覺到『手心冒汗』是很棒的覺察，這通常是身體在提醒你：『我快要超載了』。既然現在我們知道情緒是從壓力累積起來的，你覺得剛才對小明大聲吼叫，有讓你心情變好一點，或是解決數學考試的問題嗎？" },
  { role: "student", content: "其實沒有。吼完他之後我反而覺得更煩，因為現在氣氛變得很尷尬，我也有點後悔，但我那時候就是控制不住自己。" },
  { role: "teacher", content: "這種『控制不住』的感覺每個人都會有。我們來試試看，如果下次你又感覺到手心冒汗、心跳加快時，在說話之前，我們可以先做一個什麼動作來給自己 5 秒鐘的緩衝？比如深呼吸，或是喝口水？" },
  { role: "student", content: "嗯……也許我可以先走去飲水機裝水？離開那個位置一下下可能比較好。但我還是不知道該怎麼跟小明說，我不想讓他覺得我很好欺負。" },
  { role: "teacher", content: "這是一個很好的策略！暫時離開現場能讓大腦冷靜下來。至於小明，你覺得如果用『我訊息』來表達會不會比較好？例如：『我現在心情不太好，需要安靜一下，等下再聊』，這樣既表達了你的邊界，又不會傷害到關係。你覺得他聽完會有什麼反應？", highlight: true, note: "引入了『我訊息』，可以再更深入探討學生的『渴望』(被尊重)。" },
  { role: "student", content: "他應該會喔一聲就走開吧，總比我叫他閉嘴好。那我明天去跟他道個歉好了，畢竟剛才我真的太兇了。" },
  { role: "teacher", content: "小傑，我很欣賞你願意承擔責任並修補關係的勇氣。這不容易，但這會讓你的人際關係變得更穩固。今晚回去先早點休息，把睡眠補回來，好嗎？" },
  { role: "student", content: "好，謝謝老師。跟你聊完之後，我覺得心裡沒那麼悶了，明天見。" },
];

export default function Feedback() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");
  const teacherTranscript = defaultTranscript.filter((e) => e.role === "teacher");
  const studentTranscript = defaultTranscript.filter((e) => e.role === "student");

  return (
    <AppLayout>
      <div className="p-8 md:p-10 md:px-14 flex flex-col gap-6 min-h-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pl-12 md:pl-0">
          <div>
            <span className="font-heading text-[11px] font-semibold tracking-widest text-muted-foreground">
              FEEDBACK & ANALYSIS
            </span>
            <h1 className="font-heading text-[28px] font-bold text-foreground mt-1">
              專家回饋與深度分析
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              情境：國中生拒絕交作業 · 2025/03/01
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/chatroom")}
              className="flex items-center gap-2 px-5 py-2.5 border border-[#E5E2D9] font-heading text-xs font-semibold tracking-wider text-foreground hover:bg-white transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              重試一次
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-primary font-heading text-xs font-semibold tracking-wider text-white hover:opacity-90 transition-opacity">
              <Share2 className="w-3.5 h-3.5" />
              分享練習
            </button>
          </div>
        </div>

        {/* Two column layout */}
        <div className="flex flex-col lg:flex-row gap-6 flex-1">
          {/* Left column */}
          <div className="lg:w-[400px] shrink-0 flex flex-col gap-6">
            {/* Radar chart */}
            <div className="bg-white border border-[#E5E2D9] shadow-sm p-6">
              <h2 className="font-heading text-base font-semibold text-foreground mb-4">五力雷達圖</h2>
              <div className="h-[300px] bg-[#F8F7F4] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#706C61", fontSize: 12, fontWeight: 500 }} />
                    <Tooltip contentStyle={{ borderRadius: '4px', border: '1px solid #E5E2D9', boxShadow: '0 4px 12px rgba(61,56,49,0.13)' }} />
                    <Radar name="本次表現" dataKey="value" stroke="#E07A5F" strokeWidth={2} fill="#E07A5F" fillOpacity={0.15} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Expert advice */}
            <div className="bg-white border border-[#E5E2D9] shadow-sm p-6">
              <h2 className="font-heading text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                專家建議
              </h2>
              <ScrollArea className="h-[240px] pr-2">
                <div className="space-y-5">
                  <div className="space-y-2 bg-[#F8F7F4] p-4 border border-[#E5E2D9]">
                    <h3 className="font-heading text-sm font-bold text-foreground">1. 建立「情緒預警系統」</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      老師精準捕捉到了「手心冒汗」。建議進一步引導學生在情緒爆炸前 30 秒就發現問題。
                    </p>
                    <div className="bg-primary/10 p-3 flex items-start gap-2 mt-2">
                      <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-foreground">
                        換句話說：「除了手心冒汗，你的肩膀會緊繃嗎？下次如果肩膀又緊緊的，我們能做什麼？」
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 bg-[#F8F7F4] p-4 border border-[#E5E2D9]">
                    <h3 className="font-heading text-sm font-bold text-foreground">2. 深化薩提爾的「渴望」層次</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      老師提議了「我訊息」，但學生提到「不想讓他覺得我好欺負」，這反映了冰山底層對「被尊重」的渴望。
                    </p>
                    <div className="bg-primary/10 p-3 flex items-start gap-2 mt-2">
                      <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-foreground">
                        換句話說：「聽起來你很在意他是否尊重你。我們怎麼表達『我需要安靜』，同時也能展現你的力量？」
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Right column */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            {/* Transcript */}
            <div className="bg-white border border-[#E5E2D9] shadow-sm flex flex-col flex-1 min-h-[400px] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E2D9]">
                <h2 className="font-heading text-base font-semibold text-foreground">對話逐字稿回顧</h2>
                <Tabs defaultValue="combined" className="w-[160px]">
                  <TabsList className="grid w-full grid-cols-2 h-8">
                    <TabsTrigger value="combined" className="text-xs">完整</TabsTrigger>
                    <TabsTrigger value="separate" className="text-xs">對照</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <ScrollArea className="flex-1 px-6 py-4">
                <Tabs defaultValue="combined" className="w-full">
                  <TabsContent value="combined" className="m-0 space-y-4">
                    {defaultTranscript.map((entry, index) => (
                      <div key={index} className={`flex flex-col ${entry.role === "teacher" ? "items-end" : "items-start"}`}>
                        <div
                          className={`max-w-[75%] px-4 py-3 ${
                            entry.role === "teacher"
                              ? "bg-primary text-white rounded-2xl rounded-br-sm"
                              : "bg-[#81B29A20] text-foreground rounded-2xl rounded-bl-sm"
                          } ${entry.highlight ? 'ring-2 ring-accent ring-offset-2 ring-offset-white' : ''}`}
                        >
                          <p className="text-[10px] font-bold mb-1 uppercase tracking-wider opacity-70">
                            {entry.role === "teacher" ? "老師" : "學生"}
                          </p>
                          <p className="text-sm leading-relaxed">{entry.content}</p>
                        </div>
                        {entry.highlight && entry.note && (
                          <div className="mt-2 max-w-[75%] bg-accent/20 text-accent-foreground text-xs px-3 py-1.5 font-medium border border-accent/30 flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            {entry.note}
                          </div>
                        )}
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="separate" className="m-0">
                    <div className="grid grid-cols-2 gap-4 pb-2 border-b border-[#E5E2D9] sticky top-0 bg-white z-20">
                      <div className="font-heading font-bold text-center text-primary text-sm">老師</div>
                      <div className="font-heading font-bold text-center text-muted-foreground text-sm">學生</div>
                    </div>
                    <div className="pt-4 space-y-4">
                      {Array.from({ length: Math.max(teacherTranscript.length, studentTranscript.length) }).map((_, index) => (
                        <div key={index} className="grid grid-cols-2 gap-4">
                          <div className="flex justify-end">
                            {teacherTranscript[index] && (
                              <div className={`bg-primary text-white rounded-2xl rounded-tr-sm p-3 w-[90%] ${teacherTranscript[index].highlight ? 'ring-2 ring-accent' : ''}`}>
                                <p className="text-sm">{teacherTranscript[index].content}</p>
                              </div>
                            )}
                          </div>
                          <div className="flex justify-start">
                            {studentTranscript[index] && (
                              <div className="bg-[#81B29A20] text-foreground rounded-2xl rounded-tl-sm p-3 w-[90%]">
                                <p className="text-sm">{studentTranscript[index].content}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </ScrollArea>
            </div>

            {/* AI Coach */}
            <div className="bg-white border border-[#E5E2D9] shadow-sm p-6 flex flex-col gap-4">
              <h2 className="font-heading text-base font-semibold text-foreground">與督導對話</h2>
              <div className="space-y-3">
                {defaultChatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-secondary text-white rounded-2xl rounded-br-sm"
                        : "bg-[#F8F7F4] border border-[#E5E2D9] text-foreground rounded-2xl rounded-bl-sm"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
              <Textarea
                placeholder="問問督導：如果學生一直沈默怎麼辦..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="min-h-[70px] resize-none text-sm border-[#E5E2D9] bg-[#FAF9F6]"
              />
              <button className="w-full py-2.5 bg-secondary text-white font-heading text-sm font-semibold tracking-wider hover:opacity-90 transition-opacity">
                傳送訊息
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
