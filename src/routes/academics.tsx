import { createFileRoute } from "@tanstack/react-router";
import { Atom, BarChart3, Drama, HeartHandshake, Repeat, Trophy } from "lucide-react";

import { CtaBand } from "@/components/site/CtaBand";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { photos } from "@/lib/photos";
import { school } from "@/lib/school";

export const Route = createFileRoute("/academics")({
  head: () => ({
    meta: [
      { title: "Academics & CBC Pathways — St. Joseph's Rapogi" },
      {
        name: "description",
        content:
          "CBC Senior School pathways in STEM and Arts & Sports, a signature bi-cycle exam system and a KCSE mean score of up to 9.1264 at St. Joseph's Rapogi.",
      },
      { property: "og:title", content: "Academics at St. Joseph's Rapogi" },
      {
        property: "og:description",
        content: "CBC pathways, bi-cycle exams and a strong KCSE track record.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Academics,
});

const pathways = [
  {
    icon: Atom,
    name: "STEM",
    tag: "Science, Technology, Engineering & Mathematics",
    subjects: [
      "General Sciences",
      "Media Technology",
      "Advanced engineering concepts",
      "Pure & applied sciences",
    ],
    note: "General Sciences may be paired with Media Technology, Music & Dance, or engineering concepts.",
  },
  {
    icon: Drama,
    name: "Arts & Sports Science",
    tag: "Creative, performing and sporting talent",
    subjects: [
      "Literature in English",
      "Fasihi ya Kiswahili",
      "Theatre & Film",
      "Sports & Recreation",
      "Music & Dance",
    ],
    note: "Ideal for gifted writers, performers and athletes.",
  },
  {
    icon: HeartHandshake,
    name: "Social Sciences",
    tag: "Humanities, languages and business",
    subjects: ["Humanities", "Languages", "Business studies"],
    note: "The third standard CBC pathway, offered within the national framework.",
  },
];

const programs = [
  {
    icon: Repeat,
    title: "Bi-cycle exam system",
    text: "Our signature assessment rhythm monitors and evaluates every student's progress closely, so support comes early.",
  },
  {
    icon: HeartHandshake,
    title: "Student-parent counselling",
    text: "Specialised counselling sessions set clear targets together with students and their parents.",
  },
  {
    icon: BarChart3,
    title: "Dual-curriculum delivery",
    text: "We actively deliver both the traditional curriculum and the new Competency-Based Curriculum during the transition.",
  },
];

function Academics() {
  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="High standards. Clear pathways."
        intro="A Senior School built for the Competency-Based Curriculum — backed by decades of KCSE excellence."
        image={photos.procession}
      />

      <section className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <div className="grid items-end gap-10 md:grid-cols-[1.3fr_1fr]">
          <SectionHeading
            eyebrow="Track record"
            title="An academic giant in the Nyanza region"
            intro="St. Joseph's consistently posts strong KCSE results and a top-tier university entry rate."
          />
          <div className="flex items-center gap-5 rounded-lg bg-primary p-7 text-primary-foreground shadow-soft">
            <Trophy className="h-12 w-12 shrink-0 text-gold" />
            <div>
              <p className="font-display text-5xl font-semibold">{school.meanScore}</p>
              <p className="text-sm text-primary-foreground/80">Recent peak KCSE mean score</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/60">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
          <SectionHeading
            eyebrow="Senior School pathways"
            title="Three learning pathways for Grades 10–12"
            intro="Every student follows one of the three standard CBC pathways, with particular strength in STEM and Arts & Sports."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pathways.map((p) => (
              <article key={p.name} className="flex flex-col rounded-lg border border-border bg-card p-7 shadow-soft">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-2xl font-semibold text-primary">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.tag}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {p.subjects.map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-6 text-xs text-muted-foreground">{p.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-24">
        <figure>
          <img
            src={photos.debate}
            alt="Three St. Joseph's students holding a debate trophy and wearing medals"
            width={1080}
            height={1080}
            loading="lazy"
            className="aspect-square w-full rounded-lg object-cover shadow-soft"
          />
          <figcaption className="mt-3 text-sm text-muted-foreground">
            Our debaters with their trophy and medals.
          </figcaption>
        </figure>
        <div>
          <SectionHeading eyebrow="How we teach" title="Every student, closely followed" />
          <div className="mt-8 space-y-6">
            {programs.map((p) => (
              <div key={p.title} className="flex gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-gold">
                  <p.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-primary">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
