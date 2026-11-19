import { describe, expect, it } from "vitest";

import { inquirySchema } from "@/lib/inquiry";
import { inquiryEmailEndpoint, inquiryEmailPayload } from "@/lib/inquiry-email";

const inquiry = inquirySchema.parse({
  parentName: "Jane Achieng",
  phone: "0712 345678",
  email: "Jane@Example.com",
  studentName: "Brian Otieno",
  grade: "Grade 10",
  currentSchool: "",
  message: "When is the reporting date for Grade 10?",
});

describe("admissions inquiry email", () => {
  it("is sent to the school's inquiry inbox stjosephsschoolrapogi@gmail.com", () => {
    expect(inquiryEmailEndpoint).toBe("https://formsubmit.co/ajax/stjosephsschoolrapogi@gmail.com");
  });
  it("lets the office reply straight to the parent's email", () => {
    expect(inquiryEmailPayload(inquiry)._replyto).toBe("jane@example.com");
  });
  it("includes the parent's phone number and question", () => {
    const p = inquiryEmailPayload(inquiry);
    expect(p.Phone).toBe("0712 345678");
    expect(p.Question).toBe("When is the reporting date for Grade 10?");
  });
});
