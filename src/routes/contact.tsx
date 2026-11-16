import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Mail, MapPin, Navigation, Phone, Send } from "lucide-react";

import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { photos } from "@/lib/photos";
import { school, telHref } from "@/lib/school";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      path: "/contact",
      title: "Contact Us — St. Joseph's National School, Rapogi",
      description:
        "Call +254 732 441252 or +254 709 841539, email rapogihighschool@gmail.com, or write to P.O. Box 2, Sare-Awendo, 40405. Find St. Joseph's Rapogi in Migori County.",
      ogTitle: "Contact St. Joseph's Rapogi",
      ogDescription: "Phone, email, postal address and directions to St. Joseph's Rapogi.",
      ogImage: "/og/contact.jpg",
      ogImageAlt: "Main gate of St. Joseph's School Rapogi",
    }),
  component: Contact,
});

const mapQuery = encodeURIComponent("St. Joseph Rapogi National School, Migori");

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Phone;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-gold">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="font-semibold text-primary">{label}</p>
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    </li>
  );
}

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Get in touch with Rapogi"
        intro="We welcome parents, guardians, alumni and partners. Call, email, write or visit us."
        image={photos.gateMinistry}
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1fr_1.3fr] md:py-24">
        <div>
          <SectionHeading eyebrow="Principal's office" title="General inquiries" />
          <ul className="mt-8 space-y-6">
            <ContactRow icon={Phone} label="Phone">
              {school.phones.map((p) => (
                <a key={p} href={telHref(p)} className="block text-base text-foreground hover:text-accent">
                  {p}
                </a>
              ))}
            </ContactRow>
            <ContactRow icon={Send} label="Email">
              <a
                href={`mailto:${school.email}`}
                className="break-all text-base text-foreground hover:text-accent"
              >
                {school.email}
              </a>
            </ContactRow>
            <ContactRow icon={Mail} label="Postal address">
              {school.postal}
            </ContactRow>
            <ContactRow icon={MapPin} label="Location">
              {school.location}
            </ContactRow>
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl">
              <a href={telHref(school.phones[0])}>
                <Phone /> Call the school
              </a>
            </Button>
            <Button asChild variant="outline" size="xl">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noreferrer"
              >
                <Navigation /> Directions
              </a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Joining us? See the{" "}
            <Link to="/admissions" className="font-semibold text-accent hover:underline">
              admission requirements
            </Link>
            .
          </p>
        </div>
        <div className="overflow-hidden rounded-lg border border-border shadow-soft">
          <iframe
            title="Map showing St. Joseph's Rapogi"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="h-[420px] w-full md:h-full md:min-h-[520px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
