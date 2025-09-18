// @/_components/auth/IconPendingButton.tsx
"use client";

import * as React from "react";
import { useFormStatus } from "react-dom";
import { Loader2, LogIn, LogOut, UserRound, UploadCloud } from "lucide-react";
import { cn } from "@/lib/helpers/cn";

type Variant = "neutral" | "ghost" | "primary";
type Size = "sm" | "md";

// Only plain data crosses the boundary:
export type IconName = "log-in" | "log-out" | "user" | "upload";

const ICON_MAP: Record<IconName, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  "log-in": LogIn,
  "log-out": LogOut,
  "user": UserRound,
  "upload": UploadCloud,
};

export interface IconPendingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel: string;
  icon: IconName;        // <-- string key, not a component
  label?: string;        // optional text for sm+ screens
  variant?: Variant;
  size?: Size;
}

export default function IconPendingButton({
  ariaLabel,
  icon,
  label,
  className,
  variant = "neutral",
  size = "sm",
  disabled,
  ...props
}: IconPendingButtonProps) {
  const { pending } = useFormStatus();
  const Icon = ICON_MAP[icon];

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full border transition " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/50 focus-visible:ring-offset-2 " +
    "disabled:cursor-not-allowed disabled:opacity-60";

  const variants: Record<Variant, string> = {
    neutral: "bg-white border-neutral-200 hover:bg-neutral-100 text-neutral-900",
    ghost: "bg-transparent border-transparent hover:bg-neutral-100 text-neutral-900",
    primary: "bg-neutral-900 border-neutral-900 hover:bg-neutral-800 text-white",
  };

  const sizes: Record<Size, string> = {
    sm: "h-9 px-3",
    md: "h-10 px-4",
  };

  const iconSizeClass = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const iconColorClass = variant === "primary" ? "text-white" : "text-neutral-700";

  return (
    <button
      type="submit"
      aria-label={ariaLabel}
      aria-busy={pending ? "true" : "false"}
      disabled={pending || disabled}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props} // allows formAction, etc.
    >
      {pending ? (
        <Loader2 className={cn("animate-spin", iconSizeClass, iconColorClass)} />
      ) : (
        <Icon className={cn(iconSizeClass, iconColorClass)} />
      )}
      {label ? <span className="truncate">{label}</span> : null}
    </button>
  );
}
