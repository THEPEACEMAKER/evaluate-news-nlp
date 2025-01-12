import { checkForURL } from "./urlChecker";
import { mapPolarity } from "./polarityMapper";

const serverURL = "http://localhost:8000/analyze";

const form = document.getElementById("urlForm");
form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  // Get the URL from the input field
  const url = document.getElementById("url").value;

  // Validate the URL
  if (!checkForURL(url)) {
    alert("Please enter a valid URL!");
    return;
  }

  console.log("::: Form Submitted :::");

  try {
    // Send the URL to the server
    const response = await fetch(serverURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch analysis from the server.");
    }

    const data = await response.json();

    // Process data before updating the UI
    const processedData = {
      polarity: mapPolarity(data.polarity),
      subjectivity: data.subjectivity,
      textSnippet: data.text,
    };

    // Update the UI with processed data
    updateUI(processedData);
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again later.");
  }
}

function updateUI({ polarity, subjectivity, textSnippet }) {
  document.getElementById("polarity").textContent = polarity;
  document.getElementById("subjectivity").textContent = subjectivity;
  document.getElementById("textSnippet").textContent = textSnippet;
}

// Export the handleSubmit function
export { handleSubmit };
