import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
}

export function Layout({ children, fullWidth = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main
        className={`flex-1 flex flex-col ${fullWidth ? "" : "container mx-auto px-4 py-6"}`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
