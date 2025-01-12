function mapPolarity(code) {
  const polarityMap = {
    P: "Positive",
    N: "Negative",
    NEU: "Neutral",
    NONE: "No Sentiment",
    PN: "Mixed",
  };

  return polarityMap[code] || "Unknown";
}

export { mapPolarity };
