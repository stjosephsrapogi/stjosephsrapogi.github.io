import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";

import { supabase } from "@/integrations/supabase/client";

/** Limits for school news posts. The database enforces the same text and photo limits. */
export const MAX_POST_CHARS = 3000;
export const MAX_PHOTOS = 6;
export const MAX_PHOTO_MB = 10;
export const MAX_VIDEO_MB = 50;
export const MEDIA_BUCKET = "news-media";

const httpUrl = z
  .string()
  .trim()
  .max(500, { message: "That link is too long." })
  .refine((v) => v === "" || /^https?:\/\/\S+\.\S+/i.test(v), {
    message: "Paste the full link, starting with https://",
  });

export const postSchema = z
  .object({
    body: z.string().trim().max(MAX_POST_CHARS, { message: `Keep the text under ${MAX_POST_CHARS} characters.` }),
    videoUrl: httpUrl,
    photoCount: z.number().int().max(MAX_PHOTOS, { message: `You can add up to ${MAX_PHOTOS} photos.` }),
    hasVideoFile: z.boolean(),
  })
  .refine((p) => p.body !== "" || p.videoUrl !== "" || p.photoCount > 0 || p.hasVideoFile, {
    message: "Write something, or add a photo or video.",
    path: ["body"],
  })
  .refine((p) => !(p.hasVideoFile && p.videoUrl !== ""), {
    message: "Add either an uploaded video or a video link, not both.",
    path: ["videoUrl"],
  });

/** Checks one chosen file. Returns a message for the person posting, or null when it is fine. */
export function checkMediaFile(file: { type: string; size: number; name: string }, kind: "photo" | "video") {
  const mb = file.size / (1024 * 1024);
  if (kind === "photo") {
    if (!file.type.startsWith("image/")) return `${file.name} is not a photo.`;
    if (mb > MAX_PHOTO_MB) return `${file.name} is bigger than ${MAX_PHOTO_MB} MB.`;
  } else {
    if (!file.type.startsWith("video/")) return `${file.name} is not a video.`;
    if (mb > MAX_VIDEO_MB)
      return `${file.name} is bigger than ${MAX_VIDEO_MB} MB. Post longer videos on YouTube or TikTok and paste the link instead.`;
  }
  return null;
}

export const liveSchema = z.object({
  title: z.string().trim().max(150, { message: "Keep the title under 150 characters." }),
  streamUrl: z
    .string()
    .trim()
    .min(1, { message: "Paste the live video link first." })
    .max(500, { message: "That link is too long." })
    .refine((v) => /^https?:\/\/\S+\.\S+/i.test(v), { message: "Paste the full link, starting with https://" }),
});

export type NewsPost = {
  id: string;
  createdAt: string;
  body: string;
  imagePaths: string[];
  images: string[];
  videoPath: string | null;
  videoSrc: string | null;
  videoUrl: string | null;
};

/** How long a viewing link for a photo or video stays valid. */
const LINK_SECONDS = 60 * 60 * 6;

export async function fetchNews(limit: number): Promise<NewsPost[]> {
  const { data, error } = await supabase
    .from("news_posts")
    .select("id, created_at, body, image_paths, video_path, video_url")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  const rows = data ?? [];

  const paths = rows.flatMap((r) => [...r.image_paths, ...(r.video_path ? [r.video_path] : [])]);
  const links = new Map<string, string>();
  if (paths.length) {
    const { data: signed } = await supabase.storage.from(MEDIA_BUCKET).createSignedUrls(paths, LINK_SECONDS);
    for (const s of signed ?? []) if (s.path && s.signedUrl) links.set(s.path, s.signedUrl);
  }

  return rows.map((r) => ({
    id: r.id,
    createdAt: r.created_at,
    body: r.body,
    imagePaths: r.image_paths,
    images: r.image_paths.map((p) => links.get(p)).filter((u): u is string => !!u),
    videoPath: r.video_path,
    videoSrc: r.video_path ? (links.get(r.video_path) ?? null) : null,
    videoUrl: r.video_url,
  }));
}

export const newsQuery = (limit: number) =>
  queryOptions({ queryKey: ["news", limit], queryFn: () => fetchNews(limit), staleTime: 60_000 });

export type LiveStream = { isLive: boolean; title: string; streamUrl: string; updatedAt: string | null };

export async function fetchLive(): Promise<LiveStream> {
  const { data, error } = await supabase
    .from("live_stream")
    .select("is_live, title, stream_url, updated_at")
    .eq("id", 1)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return {
    isLive: !!data?.is_live && !!data.stream_url,
    title: data?.title ?? "",
    streamUrl: data?.stream_url ?? "",
    updatedAt: data?.updated_at ?? null,
  };
}

export const liveQuery = queryOptions({
  queryKey: ["live-stream"],
  queryFn: fetchLive,
  staleTime: 30_000,
  refetchInterval: 60_000,
});
