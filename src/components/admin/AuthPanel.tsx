import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";

import { siteLink } from "@/components/admin/useSession";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

type Mode = "signin" | "signup" | "forgot";

export function AuthPanel() {
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setNotice("");
    const addr = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(addr)) return setError("Enter a valid email address.");
    if (mode !== "forgot" && password.length < 8) return setError("Password must be at least 8 characters.");
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error: err } = await supabase.auth.signInWithPassword({ email: addr, password });
        if (err) setError(err.message.includes("not confirmed") ? "Please confirm your email first — check your inbox." : "Wrong email or password.");
      } else if (mode === "signup") {
        const { error: err } = await supabase.auth.signUp({
          email: addr,
          password,
          options: { emailRedirectTo: siteLink("/admin") },
        });
        if (err) setError(err.message);
        else setNotice("Account created. Check your email and click the confirmation link, then sign in here.");
      } else {
        const { error: err } = await supabase.auth.resetPasswordForEmail(addr, { redirectTo: siteLink("/reset-password") });
        if (err) setError(err.message);
        else setNotice("If that email has an account, a reset link is on its way.");
      }
    } finally {
      setBusy(false);
    }
  }

  const title = mode === "signin" ? "Staff sign in" : mode === "signup" ? "Create a staff account" : "Reset your password";

  return (
    <div className="mx-auto max-w-md rounded-lg border border-border bg-card p-6 shadow-soft md:p-8">
      <h2 className="text-2xl font-semibold text-primary">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {mode === "signup"
          ? "After you confirm your email, the school admin gives you posting access."
          : "For school staff who post news and live streams."}
      </p>
      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
        <div>
          <Label htmlFor="auth-email">Email</Label>
          <Input id="auth-email" type="email" autoComplete="email" className="mt-1.5 h-11" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        {mode !== "forgot" && (
          <div>
            <Label htmlFor="auth-password">Password</Label>
            <Input
              id="auth-password"
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              className="mt-1.5 h-11"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        {error && <p role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
        {notice && <p role="status" className="rounded-md bg-secondary p-3 text-sm text-primary">{notice}</p>}
        <Button type="submit" size="lg" className="w-full" disabled={busy}>
          {busy && <Loader2 className="animate-spin" />}
          {mode === "signin" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"}
        </Button>
      </form>
      <div className="mt-5 flex flex-col gap-2 text-sm">
        {mode !== "signin" && (
          <button type="button" className="text-left text-primary underline" onClick={() => setMode("signin")}>
            Back to sign in
          </button>
        )}
        {mode === "signin" && (
          <>
            <button type="button" className="text-left text-primary underline" onClick={() => setMode("signup")}>
              New staff member? Create an account
            </button>
            <button type="button" className="text-left text-muted-foreground underline" onClick={() => setMode("forgot")}>
              Forgot password?
            </button>
          </>
        )}
      </div>
    </div>
  );
}
