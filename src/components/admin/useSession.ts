import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";

/** Current sign-in for the admin area: undefined while checking, null when signed out. */
export function useSession() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, s) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED" || event === "INITIAL_SESSION") setSession(s);
    });
    supabase.auth.getSession().then(({ data: d }) => setSession(d.session));
    return () => data.subscription.unsubscribe();
  }, []);
  return session;
}

/** Where emailed sign-in links should land, on whichever site address is in use. */
export const siteLink = (path: string) => `${window.location.origin}${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
