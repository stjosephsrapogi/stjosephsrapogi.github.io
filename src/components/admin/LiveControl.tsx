import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Loader2, Radio, Square } from "lucide-react";
import { toast } from "sonner";

import { SocialVideo } from "@/components/news/SocialVideo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { liveQuery, liveSchema } from "@/lib/news";

export function LiveControl() {
  const qc = useQueryClient();
  const { data } = useQuery(liveQuery);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setUrl(data.streamUrl);
    }
  }, [data]);

  async function save(isLive: boolean) {
    setError("");
    const parsed = liveSchema.safeParse({ title, streamUrl: url });
    if (isLive && !parsed.success) return setError(parsed.error.issues[0]?.message ?? "Check the link.");
    setBusy(true);
    const { error: err } = await supabase.from("live_stream").upsert({
      id: 1,
      is_live: isLive,
      title: title.trim().slice(0, 150),
      stream_url: isLive && parsed.success ? parsed.data.streamUrl : url.trim(),
      updated_at: new Date().toISOString(),
    });
    setBusy(false);
    if (err) return setError("Couldn't update the live stream. Please try again.");
    toast.success(isLive ? "You're live on the website!" : "Live stream ended.");
    await qc.invalidateQueries({ queryKey: liveQuery.queryKey });
  }

  const live = !!data?.isLive;

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-card p-5 shadow-soft md:p-6">
        <div className="flex items-center gap-3">
          <span
            className={
              live
                ? "shrink-0 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase text-accent-foreground"
                : "shrink-0 rounded-full bg-muted px-3 py-1 text-xs font-bold uppercase text-muted-foreground"
            }
          >
            {live ? "Live now" : "Not live"}
          </span>
          <p className="text-sm text-muted-foreground">
            {live
              ? "Visitors see a red LIVE strip on every page and the player on the News page."
              : "Start a live video on YouTube or Facebook, then paste its link here."}
          </p>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <Label htmlFor="live-title">What's happening?</Label>
            <Input id="live-title" className="mt-1.5 h-11" maxLength={150} placeholder="e.g. Annual music concert" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="live-url">Live video link</Label>
            <Input id="live-url" type="url" inputMode="url" className="mt-1.5 h-11" placeholder="https://youtube.com/live/..." value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
          {error && <p role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
          <div className="flex flex-wrap gap-3">
            <Button size="lg" variant="hero" disabled={busy} onClick={() => save(true)}>
              {busy ? <Loader2 className="animate-spin" /> : <Radio />} {live ? "Update live stream" : "Go live on the website"}
            </Button>
            {live && (
              <Button size="lg" variant="outline" disabled={busy} onClick={() => save(false)}>
                <Square /> End live stream
              </Button>
            )}
          </div>
        </div>

        {url.trim() && /^https?:\/\//i.test(url.trim()) && (
          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preview</p>
            <SocialVideo url={url} title="Live stream preview" />
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-5 text-sm">
          <p className="font-semibold text-primary">Going live on YouTube</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted-foreground">
            <li>Open the YouTube app and tap <strong>+</strong> → <strong>Go live</strong>.</li>
            <li>Once live, tap <strong>Share</strong> → <strong>Copy link</strong>.</li>
            <li>Paste it above and tap <strong>Go live on the website</strong>.</li>
          </ol>
          <p className="mt-2 text-xs text-muted-foreground">YouTube must have live streaming switched on for the school's channel first (it can take up to 24 hours the first time).</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5 text-sm">
          <p className="font-semibold text-primary">Going live on Facebook</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted-foreground">
            <li>On the school's Facebook page, tap <strong>Live</strong>.</li>
            <li>Make sure the video is <strong>Public</strong>, then go live.</li>
            <li>Copy the video's link, paste it above, and go live on the website.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
