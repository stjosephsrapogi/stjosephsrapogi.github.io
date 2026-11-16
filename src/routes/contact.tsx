import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Landmark, MapPin, Navigation } from "lucide-react";

import classrooms from "@/assets/campus_classrooms.jpg.asset.json";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { school } from "@/lib/school";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Location — St. Joseph's National School, Rapogi" },
      {
        name: "description",
        content:
          "Find St. Joseph's National School, Rapogi in Sare, Uriri Sub-county, Migori County, Kenya. Directions and how to reach the school office.",
      },
      { property: "og:title", content: "Contact St. Joseph's Rapogi" },
      {
        property: "og:description",
        content: "Location and directions to St. Joseph's Rapogi, Migori County.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const mapQuery = encodeURIComponent("St. Joseph's Rapogi Secondary School, Uriri, Migori");

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Visit St. Joseph's Rapogi"
        intro="We welcome parents, guardians, alumni and partners. Here is how to find us."
        image={classrooms.url}
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1fr_1.3fr] md:py-24">
        <div>
          <SectionHeading eyebrow="Get in touch" title="The school office" />
          <ul className="mt-8 space-y-6">
            <li className="flex gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-gold">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-primary">Location</p>
                <p className="text-sm text-muted-foreground">{school.location}</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-gold">
                <Landmark className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-primary">School</p>
                <p className="text-sm text-muted-foreground">
                  {school.type} · MoE Cluster {school.cluster}
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-gold">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-primary">Visiting</p>
                <p className="text-sm text-muted-foreground">
                  Please visit during official school days and check in at the main gate.
                </p>
              </div>
            </li>
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noreferrer"
              >
                <Navigation /> Get directions
              </a>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/admissions">Admissions info</Link>
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-border shadow-soft">
          <iframe
            title="Map showing St. Joseph's Rapogi"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="h-[420px] w-full md:h-full md:min-h-[480px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
