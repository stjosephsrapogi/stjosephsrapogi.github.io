import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, BookOpen, Dumbbell, FlaskConical, ShieldCheck, Users } from "lucide-react";

import aerial from "@/assets/campus_aerial.jpg.asset.json";
import classrooms from "@/assets/campus_classrooms.jpg.asset.json";
import crest from "@/assets/rapogi_crest.png.asset.json";
import football from "@/assets/football-match.jpg";
import library from "@/assets/library-study.jpg";
import lab from "@/assets/science-lab.jpg";
import { CtaBand } from "@/components/site/CtaBand";
import { SectionHeading } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { school } from "@/lib/school";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "St. Joseph's National School, Rapogi — Sharpening for the Future" },
      {
        name: "description",
        content:
          "Public boys' boarding national school in Sare, Migori County. Senior School Grades 10–12 under CBC, strong KCSE results and a proud history since 1961.",
      },
      { property: "og:title", content: "St. Joseph's National School, Rapogi" },
      {
        property: "og:description",
        content: "Sharpening for the Future — boys' national school in Migori County since 1961.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const stats = [
  { value: "1961", label: "Year founded" },
  { value: school.meanScore, label: "Recent KCSE mean score" },
  { value: "10–12", label: "Senior School grades" },
  { value: "C1", label: "National school cluster" },
];

const pillarIcons = [ShieldCheck, Award, BookOpen];
const pillarText = [
  "Order, respect and self-control shape every day on campus — in class, in the dormitory and on the field.",
  "We set high targets and track them closely, building a culture where every boy aims for his personal best.",
  "Honesty and strong moral character, rooted in our Catholic foundation, guide how our students live and lead.",
];

const highlights = [
  {
    icon: FlaskConical,
    title: "Academics & STEM",
    text: "Specialised science labs, CBC pathways and a signature bi-cycle exam system.",
    image: lab,
    to: "/academics" as const,
  },
  {
    icon: Dumbbell,
    title: "Sports & Clubs",
    text: "A football powerhouse in KSSSA, partnered with the Michael Olunga Football Academy.",
    image: football,
    to: "/student-life" as const,
  },
  {
    icon: Users,
    title: "Alumni Network",
    text: "ROSA and class associations mentor students and support those in need.",
    image: library,
    to: "/alumni" as const,
  },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate -mt-16 overflow-hidden md:-mt-20">
        <img
          src={aerial.url}
          alt="Aerial view of the St. Joseph's Rapogi campus with blue-roofed buildings and green trees"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-32 md:pb-24">
          <img
            src={crest.url}
            alt="School crest"
            width={88}
            height={88}
            className="animate-rise h-16 w-16 rounded-full bg-card object-contain p-1 shadow-crest md:h-20 md:w-20"
          />
          <p className="eyebrow rule-red animate-rise mt-6 text-gold">
            Public Boys' National School · Migori County
          </p>
          <h1 className="animate-rise mt-4 max-w-4xl text-5xl font-semibold leading-[1.02] text-forest-deep-foreground md:text-7xl">
            Sharpening for <em className="text-gold">the Future</em>
          </h1>
          <p className="animate-rise mt-6 max-w-xl text-base text-forest-deep-foreground/85 md:text-lg">
            St. Joseph's National School, Rapogi has shaped disciplined, high-achieving young men
            since 1961 — now a Senior School for Grades 10, 11 and 12.
          </p>
          <div className="animate-rise mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/admissions">
                Admissions <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <Link to="/about">Discover our story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-5 py-8 md:py-10 ${i % 2 === 1 ? "border-l border-border" : ""} ${i >= 2 ? "border-t border-border md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
            >
              <p className="font-display text-3xl font-semibold text-primary md:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Welcome */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
        <div className="relative">
          <img
            src={classrooms.url}
            alt="Classroom blocks with blue roofs among tall trees"
            width={720}
            height={720}
            loading="lazy"
            className="aspect-[4/5] w-full rounded-lg object-cover shadow-soft"
          />
          <div className="absolute -bottom-6 -right-2 rounded-lg bg-accent px-6 py-5 text-accent-foreground shadow-soft md:-right-6">
            <p className="font-display text-4xl font-semibold">65+</p>
            <p className="text-sm">years of excellence</p>
          </div>
        </div>
        <div>
          <SectionHeading
            eyebrow="Welcome to Rapogi"
            title="A catalyst for transformation in the region"
            intro="Founded by Roman Catholic missionaries, the Utrich brothers from the Netherlands, St. Joseph's Rapogi was built to change lives — and it still does."
          />
          <p className="mt-5 text-muted-foreground">
            Today, under Chief Principal {school.principal}, we combine a strong Catholic heritage
            with modern facilities, a demanding academic culture and a welcoming community for
            students of every faith.
          </p>
          <Button asChild variant="link" className="mt-4 px-0 text-base font-semibold">
            <Link to="/about">
              Read our history <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
          <SectionHeading eyebrow="Our core pillars" title="What every Rapogi boy stands for" center />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {school.pillars.map((p, i) => {
              const Icon = pillarIcons[i];
              return (
                <div key={p} className="rounded-lg border border-border bg-card p-7 shadow-soft">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-gold">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold text-primary">{p}</h3>
                  <p className="mt-3 text-muted-foreground">{pillarText[i]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <SectionHeading
          eyebrow="Life at St. Joseph's"
          title="Mind, body and character"
          intro="From the laboratory to the football pitch, every student is challenged to grow."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {highlights.map((h) => (
            <Link
              key={h.title}
              to={h.to}
              className="group overflow-hidden rounded-lg border border-border bg-card shadow-soft transition-transform hover:-translate-y-1"
            >
              <div className="overflow-hidden">
                <img
                  src={h.image}
                  alt={h.title}
                  width={1280}
                  height={896}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h.icon className="h-5 w-5 text-accent" />
                <h3 className="mt-3 text-xl font-semibold text-primary">{h.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{h.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Principal quote */}
      <section className="bg-forest-deep text-forest-deep-foreground">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center md:py-24">
          <p className="font-display text-6xl leading-none text-gold">“</p>
          <blockquote className="font-display text-2xl leading-snug md:text-3xl">
            Our task is to sharpen every young man who walks through our gates — in knowledge, in
            discipline and in faith — so that he is ready for the future.
          </blockquote>
          <p className="eyebrow mt-8 text-gold">{school.principal} · Chief Principal</p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
