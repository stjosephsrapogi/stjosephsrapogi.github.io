import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Building2, Church, FlaskConical, GraduationCap, Home, Landmark } from "lucide-react";

import logo from "@/assets/rapogi_logo_full.jpg";
import { photos } from "@/lib/photos";
import { CtaBand } from "@/components/site/CtaBand";
import { Documentary } from "@/components/site/Documentary";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { school } from "@/lib/school";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      path: "/about",
      title: "About Us — St. Joseph's National School, Rapogi",
      description:
        "Founded in 1961 by Catholic missionaries, St. Joseph's Rapogi is a public boys' national school in Migori County led by Chief Principal Mr. Erastus Nyagwa.",
      ogTitle: "About St. Joseph's National School, Rapogi",
      ogDescription: "Our history, leadership and campus — since 1961.",
      ogImage: "/og/about.jpg",
      ogImageAlt: "Tree-lined entrance avenue at St. Joseph's Rapogi",
    }),
  component: About,
});

const timeline = [
  {
    year: "1961",
    title: "Founded by missionaries",
    text: "Roman Catholic missionaries — the Utrich brothers from the Netherlands — establish the school in Rapogi as a catalyst for socio-economic transformation.",
  },
  {
    year: "Growth",
    title: "A regional academic giant",
    text: "St. Joseph's rises to become one of Nyanza's most competitive schools, attaining national school status.",
  },
  {
    year: "2023",
    title: "New leadership",
    text: `${school.principal} takes office as Chief Principal, driving a renewed focus on results and student wellbeing.`,
  },
  {
    year: "Today",
    title: "A CBC Senior School",
    text: "The school transitions to a Senior School hosting Grades 10, 11 and 12 under the Competency-Based Curriculum.",
  },
];

const facilities = [
  { icon: FlaskConical, title: "Specialised science labs" },
  { icon: Building2, title: "Modern classrooms" },
  { icon: Home, title: "Boarding facilities" },
  { icon: GraduationCap, title: "Sports grounds" },
  { icon: Church, title: "Chapel & on-campus mosque" },
  { icon: Landmark, title: "Expansive green campus" },
];

