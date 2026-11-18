import { SectionHeading } from "@/components/site/PageHero";
import { VideoEmbed } from "@/components/site/VideoEmbed";
import { school } from "@/lib/school";
import { videoId } from "@/lib/video";

/**
 * The school documentary, played straight from YouTube.
 *
 * Shows nothing until a YouTube link is saved in src/lib/school.ts, so the site never
 * carries an empty video box.
 */
export function Documentary({ poster }: { poster: string }) {
  const id = videoId();
  if (!id) return null;

  return (
    <section className="bg-secondary/60">
      <div className="mx-auto max-w-5xl px-5 py-20 md:py-24">
        <SectionHeading
          eyebrow="Watch"
          title="Our story on film"
          intro={school.video.description}
          center
        />
        <div className="mt-10">
          <VideoEmbed id={id} title={school.video.title} poster={poster} />
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          The film is hosted on YouTube and plays right here on this page.
        </p>
      </div>
    </section>
  );
}
