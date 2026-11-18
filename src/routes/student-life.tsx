import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Church, Cross, FlaskConical, Mic2, Moon, Music, Tent, Trophy, Users } from "lucide-react";

import { CtaBand } from "@/components/site/CtaBand";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/student-life")({
  head: () =>
    pageHead({
      path: "/student-life",
      title: "Student Life, Sports & Clubs — St. Joseph's Rapogi",
      description:
        "KSSSA football strength, a partnership with the Michael Olunga Football Academy, KSEF science competitors, clubs, societies and an inclusive faith life.",
      ogTitle: "Student Life at St. Joseph's Rapogi",
      ogDescription: "Sports, clubs, science fairs and faith life on our boarding campus.",
      ogImage: "/og/student-life.jpg",
      ogImageAlt: "Students on the Rapogi school bus",
    }),
  component: StudentLife,
});

const clubs = [
  {
    icon: FlaskConical,
    name: "Science & Innovation",
    text: "Regular competitors at the Kenya Science and Engineering Fair (KSEF).",
  },
  {
    icon: Mic2,
    name: "Drama",
    text: "Stage productions and festival entries that bring stories to life.",
  },
  {
    icon: Music,
    name: "Music",
    text: "Choir, instruments and performances at school and national festivals.",
  },
  {
    icon: Users,
    name: "Debate",
    text: "Sharp minds, confident speakers and competitive public speaking.",
  },
  {
    icon: Tent,
    name: "Scouts",
    text: "Leadership, service and outdoor skills in the scouting tradition.",
  },
  {
    icon: Cross,
    name: "Christian Union",
    text: "Fellowship, worship and spiritual growth for Christian students.",
  },
];

function StudentLife() {
  return (
    <>
      <PageHero
        eyebrow="Student life"
        title="Beyond the classroom"
        intro="Boarding life at Rapogi builds friendships, teamwork and character that last a lifetime."
        image={photos.bus}
      />

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-24">
        <div>
          <SectionHeading
            eyebrow="Sports"
            title="A football powerhouse"
            intro="St. Joseph's is highly dominant in regional KSSSA games — especially football."
          />
          <p className="mt-5 text-muted-foreground">
            The school maintains an active technical and sports-equipment partnership with the
            Michael Olunga Football Academy (MOFA), giving our players access to expert coaching and
            quality equipment.
          </p>
          <div className="mt-8 flex items-center gap-4 rounded-lg border-l-4 border-accent bg-card p-5 shadow-soft">
            <Trophy className="h-10 w-10 shrink-0 text-gold" />
            <p className="text-sm">
              <span className="font-semibold text-primary">
                Partner: Michael Olunga Football Academy
              </span>
              <br />
              <span className="text-muted-foreground">
                Technical & sports-equipment partnership
              </span>
            </p>
          </div>
        </div>
        <div className="grid gap-4">
          <img
            src={photos.mofaGroup}
            alt="Students and Michael Olunga Football Academy officials with new footballs and equipment"
            width={720}
            height={480}
            loading="lazy"
            className="aspect-[3/2] w-full rounded-lg object-cover shadow-soft"
          />
          <img
            src={photos.mofaSession}
            alt="MOFA coaches holding a session with St. Joseph's students"
            width={720}
            height={480}
            loading="lazy"
            className="aspect-[3/2] w-full rounded-lg object-cover shadow-soft"
          />
        </div>
      </section>

      <section className="bg-secondary/60">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
          <SectionHeading
            eyebrow="Clubs & societies"
            title="Find your people"
            intro="A wide range of clubs gives every student a place to explore, compete and lead."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {clubs.map((c) => (
              <div key={c.name} className="rounded-lg border border-border bg-card p-6">
                <c.icon className="h-6 w-6 text-accent" />
                <h3 className="mt-4 text-xl font-semibold text-primary">{c.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <SectionHeading
          eyebrow="Talent & culture"
          title="On stage and on the field"
          intro="Music, dance and talent nights give every student a chance to perform, compete and be celebrated."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <figure>
            <img
              src={photos.cultural}
              alt="A student playing a traditional instrument during a stage performance"
              width={1200}
              height={1200}
              loading="lazy"
              className="aspect-square w-full rounded-lg object-cover shadow-soft"
            />
            <figcaption className="mt-3 text-sm text-muted-foreground">
              Traditional music on stage
            </figcaption>
          </figure>
          <figure>
            <img
              src={photos.talentCertificates}
              alt="Talent show participants holding their certificates of participation"
              width={1200}
              height={1200}
              loading="lazy"
              className="aspect-square w-full rounded-lg object-cover shadow-soft"
            />
            <figcaption className="mt-3 text-sm text-muted-foreground">
              Talent night certificates
            </figcaption>
          </figure>
          <figure>
            <img
              src={photos.dancing}
              alt="Students dancing in a line on the school field"
              width={1200}
              height={800}
              loading="lazy"
              className="aspect-square w-full rounded-lg object-cover shadow-soft"
            />
            <figcaption className="mt-3 text-sm text-muted-foreground">
              Celebrating together on the field
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-card">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-24">
          <div className="grid grid-cols-2 gap-4">
            <img
              src={photos.procession}
              alt="Students in procession on the school field"
              width={1440}
              height={960}
              loading="lazy"
              className="aspect-[3/4] w-full rounded-lg object-cover shadow-soft"
            />
            <img
              src={photos.bus}
              alt="Students on and around the Rapogi school bus"
              width={1440}
              height={1440}
              loading="lazy"
              className="mt-10 aspect-[3/4] w-full rounded-lg object-cover shadow-soft"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Faith & inclusion"
              title="A Catholic foundation, open to all"
            />
            <p className="mt-6 text-muted-foreground md:text-lg">
              While St. Joseph's keeps a strong Catholic foundation, we welcome and accommodate
              students of diverse religious backgrounds.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex gap-3">
                <Church className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm">Catholic worship and spiritual formation</span>
              </li>
              <li className="flex gap-3">
                <Users className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm">Christian Union and other faith groups</span>
              </li>
              <li className="flex gap-3">
                <Moon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm">An on-campus mosque for Muslim students</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
