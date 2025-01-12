const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Variables for url and api key

app.get("/", function (req, res) {
  res.send(
    "This is the server API page, you may access its services via the client app."
  );
});

// POST Route to analyze the URL
app.post("/analyze", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  console.log("Received URL for analysis:", url);

  // Mock response
  const mockResponse = {
    polarity: "positive",
    subjectivity: "subjective",
    text: "This is a sample snippet of the article.",
  };

  res.status(200).json(mockResponse);
});

// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});
