// components/nav/SidebarNav.client.tsx
"use client";

import { usePathname } from "next/navigation";
import type { NavItem } from "./items";
import SidebarItem from "./sidebar-item";

export default function SidebarNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname() || "/";
  return (
    <nav className="px-2 py-1">
      <ul className="">
        {items.map((it) => (
          <SidebarItem key={it.href} href={it.href} label={it.label} icon={it.icon} active={pathname === it.href} />
        ))}
      </ul>
    </nav>
  );
}
