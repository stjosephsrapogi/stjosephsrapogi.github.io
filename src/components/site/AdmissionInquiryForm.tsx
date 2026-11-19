import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { gradeOptions, inquirySchema, toInquiryRow, type InquiryInput } from "@/lib/inquiry";
import { emailInquiry } from "@/lib/inquiry-email";
import { school } from "@/lib/school";

const empty: InquiryInput = {
  parentName: "",
  phone: "",
  email: "",
  studentName: "",
  grade: "Grade 10",
  currentSchool: "",
  message: "",
};

type Errors = Partial<Record<keyof InquiryInput, string>>;

export function AdmissionInquiryForm() {
  const [values, setValues] = useState<InquiryInput>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [website, setWebsite] = useState(""); // hidden spam trap

  const set = (key: keyof InquiryInput) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const parsed = inquirySchema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof InquiryInput;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setStatus("sending");
    if (website) {
      // Bots fill the hidden field; pretend success without saving.
      setStatus("sent");
      return;
    }
    // Save a copy and email the office at the same time; either one reaching the school is enough.
    const [saved, emailed] = await Promise.all([
      supabase
        .from("admission_inquiries")
        .insert(toInquiryRow(parsed.data))
        .then(({ error }) => {
          if (error) console.error("Inquiry not saved", error.message);
          return !error;
        }),
      emailInquiry(parsed.data),
    ]);
    if (!saved && !emailed) {
      setStatus("failed");
      return;
    }
    setStatus("sent");
    setValues(empty);
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-lg border border-border bg-card p-8 text-center shadow-soft">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h3 className="mt-4 text-2xl font-semibold text-primary">Thank you — inquiry received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          The admissions office has your details and will get back to you. For anything urgent, call{" "}
          <a className="font-semibold text-primary underline" href={`tel:${school.phones[0].replace(/\s/g, "")}`}>
            {school.phones[0]}
          </a>
          .
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          Send another inquiry
        </Button>
      </div>
    );
  }

  const field = (key: keyof InquiryInput) => ({
    id: `inq-${key}`,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `inq-${key}-error` : undefined,
  });
  const err = (key: keyof InquiryInput) =>
    errors[key] ? (
      <p id={`inq-${key}-error`} className="mt-1.5 text-xs font-medium text-destructive">
        {errors[key]}
      </p>
    ) : null;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-lg border border-border bg-card p-6 shadow-soft md:p-8"
      aria-label="Admissions inquiry form"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="inq-parentName">Parent / guardian name *</Label>
          <Input
            {...field("parentName")}
            className="mt-1.5 h-11"
            autoComplete="name"
            value={values.parentName}
            onChange={(e) => set("parentName")(e.target.value)}
          />
          {err("parentName")}
        </div>
        <div>
          <Label htmlFor="inq-phone">Phone number *</Label>
          <Input
            {...field("phone")}
            type="tel"
            className="mt-1.5 h-11"
            autoComplete="tel"
            placeholder="e.g. 0712 345678"
            value={values.phone}
            onChange={(e) => set("phone")(e.target.value)}
          />
          {err("phone")}
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="inq-email">Email (optional)</Label>
          <Input
            {...field("email")}
            type="email"
            className="mt-1.5 h-11"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email")(e.target.value)}
          />
          {err("email")}
        </div>
        <div>
          <Label htmlFor="inq-studentName">Student's name *</Label>
          <Input
            {...field("studentName")}
            className="mt-1.5 h-11"
            value={values.studentName}
            onChange={(e) => set("studentName")(e.target.value)}
          />
          {err("studentName")}
        </div>
        <div>
          <Label htmlFor="inq-grade">Joining which grade? *</Label>
          <select
            {...field("grade")}
            className="mt-1.5 flex h-11 w-full rounded-md border border-input bg-transparent px-3 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
            value={values.grade}
            onChange={(e) => set("grade")(e.target.value)}
          >
            {gradeOptions.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {err("grade")}
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="inq-currentSchool">Current school (optional)</Label>
          <Input
            {...field("currentSchool")}
            className="mt-1.5 h-11"
            value={values.currentSchool}
            onChange={(e) => set("currentSchool")(e.target.value)}
          />
          {err("currentSchool")}
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="inq-message">Your question *</Label>
          <Textarea
            {...field("message")}
            className="mt-1.5 min-h-32"
            placeholder="Ask about placement, reporting dates, fees, boarding…"
            maxLength={1500}
            value={values.message}
            onChange={(e) => set("message")(e.target.value)}
          />
          {err("message")}
        </div>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="inq-website">Website</label>
          <input
            id="inq-website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
      </div>

      {status === "failed" && (
        <p role="alert" className="mt-5 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          Sorry, your inquiry could not be sent. Please try again, or call {school.phones[0]}.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          We only use these details to reply to your inquiry.
        </p>
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? <Loader2 className="animate-spin" /> : <Send />}
          {status === "sending" ? "Sending…" : "Send inquiry"}
        </Button>
      </div>
    </form>
  );
}
