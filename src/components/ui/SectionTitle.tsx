interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="mb-12 flex items-center gap-4">
      <div className="h-px bg-gradient-to-r from-transparent to-luminous-cyan flex-1" />
      <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight whitespace-nowrap">
        {title}
      </h2>
      <div className="h-px bg-gradient-to-l from-transparent to-luminous-fuchsia flex-1" />
    </div>
  );
}
