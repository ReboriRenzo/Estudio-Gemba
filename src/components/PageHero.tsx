export function PageHero({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="border-b border-navy/15 bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-3xl font-medium uppercase tracking-[0.18em] md:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed">{description}</p>
      </div>
    </header>
  );
}
