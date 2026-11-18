import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import crest from "@/assets/rapogi_crest.png";
import { navLinks, school, telHref } from "@/lib/school";

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep text-forest-deep-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={crest}
              alt=""
              width={56}
              height={56}
              loading="lazy"
              className="h-14 w-14 rounded-full bg-card object-contain p-1"
            />
            <div>
              <p className="font-display text-lg font-semibold">{school.name}</p>
              <p className="eyebrow mt-1 text-gold">{school.motto}</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm text-forest-deep-foreground/70">
            A public boys' boarding national school, nurturing young men in Grades 10–12 since{" "}
            {school.founded}.
          </p>
        </div>

        <div>
          <p className="eyebrow text-gold">Explore</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm md:grid-cols-1">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-forest-deep-foreground/80 hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold">Visit us</p>
          <p className="mt-4 flex gap-2 text-sm text-forest-deep-foreground/80">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            {school.location}
          </p>
          <p className="mt-3 flex gap-2 text-sm text-forest-deep-foreground/80">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            {school.postal}
          </p>
          <div className="mt-3 flex gap-2 text-sm">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <div className="flex flex-col">
              {school.phones.map((p) => (
                <a key={p} href={telHref(p)} className="text-forest-deep-foreground/80 hover:text-gold">
                  {p}
                </a>
              ))}
            </div>
          </div>
          <a
            href={`mailto:${school.email}`}
            className="mt-3 block break-all text-sm text-gold hover:underline"
          >
            {school.email}
          </a>
        </div>
      </div>
      <div className="border-t border-forest-deep-foreground/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-forest-deep-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {school.name}. All rights reserved.
          </p>
          <div className="text-center sm:text-right">
            <p>
              Made by{" "}
              <a
                href={school.builderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gold hover:underline"
              >
                Beta Corporation
              </a>
            </p>
            <a
              href={school.builderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block break-all text-forest-deep-foreground/50 hover:text-gold hover:underline"
            >
              betacorporation.github.io
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
