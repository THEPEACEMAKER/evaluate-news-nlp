import { checkForURL } from "../src/client/js/urlChecker";

describe("checkForURL", () => {
  it("should return true for a valid URL", () => {
    expect(checkForURL("https://www.example.com")).toBe(true);
    expect(checkForURL("http://example.com")).toBe(true);
    expect(checkForURL("https://example.co.uk")).toBe(true);
    expect(checkForURL("http://192.168.0.1")).toBe(true);
  });

  it("should return false for an invalid URL", () => {
    expect(checkForURL("http:/example.com")).toBe(false);
    expect(checkForURL("https:/example")).toBe(false);
    expect(checkForURL("not-a-url")).toBe(false);
  });

  it("should return false for an empty string", () => {
    expect(checkForURL("")).toBe(false);
  });
});
