import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const accountsKey = ["staff-accounts"];

export function StaffAccess({ myId }: { myId: string }) {
  const qc = useQueryClient();
  const { data, isPending, isError } = useQuery({
    queryKey: accountsKey,
    queryFn: async () => {
      const { data: rows, error } = await supabase.rpc("list_accounts");
      if (error) throw new Error(error.message);
      return rows ?? [];
    },
  });

  async function setEditor(userId: string, on: boolean) {
    const { error } = on
      ? await supabase.from("user_roles").insert({ user_id: userId, role: "editor" })
      : await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", "editor");
    if (error) return toast.error("Couldn't change access. Please try again.");
    toast.success(on ? "Posting access given." : "Posting access removed.");
    await qc.invalidateQueries({ queryKey: accountsKey });
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        To add a teacher, ask them to open this admin page and tap <strong>Create an account</strong>. Once they've
        signed up they appear below, and you can give them posting access.
      </p>
      {isPending && <p className="text-sm text-muted-foreground">Loading accounts…</p>}
      {isError && <p className="text-sm text-destructive">Accounts couldn't load.</p>}
      <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
        {data?.map((a) => (
          <li key={a.user_id} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div className="min-w-0">
              <p className="truncate font-medium">{a.email}</p>
              <p className="text-xs text-muted-foreground">
                Joined {format(new Date(a.created_at), "d MMM yyyy")} ·{" "}
                {a.role === "admin" ? "Main admin" : a.role === "editor" ? "Can post" : "Waiting for access"}
              </p>
            </div>
            {a.role === "admin" || a.user_id === myId ? null : a.role === "editor" ? (
              <Button variant="outline" size="sm" onClick={() => setEditor(a.user_id, false)}>
                Remove access
              </Button>
            ) : (
              <Button size="sm" onClick={() => setEditor(a.user_id, true)}>
                Give posting access
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
