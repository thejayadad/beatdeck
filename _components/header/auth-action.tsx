// components/header/AuthIcon.tsx (server component)
import Link from "next/link";
import { UserRound } from "lucide-react";

export default function AuthIcon() {
  // Later: detect session server-side and swap to avatar.
  return (
    <div
      className="inline-flex items-center justify-center rounded-full border border-neutral-200 p-1.5 hover:bg-neutral-100"
      aria-label="Sign in"
      title="Sign in"
    >
      <div className="relative">
        <UserRound className="h-5 w-5 text-neutral-700" />
        {/* Accent status dot for style */}
        <span className="absolute -right-0.5 -top-0.5 inline-block h-2 w-2 rounded-full bg-purple-500 ring-2 ring-white" />
      </div>
    </div>
  );
}
