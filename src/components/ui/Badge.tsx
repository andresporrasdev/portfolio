import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "teal" | "coral" | "gold" | "outline";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        {
          "bg-accent/10 text-accent": variant === "default",
          "bg-accent text-white": variant === "accent",
          "bg-accent-teal/10 text-accent-teal": variant === "teal",
          "bg-accent-coral/10 text-accent-coral": variant === "coral",
          "bg-accent-gold/10 text-accent-gold": variant === "gold",
          "border border-border text-muted": variant === "outline",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
