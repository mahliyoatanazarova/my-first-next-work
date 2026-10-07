import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Source_Serif_4, Inter } from "next/font/google";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const ui = Inter({ subsets: ["latin"], variable: "--font-ui", display: "swap" });

export const metadata: Metadata = {
  title: "Medium — write and read",
  description: "Medium clone: Next.js + TypeScript + jsonplaceholder",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uz" className={`${serif.variable} ${ui.variable}`}>
      <body>
        <Header />
        <div className="shell">
          <Sidebar />
          <div className="content">{children}</div>
        </div>
      </body>
    </html>
  );
}
