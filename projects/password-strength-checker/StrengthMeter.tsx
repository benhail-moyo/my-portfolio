import { cn } from "@/lib/utils";

interface StrengthMeterProps {
  score: number;
  label: string;
}

const barColors = [
  "bg-strength-weak",
  "bg-strength-fair",
  "bg-strength-good",
  "bg-strength-good",
  "bg-strength-strong",
];

export function StrengthMeter({ score, label }: StrengthMeterProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs font-mono text-muted-foreground tracking-widest">STRENGTH</span>
        <span className={cn(
          "text-xs font-mono font-bold tracking-widest",
          score === 0 && "text-strength-weak",
          score === 1 && "text-strength-fair",
          score === 2 && "text-strength-good",
          score >= 3 && "text-strength-strong",
        )}>
          {label}
        </span>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-all duration-500",
              i <= score - 1 ? barColors[score] : "bg-secondary"
            )}
          />
        ))}
      </div>
    </div>
  );
}
