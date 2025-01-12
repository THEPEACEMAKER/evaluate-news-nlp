const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// NLP API Configuration
const config = {
  meaningCloud: {
    apiKey: process.env.MEANINGCLOUD_API_KEY,
    apiUrl: "https://api.meaningcloud.com/sentiment-2.1",
  },
};

app.get("/", function (req, res) {
  res.send(
    "This is the server API page, you may access its services via the client app."
  );
});

// POST Route to analyze the URL
app.post("/analyze", async (req, res) => {
  const { url } = req.body;
  //   https://jamesclear.com/five-step-creative-process works fine

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  console.log("Received URL for analysis:", url);

  try {
    // documentation: https://learn.meaningcloud.com/developer/sentiment-analysis/2.1/dev-tools
    const formdata = new FormData();
    formdata.append("key", config.meaningCloud.apiKey);
    formdata.append("url", url);
    formdata.append("lang", "en");
    const response = await fetch(config.meaningCloud.apiUrl, {
      method: "POST",
      body: formdata,
    });

    const data = await response.json();

    if (data.status.code !== "0") {
      return res
        .status(500)
        .json({ error: `MeaningCloud API error: ${data.status.msg}` });
    }

    // the first three sentences
    const textSnippet =
      data.sentence_list
        ?.slice(0, 3)
        .map((sentence) => sentence.text)
        .join(" ") || "No text snippet available";

    res.status(200).json({
      polarity: data.score_tag,
      subjectivity: data.subjectivity,
      text: textSnippet,
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while analyzing the URL." });
  }
});

// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});
