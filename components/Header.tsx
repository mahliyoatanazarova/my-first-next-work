import Link from "next/link";
import Avatar from "./Avatar";
import { ME } from "@/lib/me";

<Avatar name={ME.name} id={ME.id} size={34} />

export default function Header() {
  return (
    <header className="header">
      <Link href="/" className="logo">Medium</Link>
      <label className="search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input type="search" placeholder="Search" aria-label="Search" />
      </label>
      <div className="header-right">
        <button className="btn-write" type="button">Write</button>
        <Link href="/profile" aria-label="My profile">
          <Avatar name="Leanne Graham" id={1} size={34} />
        </Link>
      </div>
    </header>
  );
}
