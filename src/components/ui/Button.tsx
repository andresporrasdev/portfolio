import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  disabled,
  external,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200",
    {
      "bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/25":
        variant === "primary",
      "border border-border bg-card text-foreground hover:bg-accent/10":
        variant === "secondary",
      "text-muted hover:text-foreground hover:bg-card": variant === "ghost",
      "px-4 py-2 text-sm": size === "sm",
      "px-6 py-3 text-sm": size === "md",
      "px-8 py-4 text-base": size === "lg",
      "opacity-50 cursor-not-allowed": disabled,
    },
    className
  );

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
