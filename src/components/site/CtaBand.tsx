import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export function CtaBand() {
  return (
    <section className="bg-forest-gradient">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-14 md:flex-row md:items-center md:justify-between md:py-16">
        <div>
          <p className="eyebrow text-gold">Senior School admissions</p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold text-primary-foreground md:text-4xl">
            Join a proud tradition of disciplined, high-achieving young men.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="gold" size="xl">
            <Link to="/admissions">Admission requirements</Link>
          </Button>
          <Button asChild variant="heroOutline" size="xl">
            <Link to="/contact">Contact the school</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
