// components/header/TopHeader.tsx (server component)
import Link from "next/link";
import BackForwardButtons from "./bac-forward-btn";
import MobileNav from "./mobile-nav";
import AuthIcon from "./auth-action";
import Logo from "../ui/logo";

export default async function TopHeader() {
  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur border-b border-neutral-200">
      <div className="mx-auto flex h-12 items-center justify-between px-4">
        {/* Left: Back/Forward + (sm) Mobile Menu Trigger */}
        <div className="flex items-center gap-1">
          <BackForwardButtons />
          {/* Mobile Menu trigger lives inside MobileNav (client) */}
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>


        {/* Right: Auth icon (server-rendered link) */}
        <AuthIcon />
      </div>
    </header>
  );
}
