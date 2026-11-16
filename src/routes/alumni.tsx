import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, HandHeart, HeartPulse, Users } from "lucide-react";

import library from "@/assets/library-study.jpg";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/alumni")({
  head: () => ({
    meta: [
      { title: "Alumni & Community — St. Joseph's Rapogi (ROSA)" },
      {
        name: "description",
        content:
          "The Rapogi Old Students Association (ROSA) and class associations support current students through mentorship, healthcare assistance and philanthropy.",
      },
      { property: "og:title", content: "Rapogi Alumni & Community" },
      {
        property: "og:description",
        content: "ROSA and class associations giving back to St. Joseph's Rapogi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Alumni,
});

const initiatives = [
  { icon: GraduationCap, title: "Mentorship", text: "Old boys guide current students on academics, careers and life after school." },
  { icon: HeartPulse, title: "Healthcare assistance", text: "Support for students facing medical needs and emergencies." },
  { icon: HandHeart, title: "Student philanthropy", text: "Fundraising and giving that help bright, needy students stay in school." },
];

function Alumni() {
  return (
    <>
      <PageHero
        eyebrow="Alumni & community"
        title="Once a Rapogi boy, always a Rapogi boy"
        intro="Our old students remain a powerful, giving family that lifts every new generation."
        image={library}
      />

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-24">
        <div>
          <SectionHeading
            eyebrow="ROSA"
            title="Rapogi Old Students Association"
            intro="ROSA brings together St. Joseph's alumni from every generation to support the school and its students."
          />
          <p className="mt-5 text-muted-foreground">
            Graduating classes — like the Rapogi Boys 2005 Alumni Association — are organised to run
            structured programmes that make a real difference for students today.
          </p>
          <Button asChild variant="hero" size="xl" className="mt-8">
            <Link to="/contact">Connect with ROSA</Link>
          </Button>
        </div>
        <div className="rounded-lg bg-forest-deep p-8 text-forest-deep-foreground shadow-soft">
          <Users className="h-10 w-10 text-gold" />
          <p className="mt-6 font-display text-2xl leading-snug">
            "Giving back to the school that sharpened us is how we keep its promise alive."
          </p>
          <p className="eyebrow mt-6 text-gold">The Rapogi alumni spirit</p>
        </div>
      </section>

      <section className="bg-secondary/60">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
          <SectionHeading eyebrow="Alumni initiatives" title="How our old boys give back" center />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {initiatives.map((i) => (
              <div key={i.title} className="rounded-lg border border-border bg-card p-7 text-center shadow-soft">
                <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <i.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-primary">{i.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{i.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
