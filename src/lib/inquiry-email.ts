import type { Inquiry } from "@/lib/inquiry";
import { school } from "@/lib/school";

/**
 * Inquiries are emailed through FormSubmit (formsubmit.co), a free relay that works
 * from the static GitHub Pages site without a school-owned domain. The first
 * submission sends a one-time activation email to the inbox below.
 */
export const inquiryEmailEndpoint = `https://formsubmit.co/ajax/${school.inquiryEmail}`;

/** Builds the email FormSubmit sends to the school for one inquiry. */
export function inquiryEmailPayload(i: Inquiry) {
  return {
    _subject: `New admissions inquiry — ${i.studentName} (${i.grade})`,
    _template: "table",
    _captcha: "false",
    ...(i.email ? { _replyto: i.email } : {}),
    "Parent / guardian": i.parentName,
    Phone: i.phone,
    Email: i.email ?? "Not given",
    Student: i.studentName,
    Grade: i.grade,
    "Current school": i.currentSchool ?? "Not given",
    Question: i.message,
  };
}

/** Emails one inquiry to the school. Resolves true when FormSubmit accepted it. */
export async function emailInquiry(i: Inquiry): Promise<boolean> {
  try {
    const res = await fetch(inquiryEmailEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(inquiryEmailPayload(i)),
    });
    const body = (await res.json().catch(() => null)) as { success?: string | boolean; message?: string } | null;
    const ok = res.ok && String(body?.success) === "true";
    if (!ok) console.error("Inquiry email not sent", body?.message ?? res.status);
    return ok;
  } catch (error) {
    console.error("Inquiry email not sent", error);
    return false;
  }
}
