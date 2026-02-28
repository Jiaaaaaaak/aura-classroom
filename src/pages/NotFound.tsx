import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="font-heading text-[36px] font-bold text-foreground">404</h1>
        <p className="text-base text-muted-foreground">找不到這個頁面</p>
        <a
          href="/home"
          className="inline-block text-sm text-primary font-heading font-semibold hover:underline"
        >
          回到首頁
        </a>
      </div>
    </div>
  );
}
