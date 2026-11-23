import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  tag?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  className = "",
  tag,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      {tag && (
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-[#84150e] bg-red-50 border border-red-100 uppercase tracking-wider mb-2">
          {tag}
        </span>
      )}
      <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#84150e] uppercase tracking-wide leading-tight">
        {title}
      </h2>
      <div
        className={cn(
          "w-16 h-1 bg-[#84150e] rounded-full my-3.5",
          centered && "mx-auto"
        )}
      />
      {subtitle && (
        <p className="text-neutral-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
