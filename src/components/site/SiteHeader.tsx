import { Link } from "@tanstack/react-router";
import { Mail, Menu, Phone } from "lucide-react";
import { useState } from "react";

import crest from "@/assets/rapogi_crest.png.asset.json";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navLinks, school, telHref } from "@/lib/school";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="hidden bg-forest-deep text-forest-deep-foreground md:block">
        <div className="mx-auto flex h-9 max-w-6xl items-center justify-between px-5 text-xs">
          <p className="eyebrow text-[0.65rem] text-gold">{school.motto}</p>
          <div className="flex items-center gap-5">
            <a href={telHref(school.phones[0])} className="flex items-center gap-1.5 hover:text-gold">
              <Phone className="h-3.5 w-3.5" /> {school.phones[0]}
            </a>
            <a href={`mailto:${school.email}`} className="flex items-center gap-1.5 hover:text-gold">
              <Mail className="h-3.5 w-3.5" /> {school.email}
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-20">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={crest.url}
            alt="St. Joseph's Rapogi crest"
            width={48}
            height={48}
            className="h-10 w-10 rounded-full bg-card object-contain p-0.5 shadow-crest md:h-12 md:w-12"
          />
          <span className="leading-tight">
            <span className="block font-display text-base font-semibold text-primary md:text-lg">
              St. Joseph's
            </span>
            <span className="eyebrow block text-[0.62rem] text-accent">Rapogi · Est. 1961</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary font-semibold" }}
            >
              {l.label}
            </Link>
          ))}
          <Button asChild variant="hero" className="ml-3">
            <Link to="/admissions">Apply now</Link>
          </Button>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="!size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-background">
            <SheetTitle className="font-display text-primary">Menu</SheetTitle>
            <nav className="mt-6 flex flex-col">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 font-medium"
              >
                Home
              </Link>
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-3 font-medium"
                  activeProps={{ className: "text-accent" }}
                >
                  {l.label}
                </Link>
              ))}
              <Button asChild variant="hero" className="mt-6">
                <Link to="/admissions" onClick={() => setOpen(false)}>
                  Apply now
                </Link>
              </Button>
              <a href={telHref(school.phones[0])} className="mt-6 flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-accent" /> {school.phones[0]}
              </a>
              <a href={`mailto:${school.email}`} className="mt-3 flex items-center gap-2 break-all text-sm">
                <Mail className="h-4 w-4 shrink-0 text-accent" /> {school.email}
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
