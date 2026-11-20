import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useRef, useState, type FormEvent } from "react";
import { ImagePlus, Link2, Loader2, Send, Video, X } from "lucide-react";
import { toast } from "sonner";

import { SocialVideo } from "@/components/news/SocialVideo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { checkMediaFile, MAX_PHOTOS, MAX_POST_CHARS, MEDIA_BUCKET, postSchema } from "@/lib/news";

const ext = (f: File) => (f.name.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5);

export function NewPostForm({ userId }: { userId: string }) {
  const qc = useQueryClient();
  const [body, setBody] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const photoInput = useRef<HTMLInputElement>(null);
  const videoInput = useRef<HTMLInputElement>(null);
  const previews = useMemo(() => photos.map((f) => URL.createObjectURL(f)), [photos]);

  function addPhotos(files: FileList | null) {
    if (!files) return;
    const picked = Array.from(files);
    const bad = picked.map((f) => checkMediaFile(f, "photo")).find(Boolean);
    if (bad) return setError(bad);
    const next = [...photos, ...picked];
    if (next.length > MAX_PHOTOS) return setError(`You can add up to ${MAX_PHOTOS} photos.`);
    setError("");
    setPhotos(next);
  }

  function pickVideo(files: FileList | null) {
    const f = files?.[0];
    if (!f) return;
    const bad = checkMediaFile(f, "video");
    if (bad) return setError(bad);
    setError("");
    setVideo(f);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = postSchema.safeParse({ body, videoUrl, photoCount: photos.length, hasVideoFile: !!video });
    if (!parsed.success) return setError(parsed.error.issues[0]?.message ?? "Please check the post.");
    setError("");
    setBusy(true);
    const uploaded: string[] = [];
    try {
      const upload = async (file: File) => {
        const path = `${userId}/${crypto.randomUUID()}.${ext(file)}`;
        const { error: err } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, { contentType: file.type });
        if (err) throw new Error(`${file.name} didn't upload: ${err.message}`);
        uploaded.push(path);
        return path;
      };
      const imagePaths = await Promise.all(photos.map(upload));
      const videoPath = video ? await upload(video) : null;
      const { error: err } = await supabase.from("news_posts").insert({
        author_id: userId,
        body: parsed.data.body,
        image_paths: imagePaths,
        video_path: videoPath,
        video_url: parsed.data.videoUrl || null,
      });
      if (err) throw new Error(err.message);
      toast.success("Posted! It's now on the News page.");
      setBody("");
      setVideoUrl("");
      setPhotos([]);
      setVideo(null);
      await qc.invalidateQueries({ queryKey: ["news"] });
    } catch (err) {
      if (uploaded.length) await supabase.storage.from(MEDIA_BUCKET).remove(uploaded);
      setError(err instanceof Error ? err.message : "The post couldn't be saved. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-lg border border-border bg-card p-5 shadow-soft md:p-6">
      <div>
        <Label htmlFor="post-body">What's happening at school?</Label>
        <Textarea
          id="post-body"
          className="mt-1.5 min-h-32"
          maxLength={MAX_POST_CHARS}
          placeholder="e.g. Our debate team won the county finals today!"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <p className="mt-1 text-right text-xs text-muted-foreground">{body.length}/{MAX_POST_CHARS}</p>
      </div>

      {photos.length > 0 && (
        <ul className="grid grid-cols-3 gap-2">
          {photos.map((f, i) => (
            <li key={`${f.name}-${i}`} className="relative">
              <img src={previews[i]} alt={f.name} className="aspect-square w-full rounded-md object-cover" />
              <button
                type="button"
                aria-label={`Remove ${f.name}`}
                className="absolute right-1 top-1 rounded-full bg-background/90 p-1 shadow"
                onClick={() => setPhotos(photos.filter((_, j) => j !== i))}
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {video && (
        <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-secondary/60 p-3 text-sm">
          <span className="flex min-w-0 items-center gap-2">
            <Video className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate">{video.name}</span>
            <span className="shrink-0 text-muted-foreground">({(video.size / 1048576).toFixed(1)} MB)</span>
          </span>
          <button type="button" aria-label="Remove video" onClick={() => setVideo(null)}>
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <input ref={photoInput} type="file" accept="image/*" multiple hidden aria-label="Choose photos" onChange={(e) => { addPhotos(e.target.files); e.target.value = ""; }} />
        <input ref={videoInput} type="file" accept="video/*" hidden aria-label="Choose a video" onChange={(e) => { pickVideo(e.target.files); e.target.value = ""; }} />
        <Button type="button" variant="outline" onClick={() => photoInput.current?.click()} disabled={photos.length >= MAX_PHOTOS}>
          <ImagePlus /> Add photos
        </Button>
        <Button type="button" variant="outline" onClick={() => videoInput.current?.click()} disabled={!!video || !!videoUrl}>
          <Video /> Upload video
        </Button>
      </div>

      <div>
        <Label htmlFor="post-video-url" className="flex items-center gap-1.5">
          <Link2 className="h-4 w-4" /> Or paste a video link (YouTube, TikTok, Facebook, Instagram)
        </Label>
        <Input
          id="post-video-url"
          type="url"
          inputMode="url"
          className="mt-1.5 h-11"
          placeholder="https://..."
          value={videoUrl}
          disabled={!!video}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        {videoUrl.trim() && /^https?:\/\//i.test(videoUrl.trim()) && (
          <div className="mt-3">
            <SocialVideo url={videoUrl} />
          </div>
        )}
      </div>

      {error && <p role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">Photos up to 10 MB, videos up to 50 MB (about 1–2 minutes).</p>
        <Button type="submit" size="lg" disabled={busy}>
          {busy ? <Loader2 className="animate-spin" /> : <Send />}
          {busy ? "Posting…" : "Post"}
        </Button>
      </div>
    </form>
  );
}
