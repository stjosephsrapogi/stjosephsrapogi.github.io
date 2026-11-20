import { ClientOnly, createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set a new password — St. Joseph's Rapogi staff" },
      { name: "description", content: "Choose a new password for your St. Joseph's Rapogi staff account." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Set a new password — St. Joseph's Rapogi" },
      { property: "og:description", content: "Choose a new password for your staff account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/reset-password") }],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  return (
    <section className="bg-secondary/60">
      <div className="mx-auto max-w-md px-5 py-16">
        <ClientOnly fallback={<Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />}>
          <ResetForm />
        </ClientOnly>
      </div>
    </section>
  );
}

function ResetForm() {
  const [ready, setReady] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setReady(true);
    });
    supabase.auth.getSession().then(({ data: d }) => setReady((r) => r || !!d.session));
    const t = setTimeout(() => setReady((r) => r ?? false), 4000);
    return () => {
      data.subscription.unsubscribe();
      clearTimeout(t);
    };
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirm) return setError("The two passwords don't match.");
    setBusy(true);
    const { error: err } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (err) return setError(err.message);
    setDone(true);
  }

  const card = "rounded-lg border border-border bg-card p-6 shadow-soft md:p-8";

  if (done) {
    return (
      <div className={`${card} text-center`}>
        <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
        <h1 className="mt-3 text-2xl font-semibold text-primary">Password changed</h1>
        <Button asChild className="mt-6">
          <Link to="/admin">Go to the admin page</Link>
        </Button>
      </div>
    );
  }
  if (ready === null) return <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />;
  if (!ready) {
    return (
      <div className={card}>
        <h1 className="text-2xl font-semibold text-primary">Link expired</h1>
        <p className="mt-2 text-sm text-muted-foreground">This reset link is no longer valid. Request a new one from the admin page.</p>
        <Button asChild className="mt-6">
          <Link to="/admin">Back to sign in</Link>
        </Button>
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit} noValidate className={`${card} space-y-4`}>
      <h1 className="text-2xl font-semibold text-primary">Set a new password</h1>
      <div>
        <Label htmlFor="new-password">New password</Label>
        <Input id="new-password" type="password" autoComplete="new-password" className="mt-1.5 h-11" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="confirm-password">Type it again</Label>
        <Input id="confirm-password" type="password" autoComplete="new-password" className="mt-1.5 h-11" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      </div>
      {error && <p role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
      <Button type="submit" size="lg" className="w-full" disabled={busy}>
        {busy && <Loader2 className="animate-spin" />} Save new password
      </Button>
    </form>
  );
}