const facts = [
  ["School type", school.type],
  ["Location", school.location],
  ["MoE cluster", `Senior School Cluster ${school.cluster}`],
  ["Founded", `${school.founded}`],
  ["Chief Principal", school.principal],
  ["Motto", school.motto],
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Rooted in faith. Built for transformation."
        intro="For more than six decades, St. Joseph's Rapogi has shaped young men who go on to lead in Kenya and beyond."
        image={photos.avenue}
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[1.2fr_1fr] md:py-24">
        <div>
          <SectionHeading eyebrow="Our story" title="From a mission school to a national school" />
          <p className="mt-6 text-muted-foreground md:text-lg">
            St. Joseph's was founded in {school.founded} by Roman Catholic missionaries, specifically
            the Utrich brothers from the Netherlands. Their vision was simple and bold: a school that
            would act as a catalyst for socio-economic transformation in the region.
          </p>
          <p className="mt-4 text-muted-foreground md:text-lg">
            That vision lives on. Today we are a public boys' boarding national school, welcoming
            students from across Kenya and preparing them for university, careers and leadership.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-7 shadow-soft">
          <p className="eyebrow text-accent">At a glance</p>
          <dl className="mt-4 divide-y divide-border">
            {facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[8rem_1fr] gap-3 py-3 text-sm">
                <dt className="font-semibold text-primary">{k}</dt>
                <dd className="text-muted-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-forest-deep text-forest-deep-foreground">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-20 md:grid-cols-2 md:gap-8 md:py-24">
          <div className="rounded-lg border border-forest-deep-foreground/15 bg-forest-deep-foreground/5 p-8 md:p-10">
            <p className="eyebrow rule-gold text-gold">Our mission</p>
            <p className="font-display mt-5 text-2xl leading-snug md:text-3xl">{school.mission}</p>
          </div>
          <div className="rounded-lg border border-forest-deep-foreground/15 bg-forest-deep-foreground/5 p-8 md:p-10">
            <p className="eyebrow rule-gold text-gold">Our vision</p>
            <p className="font-display mt-5 text-2xl leading-snug md:text-3xl">{school.vision}</p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/60">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
          <SectionHeading eyebrow="Milestones" title="Our journey" />
          <ol className="mt-12 grid gap-6 md:grid-cols-4">
            {timeline.map((t) => (
              <li key={t.title} className="relative border-t-2 border-accent pt-6">
                <p className="font-display text-3xl font-semibold text-primary">{t.year}</p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-24">
        <figure>
          <img
            src={photos.principal}
            alt="Chief Principal Mr. Erastus Nyagwa speaking at the St. Joseph's chaplaincy podium"
            width={768}
            height={1073}
            loading="lazy"
            className="aspect-[4/5] w-full rounded-lg object-cover object-top shadow-soft"
          />
          <figcaption className="mt-3 text-sm text-muted-foreground">
            {school.principal}, Chief Principal
          </figcaption>
        </figure>
        <div>
          <SectionHeading eyebrow="Leadership" title={`Led by ${school.principal}`} />
          <p className="mt-6 text-muted-foreground md:text-lg">
            Chief Principal {school.principal} took over the leadership of St. Joseph's Rapogi in
            2023. Supported by a dedicated board, teaching staff and parents, he leads the school's
            transition into the CBC Senior School era while upholding its proud academic record.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {school.pillars.map((p) => (
              <div key={p} className="rounded-md bg-primary px-3 py-4 text-center">
                <p className="font-display text-sm font-semibold text-primary-foreground md:text-base">
                  {p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/60">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-[1fr_1.2fr] md:py-24">
          <figure className="md:order-2">
            <img
              src={photos.deputyPrincipal}
              alt="The Deputy Principal, Administration speaking at the school podium"
              width={878}
              height={1169}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-lg object-cover object-top shadow-soft"
            />
            <figcaption className="mt-3 text-sm text-muted-foreground">
              {school.deputyPrincipal.name || school.deputyPrincipal.role}
            </figcaption>
          </figure>
          <div className="md:order-1">
            <SectionHeading eyebrow="Leadership" title={school.deputyPrincipal.name} />
            <p className="mt-3 font-semibold text-primary">{school.deputyPrincipal.role}</p>
            <p className="mt-6 text-muted-foreground md:text-lg">
              The Deputy Principal, Administration keeps the school running day to day — student
              records, timetables, discipline and the smooth coordination of staff and boarding
              life — so that lessons, exams and school activities move forward on time.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-card">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-24">
          <div>
            <SectionHeading
              eyebrow="Our campus"
              title="Room to learn, live and grow"
              intro="An expansive, tree-lined campus with dynamic infrastructure built around student life."
            />
            <ul className="mt-8 grid grid-cols-2 gap-4">
              {facilities.map((f) => (
                <li key={f.title} className="flex items-center gap-3 text-sm font-medium">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                    <f.icon className="h-5 w-5" />
                  </span>
                  {f.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={photos.aerial}
              alt="Aerial view of the campus"
              width={960}
              height={540}
              loading="lazy"
              className="col-span-2 aspect-video w-full rounded-lg object-cover shadow-soft"
            />
            <img
              src={photos.classrooms}
              alt="Classroom buildings among trees"
              width={720}
              height={720}
              loading="lazy"
              className="aspect-square w-full rounded-lg object-cover shadow-soft"
            />
            <div className="flex aspect-square items-center justify-center rounded-lg bg-card p-4 shadow-soft">
              <img
                src={logo}
                alt="St. Joseph School Rapogi crest"
                width={1080}
                height={1080}
                loading="lazy"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <Documentary poster={photos.avenue} />

      <CtaBand />
    </>
  );
}
