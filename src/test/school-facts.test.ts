import { describe, expect, it } from "vitest";

import { school } from "@/lib/school";

describe("school facts", () => {
  it("shows the annual national school fee the school provided", () => {
    expect(school.annualFees).toBe("KSh 53,554");
  });
  it("lists both official phone numbers", () => {
    expect(school.phones).toEqual(["+254 732 441252", "+254 709 841539"]);
  });
  it("uses the official school email", () => {
    expect(school.email).toBe("rapogihighschool@gmail.com");
  });
  it("uses the official motto", () => {
    expect(school.motto).toBe("Sharpening for the Future");
  });
});
