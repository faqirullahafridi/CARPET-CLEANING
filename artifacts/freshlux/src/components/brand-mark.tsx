import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  size?: "header" | "footer";
}

export function BrandMark({ className, size = "header" }: BrandMarkProps) {
  const isFooter = size === "footer";

  return (
    <div className={cn("inline-flex flex-col", className)}>
      <div
        className={cn(
          "w-10 h-0.5 bg-gradient-to-r from-primary via-accent to-primary/40 mb-3",
          isFooter && "mb-2.5",
        )}
      />
      <div
        className={cn(
          "font-extrabold tracking-tight leading-none",
          isFooter ? "text-2xl md:text-3xl" : "text-2xl sm:text-3xl md:text-4xl",
        )}
      >
        <span className="text-foreground">Carpet </span>
        <span className="bg-gradient-to-r from-primary to-[#ECB65F] bg-clip-text text-transparent">
          Cleaning
        </span>
      </div>
      <p
        className={cn(
          "font-semibold uppercase tracking-[0.22em] text-muted-foreground mt-2",
          isFooter ? "text-[10px]" : "text-[10px] sm:text-xs",
        )}
      >
        UK · Deep Cleaning · Fresh Living
      </p>
    </div>
  );
}
