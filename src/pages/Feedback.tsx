import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const radarData = [
  { subject: "清晰度", value: 80 },
  { subject: "互動性", value: 65 },
  { subject: "內容", value: 90 },
  { subject: "節奏", value: 70 },
  { subject: "表達", value: 85 },
];

const defaultChatHistory = [
  { role: "user", content: "老師好，我想了解光合作用的過程。" },
  { role: "assistant", content: "好的！光合作用是植物將光能轉化為化學能的過程。主要發生在葉綠體中，分為光反應和暗反應兩個階段。" },
  { role: "user", content: "光反應是什麼？" },
  { role: "assistant", content: "光反應發生在葉綠體的類囊體膜上，需要光照。水分子被分解，產生氧氣、ATP和NADPH。這些能量載體會用於暗反應。" },
  { role: "user", content: "那暗反應呢？" },
  { role: "assistant", content: "暗反應又稱卡爾文循環，發生在葉綠體基質中，不需要直接光照。利用ATP和NADPH將二氧化碳固定並轉化為葡萄糖。" },
  { role: "user", content: "所以植物晚上也能進行暗反應嗎？" },
  { role: "assistant", content: "理論上可以，但實際上暗反應需要光反應產生的ATP和NADPH，所以主要還是在白天進行。晚上這些能量載體會很快耗盡。" },
  { role: "user", content: "了解了，謝謝老師的解釋！" },
  { role: "assistant", content: "不客氣！你的問題問得很好，能夠循序漸進地理解概念。如果還有其他問題，隨時可以問我。" },
];

const defaultExpertFeedback = `整體表現評估：

您在這次教學互動中展現了良好的教學技巧。以下是詳細的專家分析：

【優點】
• 內容組織清晰，由淺入深循序漸進
• 專業術語解釋準確，並能與生活實例連結
• 回應學生問題時態度親切有耐心

【改進建議】
• 可以多使用圖表或視覺化工具輔助說明
• 在解釋複雜概念時，可以先確認學生的先備知識
• 建議增加更多互動性問題，引導學生主動思考

【互動性評分說明】
互動性得分較低（65分）是因為對話較為單向，建議多提問來確認學生理解程度。

【總結】
整體教學品質優良，持續保持並加強互動性將使教學效果更佳。`;

export default function Feedback() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");

  const handleChatWithExpert = () => {
    console.log("Chat with expert:", userInput);
  };

  return (
    <ScrollArea className="h-screen">
      <div className="min-h-screen bg-background p-6">
        <div className="flex gap-6">
          {/* Left Side - Expert Feedback & Radar Chart */}
          <div className="w-1/2 flex flex-col">
            <h1 className="text-2xl font-semibold mb-4">專家回饋</h1>
            
            {/* Expert Feedback Text */}
            <div className="mb-6">
              <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                {defaultExpertFeedback}
              </p>
            </div>

            {/* Radar Chart */}
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                  />
                  <Radar
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                onClick={() => navigate("/chatroom")}
              >
                重試一次
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/home")}
              >
                回首頁
              </Button>
            </div>
          </div>

          {/* Right Side - Chat History & Input */}
          <div className="w-1/2 flex flex-col gap-4">
            {/* Chat History Display */}
            <div className="flex-1 border rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">對話紀錄</h2>
              <div className="space-y-4">
                {defaultChatHistory.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* User Input Area */}
            <div className="border rounded-lg p-4 space-y-3">
              <Textarea
                placeholder="輸入文字..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              <div className="flex justify-end">
                <Button variant="outline" onClick={handleChatWithExpert}>
                  與專家對話
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}