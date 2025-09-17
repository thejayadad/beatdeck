
// components/nav/MobileNav.client.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Menu, LogIn } from "lucide-react";

import { usePathname } from "next/navigation";
import { MAIN_NAV } from "../sidebar/items";
import SidebarItem from "../sidebar/sidebar-item";
import Logo from "../ui/logo";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";

  // Prevent background scroll when open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [open]);

  return (
    <>
      {/* Trigger button (hamburger) */}
      <button
        className="inline-flex items-center justify-center rounded-lg border  border-neutral-200 p-2 hover:bg-neutral-100"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5 text-neutral-700" />
      </button>

      {/* Overlay */}
      <div
        className={[
          "fixed inset-0 z-10 bg-black/30 transition-opacity",
          open ? "opacity-100 pointer-events-auto h-[900px]" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-100 w-72 max-w-[85vw]",
          "border-r border-neutral-200 bg-white",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0 h-[700px]" : "-translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Header row inside drawer */}
        <div className="flex items-center justify-between px-3 py-3 border-t  bg-white">
        <Logo />
          <button
            className="rounded-lg p-2 hover:bg-neutral-100 border border-neutral-200"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav items (reuse your SidebarItem look & feel) */}
        <nav className="px-2 py-2 bg-white border-t border-neutral-200">
          <ul className="space-y-1">
            {MAIN_NAV.map((it) => (
              <SidebarItem
                key={it.href}
                href={it.href}
                label={it.label}
                icon={it.icon}
                active={pathname === it.href}
              />
            ))}
          </ul>
        </nav>

     
      </aside>
    </>
  );
}
