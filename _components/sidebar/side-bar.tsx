'use client'
import Link from "next/link";
import Logo from "../ui/logo";
import {Home, Search} from "lucide-react"
import SidebarNav from "./sidebar-nav";
import { MAIN_NAV } from "./items";

export default function SideBar(){
    return (
    <aside className="hidden md:flex md:w-72 md:flex-col shrink-0 border-r border-neutral-200 bg-white/90 backdrop-blur">
        <div className="px-4 py-4">
        <Logo />
      </div>
   {/* Nav */}
      <SidebarNav items={MAIN_NAV} />

      {/* Divider */}
      <div className="my-4 border-t border-neutral-200" />
        </aside>
    )
}