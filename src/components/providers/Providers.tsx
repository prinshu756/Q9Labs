"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
      <CartSidebar />
      <LoadingScreen />
      <Toaster
        position="bottom-right"
        gutter={12}
        containerClassName="!bottom-6 !right-6"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "16px",
            padding: "16px 20px",
            fontSize: "14px",
            fontWeight: 500,
            background: "var(--card)",
            color: "var(--fg)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          },
          success: {
            iconTheme: {
              primary: "var(--fg)",
              secondary: "var(--accent)",
            },
          },
          error: {
            iconTheme: {
              primary: "var(--fg)",
              secondary: "var(--accent)",
            },
          },
        }}
      />
    </ThemeProvider>
  );
}
