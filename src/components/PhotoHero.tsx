import Image from "next/image";

export function PhotoHero({
  title,
  description,
  image,
  alt,
  kicker,
}: {
  title: string;
  description: string;
  image: string;
  alt: string;
  kicker?: string;
}) {
  return (
    <header className="relative min-h-[52vh] overflow-hidden bg-navy text-white md:min-h-[58vh]">
      <Image
        src={image}
        alt={alt}
        fill
        priority
        className="object-cover grayscale"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-navy/60" />
      <div className="relative mx-auto flex min-h-[52vh] max-w-6xl flex-col justify-end px-4 py-14 md:min-h-[58vh] md:py-20">
        {kicker ? (
          <p className="text-xs uppercase tracking-[0.28em] text-white/80">
            {kicker}
          </p>
        ) : null}
        <h1 className="mt-4 max-w-4xl text-3xl font-medium uppercase tracking-[0.08em] break-words md:text-5xl md:leading-tight md:tracking-[0.14em]">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90">
          {description}
        </p>
      </div>
    </header>
  );
}
