import { describe, expect, it } from "vitest";

import { inquirySchema, toInquiryRow } from "@/lib/inquiry";

const valid = {
  parentName: "Jane Achieng",
  phone: "0712 345678",
  email: "",
  studentName: "Brian Otieno",
  grade: "Grade 10",
  currentSchool: "",
  message: "When is the reporting date for Grade 10?",
};

describe("admissions inquiry form", () => {
  it("accepts a parent who leaves email and current school empty", () => {
    const r = inquirySchema.parse(valid);
    expect(toInquiryRow(r)).toMatchObject({ email: null, current_school: null, grade: "Grade 10" });
  });
  it("requires a phone number so the school can call back", () => {
    expect(inquirySchema.safeParse({ ...valid, phone: "" }).success).toBe(false);
  });
  it("rejects an invalid email address", () => {
    expect(inquirySchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
  });
  it("only allows the Senior School grades (10–12) or not sure", () => {
    expect(inquirySchema.safeParse({ ...valid, grade: "Grade 9" }).success).toBe(false);
    expect(inquirySchema.safeParse({ ...valid, grade: "Not sure yet" }).success).toBe(true);
  });
  it("limits the question to 1,500 characters", () => {
    expect(inquirySchema.safeParse({ ...valid, message: "a".repeat(1501) }).success).toBe(false);
  });
});
