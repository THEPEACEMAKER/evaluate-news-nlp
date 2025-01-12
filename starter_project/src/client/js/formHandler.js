import { checkForURL } from "./urlChecker";

const serverURL = "http://localhost:8000/api";

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

  // Send the URL to the server
}

// Export the handleSubmit function
export { handleSubmit };
