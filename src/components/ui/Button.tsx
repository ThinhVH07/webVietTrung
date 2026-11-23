import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

const variants = {
  primary:
    "bg-[#84150e] text-white hover:bg-[#6b0f0a] shadow-md shadow-red-900/20 hover:shadow-lg hover:shadow-red-900/30",
  secondary:
    "bg-white text-[#84150e] hover:bg-neutral-50 border border-neutral-200 shadow-sm hover:border-[#84150e]/30",
  outline:
    "border-2 border-[#84150e] text-[#84150e] hover:bg-[#84150e] hover:text-white transition-all",
  ghost:
    "text-[#84150e] hover:bg-red-50",
  gold:
    "bg-amber-500 text-white hover:bg-amber-600 shadow-md shadow-amber-500/25",
};

const sizes = {
  sm: "px-4 py-1.5 text-xs font-semibold",
  md: "px-6 py-2.5 text-sm font-bold",
  lg: "px-8 py-3 text-base font-bold",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300 cursor-pointer text-center",
    variants[variant],
    sizes[size],
    disabled ? "opacity-50 cursor-not-allowed" : "",
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </button>
  );
}
