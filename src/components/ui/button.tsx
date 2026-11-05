import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva("inline-flex shrink-0 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:opacity-50", {
  variants: {
    variant: {
      default: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
      mustard: "bg-logo-yellow text-primary-foreground hover:bg-logo-yellow/90",
      secondary: "bg-muted text-foreground hover:bg-muted/80",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-border bg-background text-foreground hover:bg-muted",
      ghost: "text-foreground hover:bg-muted",
      link: "text-secondary underline-offset-4 hover:underline",
    },
    size: { default: "min-h-11 px-5 py-3", sm: "h-9 px-3", lg: "min-h-12 px-7 py-3", icon: "h-10 w-10", "icon-sm": "h-8 w-8", "icon-lg": "h-12 w-12" },
  },
  defaultVariants: { variant: "default", size: "default" },
});

export type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ asChild = false, variant = "default", size = "default", className, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}