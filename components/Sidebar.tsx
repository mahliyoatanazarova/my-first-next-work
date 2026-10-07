"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, type ReactNode } from "react";

type IconName = "home" | "profile" | "following";

interface NavItem {
  href: string;
  label: string;
  icon: IconName;
  active: boolean;
}

const icons: Record<IconName, ReactNode> = {
  home: <path d="M3 11 12 3l9 8v10h-6v-6H9v6H3z" />,
  profile: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </>
  ),
  following: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2 20c0-3.5 3-5.5 7-5.5s7 2 7 5.5M18 8v6M15 11h6" />
    </>
  ),
};

function Nav() {
  const path = usePathname();
  const tab = useSearchParams().get("tab");

  const items: NavItem[] = [
    { href: "/", label: "Home", icon: "home", active: path === "/" && tab !== "following" },
    { href: "/profile", label: "Profile", icon: "profile", active: path.startsWith("/profile") },
    { href: "/?tab=following", label: "Following", icon: "following", active: path === "/" && tab === "following" },
  ];

  return (
    <nav className="sidebar-nav">
      {items.map((i) => (
        <Link key={i.label} href={i.href} className={i.active ? "nav-item active" : "nav-item"}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
            {icons[i.icon]}
          </svg>
          {i.label}
        </Link>
      ))}
    </nav>
  );
}

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Suspense fallback={null}>
        <Nav />
      </Suspense>
    </aside>
  );
}
