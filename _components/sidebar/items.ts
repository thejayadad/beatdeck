// components/nav/items.ts
import { Home, Search, Library, UploadCloud, ListMusic, Heart } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const MAIN_NAV: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/library", label: "Library", icon: Library },
  { href: "/upload", label: "Upload", icon: UploadCloud },
  { href: "/playlists", label: "Playlists", icon: ListMusic },
  { href: "/likes", label: "Likes", icon: Heart },
];
