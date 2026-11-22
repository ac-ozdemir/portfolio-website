import { describe, expect, it } from "vitest";
import { gaCookieNames, parseConsent } from "./consent";

describe("parseConsent", () => {
  it("accepts the two stored values", () => {
    expect(parseConsent("granted")).toBe("granted");
    expect(parseConsent("denied")).toBe("denied");
  });

  it("treats missing or unknown values as no choice yet", () => {
    expect(parseConsent(null)).toBeNull();
    expect(parseConsent("yes")).toBeNull();
  });
});

describe("gaCookieNames", () => {
  it("picks only Google Analytics cookies", () => {
    expect(gaCookieNames("_ga=GA1.1.1; theme=x; _ga_NCYRCH2F3W=GS1; _gat=1")).toEqual([
      "_ga",
      "_ga_NCYRCH2F3W",
    ]);
  });

  it("handles an empty cookie string", () => {
    expect(gaCookieNames("")).toEqual([]);
  });
});
