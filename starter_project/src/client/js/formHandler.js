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

    console.log("Request was successful! Data received:", data);
    // Update the UI with the results
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again later.");
  }
}

// Export the handleSubmit function
export { handleSubmit };
