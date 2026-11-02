import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentProps<"button"> & { asChild?: boolean; variant?: "default" | "outline" | "ghost"; size?: "default" | "icon" };

export function Button({ asChild = false, variant = "default", size = "default", className, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn("inline-flex shrink-0 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:opacity-50", variant === "default" ? "bg-secondary text-secondary-foreground hover:bg-secondary/90" : variant === "outline" ? "border border-border bg-background text-foreground hover:bg-muted" : "text-foreground hover:bg-muted", size === "icon" ? "h-10 w-10" : "min-h-11 px-5 py-3", className)} {...props} />;
}