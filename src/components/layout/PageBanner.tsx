import Image from "next/image";

export default function PageBanner({
  title,
  subtitle,
  imageSrc,
  imagePosition = "object-[center_35%]",
}: {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imagePosition?: string;
}) {
  return (
    <div className="relative w-full h-[55vh] min-h-[400px] flex items-center justify-center">
      <Image
        src={imageSrc}
        alt={title}
        fill
        className={`object-cover ${imagePosition}`}
        quality={90}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/50 to-slate-900/85" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(148,205,255,0.08)_0%,transparent_60%)]" />

      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center mt-12 md:mt-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-4 animate-fade-up">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light animate-fade-up drop-shadow-lg" style={{ animationDelay: "100ms", animationFillMode: "both" }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
