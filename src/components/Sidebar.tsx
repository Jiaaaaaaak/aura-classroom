import { useNavigate, useLocation } from "react-router-dom";
import {
  House,
  MessageCircle,
  Radar,
  Clock3,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "首頁 Home", icon: House, path: "/home" },
  { label: "對話練習", icon: MessageCircle, path: "/chatroom" },
  { label: "能力雷達", icon: Radar, path: "/feedback" },
  { label: "歷史紀錄", icon: Clock3, path: "/history" },
  { label: "設定", icon: Settings, path: "/info" },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const user = {
    name: "王老師",
    email: "teacher@school.edu.tw",
    initial: "T",
  };

  const handleNav = (path: string) => {
    navigate(path);
    onNavigate?.();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col h-full w-[260px] bg-[#1E1D1B] text-[#FAF9F6] py-8 px-6">
      {/* Brand */}
      <div className="flex items-center gap-2.5 mb-12">
        <div className="w-7 h-7 bg-primary rounded-sm shrink-0" />
        <span className="font-heading text-base font-bold tracking-wider">
          SELf-corner
        </span>
      </div>

      {/* Menu label */}
      <span className="font-heading text-[11px] font-semibold tracking-widest text-[#706C61] mb-3">
        MENU
      </span>

      {/* Nav items */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`flex items-center gap-3 px-3 py-2.5 text-[13px] font-heading font-medium transition-colors rounded-sm ${
                active
                  ? "bg-[#E07A5F15] text-primary border-l-4 border-primary -ml-px"
                  : "text-[#A09C94] hover:text-[#FAF9F6] hover:bg-white/5"
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Logout */}
      <button
        onClick={() => handleNav("/login")}
        className="flex items-center gap-3 px-3 py-2.5 text-[13px] font-heading font-medium text-[#A09C94] hover:text-[#FAF9F6] hover:bg-white/5 transition-colors rounded-sm mb-4"
      >
        <LogOut className="w-5 h-5 shrink-0" />
        登出
      </button>

      {/* User area */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
          <span className="font-heading text-sm font-bold text-white">
            {user.initial}
          </span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-heading text-[13px] font-semibold truncate">
            {user.name}
          </span>
          <span className="text-[11px] text-[#706C61] truncate">
            {user.email}
          </span>
        </div>
      </div>
    </div>
  );
}
