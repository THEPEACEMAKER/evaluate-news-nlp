import { checkForURL } from "./urlChecker";

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

    // Update the UI with the results
    updateUI(data);
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again later.");
  }
}

function updateUI(data) {
  document.getElementById("polarity").textContent = data.polarity;
  document.getElementById("subjectivity").textContent = data.subjectivity;
  document.getElementById("textSnippet").textContent = data.text;
}

// Export the handleSubmit function
export { handleSubmit };
