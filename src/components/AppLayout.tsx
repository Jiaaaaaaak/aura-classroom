import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden md:block shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile hamburger + sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <div className="md:hidden fixed top-0 left-0 z-40 p-3">
          <SheetTrigger asChild>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1E1D1B] text-white shadow-md">
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
        </div>
        <SheetContent side="left" className="p-0 w-[260px] bg-[#1E1D1B] border-none">
          <Sidebar onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
