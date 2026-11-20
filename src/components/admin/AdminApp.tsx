import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Loader2, LogOut } from "lucide-react";

import { AuthPanel } from "@/components/admin/AuthPanel";
import { LiveControl } from "@/components/admin/LiveControl";
import { ManagePosts } from "@/components/admin/ManagePosts";
import { NewPostForm } from "@/components/admin/NewPostForm";
import { StaffAccess } from "@/components/admin/StaffAccess";
import { useSession } from "@/components/admin/useSession";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

export function AdminApp() {
  const session = useSession();
  const qc = useQueryClient();
  const userId = session?.user.id;

  const roles = useQuery({
    queryKey: ["my-roles", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId!);
      if (error) throw new Error(error.message);
      return data.map((r) => r.role);
    },
  });

  async function signOut() {
    await qc.cancelQueries();
    qc.removeQueries({ queryKey: ["my-roles"] });
    qc.removeQueries({ queryKey: ["staff-accounts"] });
    await supabase.auth.signOut();
  }

  if (session === undefined || (userId && roles.isPending)) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading" />
      </div>
    );
  }
  if (!session) return <AuthPanel />;

  const isAdmin = roles.data?.includes("admin") ?? false;
  const isStaff = isAdmin || (roles.data?.includes("editor") ?? false);

  const bar = (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm">
      <span className="min-w-0 truncate">
        Signed in as <strong>{session.user.email}</strong>
        {isAdmin ? " · Main admin" : isStaff ? " · Staff" : ""}
      </span>
      <Button variant="ghost" size="sm" onClick={signOut}>
        <LogOut /> Sign out
      </Button>
    </div>
  );

  if (!isStaff) {
    return (
      <div className="mx-auto max-w-xl">
        {bar}
        <div className="rounded-lg border border-border bg-card p-8 text-center shadow-soft">
          <h2 className="text-2xl font-semibold text-primary">Waiting for access</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Your account is ready. Ask the school's main admin to give you posting access, then check again.
          </p>
          <Button className="mt-6" variant="outline" onClick={() => roles.refetch()}>
            Check again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {bar}
      <Tabs defaultValue="post">
        <TabsList className={`grid h-auto w-full ${isAdmin ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"}`}>
          <TabsTrigger value="post">New post</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="live">Live stream</TabsTrigger>
          {isAdmin && <TabsTrigger value="staff">Staff</TabsTrigger>}
        </TabsList>
        <TabsContent value="post" className="mt-6">
          <NewPostForm userId={session.user.id} />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Posts appear on the{" "}
            <Link to="/news" className="font-semibold text-primary underline">
              News page
            </Link>{" "}
            and the Home page.
          </p>
        </TabsContent>
        <TabsContent value="posts" className="mt-6">
          <ManagePosts />
        </TabsContent>
        <TabsContent value="live" className="mt-6">
          <LiveControl />
        </TabsContent>
        {isAdmin && (
          <TabsContent value="staff" className="mt-6">
            <StaffAccess myId={session.user.id} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
