import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { NewsPostCard } from "@/components/news/NewsPostCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { MEDIA_BUCKET, newsQuery, type NewsPost } from "@/lib/news";

export function ManagePosts() {
  const qc = useQueryClient();
  const { data, isPending } = useQuery(newsQuery(50));

  async function remove(post: NewsPost) {
    const { error } = await supabase.from("news_posts").delete().eq("id", post.id);
    if (error) {
      toast.error("That post couldn't be deleted.");
      return;
    }
    const files = [...post.imagePaths, ...(post.videoPath ? [post.videoPath] : [])];
    if (files.length) await supabase.storage.from(MEDIA_BUCKET).remove(files);
    toast.success("Post deleted.");
    await qc.invalidateQueries({ queryKey: ["news"] });
  }

  if (isPending) return <p className="text-sm text-muted-foreground">Loading posts…</p>;
  if (!data?.length)
    return (
      <p className="rounded-lg border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
        No posts yet. Your first post will show here.
      </p>
    );

  return (
    <div className="space-y-6">
      {data.map((post) => (
        <NewsPostCard
          key={post.id}
          post={post}
          actions={
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Delete post">
                  <Trash2 className="text-destructive" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this post?</AlertDialogTitle>
                  <AlertDialogDescription>It will disappear from the website, along with its photos and video.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep it</AlertDialogCancel>
                  <AlertDialogAction onClick={() => remove(post)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          }
        />
      ))}
    </div>
  );
}
