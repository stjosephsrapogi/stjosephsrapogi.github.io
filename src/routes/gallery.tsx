import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { X } from "lucide-react";
import { useState } from "react";

import { PageHero } from "@/components/site/PageHero";
import { gallery, photos } from "@/lib/photos";

export const Route = createFileRoute("/gallery")({
  head: () =>
    pageHead({
      path: "/gallery",
      title: "Photo Gallery — St. Joseph's National School, Rapogi",
      description:
        "Photos of campus life at St. Joseph's Rapogi: our grounds, students, debate champions, MOFA football partnership and school events.",
      ogTitle: "St. Joseph's Rapogi Photo Gallery",
      ogDescription: "Campus, students and events at St. Joseph's Rapogi.",
      ogImage: "/og/gallery.jpg",
      ogImageAlt: "Students in procession on the school field",
    }),
  component: Gallery,
});

function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : gallery[active];

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments at Rapogi"
        intro="A look at our campus, our students and the events that make St. Joseph's special."
        image={photos.procession}
      />

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {gallery.map((g, i) => (
            <button
              key={g.src}
              type="button"
              onClick={() => setActive(i)}
              className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-lg bg-card text-left shadow-soft"
            >
              <img
                src={g.src}
                alt={g.caption}
                loading="lazy"
                className="w-full transition-transform duration-700 group-hover:scale-105"
              />
              <p className="px-4 py-3 text-sm text-muted-foreground">{g.caption}</p>
            </button>
          ))}
        </div>
      </section>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-forest-deep/95 p-4"
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-card p-2 text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={current.src}
            alt={current.caption}
            className="max-h-[80vh] max-w-full rounded-lg object-contain"
          />
          <p className="mt-4 text-center text-sm text-forest-deep-foreground">{current.caption}</p>
        </div>
      )}
    </>
  );
}
