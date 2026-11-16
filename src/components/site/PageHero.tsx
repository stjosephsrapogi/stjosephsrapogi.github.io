import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  image: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={image}
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        width={1600}
        height={900}
      />
      <div className="absolute inset-0 -z-10 bg-hero-overlay" />
      <div className="mx-auto max-w-6xl px-5 pb-14 pt-28 md:pb-20 md:pt-40">
        <p className="eyebrow rule-red animate-rise text-gold">{eyebrow}</p>
        <h1 className="animate-rise mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] text-forest-deep-foreground md:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="animate-rise mt-5 max-w-2xl text-base text-forest-deep-foreground/85 md:text-lg">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow rule-red text-accent">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-primary md:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-muted-foreground md:text-lg">{intro}</p>}
    </div>
  );
}

export function CtaBand() {
  return null;
}
