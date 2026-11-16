import { describe, expect, it } from "vitest";

import { school } from "@/lib/school";

describe("school facts", () => {
  it("shows the annual national school fee the school provided", () => {
    expect(school.annualFees).toBe("KSh 53,554");
  });
  it("uses the official motto", () => {
    expect(school.motto).toBe("Sharpening for the Future");
  });
});
