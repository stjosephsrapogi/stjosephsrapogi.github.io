import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Banknote, Camera, FileCheck2, FileText, IdCard, MessageSquareText, Phone, Shirt } from "lucide-react";

import { AdmissionInquiryForm } from "@/components/site/AdmissionInquiryForm";

import { SectionHeading, PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { photos } from "@/lib/photos";
import { school } from "@/lib/school";

export const Route = createFileRoute("/admissions")({
  head: () =>
    pageHead({
      path: "/admissions",
      title: "Admissions & Fees — St. Joseph's National School, Rapogi",
      description:
        "Senior School admission requirements, documents to bring, government-approved fees of about KSh 53,554 per year and uniform guidance for St. Joseph's Rapogi.",
      ogTitle: "Admissions at St. Joseph's Rapogi",
      ogDescription: "Requirements, fees and uniform information for new students.",
      ogImage: "/og/admissions.jpg",
      ogImageAlt: "Entrance avenue leading to St. Joseph's Rapogi",
    }),
  component: Admissions,
});

const documents = [
  { icon: IdCard, title: "Birth certificate", text: "A verified copy of the student's birth certificate." },
  { icon: FileText, title: "Previous school report", text: "Most recent report form or transcript from the previous school." },
  { icon: Camera, title: "Passport photographs", text: "Recent passport-size photographs of the student." },
  { icon: FileCheck2, title: "Application form", text: "A fully completed school application form." },
];

const steps = [
  "Receive your placement to St. Joseph's Rapogi through the Ministry of Education.",
  "Prepare all the required documents listed below.",
  "Pay fees to the school's authorised KCB or Equity Bank accounts and keep the bank slips.",
  "Buy the formal uniform from the designated school vendors.",
  "Report to school on the admission date with your parent or guardian.",
];

function Admissions() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Begin your Rapogi journey"
        intro="Everything parents and new students need to prepare for joining Senior School at St. Joseph's."
        image={photos.avenue}
      />

      <div className="border-b border-border bg-secondary/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">Have a question about joining St. Joseph's?</p>
          <Button asChild size="sm">
            <a href="#inquiry">
              <MessageSquareText /> Send an admissions inquiry
            </a>
          </Button>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <SectionHeading eyebrow="How to join" title="Admission in five steps" />
        <ol className="mt-10 grid gap-4 md:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s} className="rounded-lg border border-border bg-card p-5">
              <span className="font-display text-3xl font-semibold text-accent">0{i + 1}</span>
              <p className="mt-3 text-sm">{s}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-secondary/60">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
          <SectionHeading
            eyebrow="Required documents"
            title="What to bring on admission day"
            intro="Senior School entry requires the following documents."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {documents.map((d) => (
              <div key={d.title} className="rounded-lg border border-border bg-card p-6 shadow-soft">
                <d.icon className="h-7 w-7 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-primary">{d.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-20 md:grid-cols-2 md:py-24">
        <div className="rounded-lg bg-forest-gradient p-8 text-primary-foreground shadow-soft">
          <Banknote className="h-8 w-8 text-gold" />
          <p className="eyebrow mt-5 text-gold">Fee structure</p>
          <p className="mt-3 font-display text-5xl font-semibold">{school.annualFees}</p>
          <p className="mt-1 text-primary-foreground/80">approximately, per year</p>
          <p className="mt-6 text-sm text-primary-foreground/85">
            The standard Government-approved national school cluster structure applies. Fees are
            usually split across the three terms and paid only through the school's authorised
            bank accounts at <strong>KCB</strong> or <strong>Equity Bank</strong>.
          </p>
          <p className="mt-4 text-xs text-primary-foreground/70">
            Never pay fees to an individual. Always confirm account details with the school office.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-8 shadow-soft">
          <Shirt className="h-8 w-8 text-accent" />
          <p className="eyebrow mt-5 text-accent">Uniform</p>
          <h3 className="mt-3 text-2xl font-semibold text-primary">Managed separately</h3>
          <p className="mt-4 text-sm text-muted-foreground">
            Formal uniform costs are handled separately from school fees, through designated school
            vendors. This includes the specialised fleece — without hoods — for the colder seasons.
          </p>
          <Button asChild variant="default" className="mt-8">
            <Link to="/contact">Ask about uniform vendors</Link>
          </Button>
        </div>
      </section>

      <section id="inquiry" className="scroll-mt-24 bg-secondary/60">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1fr_1.5fr] md:py-24">
          <div>
            <SectionHeading
              eyebrow="Admissions inquiry"
              title="Ask us about enrolment"
              intro="Parents and guardians can send a question here. Leave your phone number and the admissions office will get back to you."
            />
            <div className="mt-8 rounded-lg border border-border bg-card p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Phone className="h-4 w-4" /> Prefer to call?
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {school.phones.map((p) => (
                  <li key={p}>
                    <a className="hover:text-primary hover:underline" href={`tel:${p.replace(/\s/g, "")}`}>
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <AdmissionInquiryForm />
        </div>
      </section>
    </>
  );
}
