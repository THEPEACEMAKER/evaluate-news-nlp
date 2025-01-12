import { mapPolarity } from "../src/client/js/polarityMapper";

describe("mapPolarity", () => {
  it("should return 'Positive' for 'P'", () => {
    expect(mapPolarity("P")).toBe("Positive");
  });

  it("should return 'Negative' for 'N'", () => {
    expect(mapPolarity("N")).toBe("Negative");
  });

  it("should return 'Neutral' for 'NEU'", () => {
    expect(mapPolarity("NEU")).toBe("Neutral");
  });

  it("should return 'No Sentiment' for 'NONE'", () => {
    expect(mapPolarity("NONE")).toBe("No Sentiment");
  });

  it("should return 'Mixed' for 'PN'", () => {
    expect(mapPolarity("PN")).toBe("Mixed");
  });

  it("should return 'Unknown' for unrecognized codes", () => {
    expect(mapPolarity("XYZ")).toBe("Unknown");
  });
});
