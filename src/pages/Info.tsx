import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import AppLayout from "@/components/AppLayout";
import { Activity } from "lucide-react";

export default function Info() {
  const [user, setUser] = useState({
    name: "王老師",
    email: "teacher@school.edu.tw",
    avatar: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);

  const handleSave = () => {
    setUser({ ...user, name: editName, email: editEmail });
    setIsEditing(false);
    toast({ title: "儲存成功", description: "您的個人資料已更新" });
  };

  const handleCancel = () => {
    setEditName(user.name);
    setEditEmail(user.email);
    setIsEditing(false);
  };

  return (
    <AppLayout>
      <div className="p-8 md:p-10 md:px-14 flex flex-col gap-8 min-h-full">
        {/* Header */}
        <div className="pl-12 md:pl-0">
          <span className="font-heading text-[11px] font-semibold tracking-widest text-muted-foreground">
            SETTINGS
          </span>
          <h1 className="font-heading text-[28px] font-bold text-foreground mt-1">
            個人資料
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Stats */}
          <div className="bg-white border border-[#E5E2D9] shadow-sm p-8 flex flex-col items-center justify-center text-center gap-2">
            <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center text-primary mb-2">
              <Activity className="w-7 h-7" />
            </div>
            <p className="text-sm text-muted-foreground font-medium">累積練習次數</p>
            <p className="font-heading text-5xl font-extrabold text-foreground tracking-tight">8</p>
            <p className="text-xs text-primary font-heading font-semibold mt-1">持續成長中！</p>
          </div>

          {/* Profile */}
          <div className="md:col-span-2 bg-white border border-[#E5E2D9] shadow-sm">
            <div className="px-6 py-4 border-b border-[#E5E2D9]">
              <h2 className="font-heading text-base font-semibold text-foreground">帳號資訊</h2>
            </div>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-28 w-28 border-4 border-background shadow-md">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-3xl font-heading font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {!isEditing && (
                    <button className="text-xs text-muted-foreground border border-[#E5E2D9] px-4 py-1.5 hover:bg-muted/30 transition-colors">
                      更換頭像
                    </button>
                  )}
                </div>

                <div className="flex-1 w-full">
                  {isEditing ? (
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-heading font-semibold text-sm">顯示名稱</Label>
                        <Input id="name" value={editName} onChange={(e) => setEditName(e.target.value)} className="bg-[#FAF9F6]" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-heading font-semibold text-sm">電子郵件</Label>
                        <Input id="email" type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="bg-[#FAF9F6]" />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button onClick={handleCancel} className="flex-1 py-2.5 border border-[#E5E2D9] font-heading text-sm font-semibold text-foreground hover:bg-muted/30 transition-colors">
                          取消
                        </button>
                        <button onClick={handleSave} className="flex-1 py-2.5 bg-primary font-heading text-sm font-semibold text-white hover:opacity-90 transition-opacity">
                          儲存變更
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <Label className="font-heading text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">顯示名稱</Label>
                        <p className="mt-1 text-lg font-medium text-foreground">{user.name}</p>
                      </div>
                      <div>
                        <Label className="font-heading text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">電子郵件</Label>
                        <p className="mt-1 text-lg font-medium text-foreground">{user.email}</p>
                      </div>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="mt-2 px-6 py-2.5 bg-secondary font-heading text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                      >
                        編輯資料
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
