// components/header/BackForwardButtons.tsx (server component)
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";

export default function BackForwardButtons() {
  // Visual only (no client hooks) — you can wire real history later.
  return (
    <div className="hidden md:flex items-center">
      <button
        className="rounded-full p-1 hover:bg-neutral-100"
        aria-label="Back (not wired)"
      >
        <ChevronLeftCircle className="h-6 w-6 text-neutral-700" />
      </button>
      <button
        className="rounded-full p-1 hover:bg-neutral-100"
        aria-label="Forward (not wired)"
      >
        <ChevronRightCircle className="h-6 w-6 text-neutral-700" />
      </button>
    </div>
  );
}
