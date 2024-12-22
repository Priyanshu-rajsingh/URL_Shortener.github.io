document.getElementById('shortenForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const urlInput = document.getElementById('urlInput').value;
  const resultDiv = document.getElementById('result');

  // Clear previous result
  resultDiv.innerHTML = '';

  if (!urlInput) {
    resultDiv.textContent = 'Please enter a valid URL.';
    return;
  }

  try {
    // Use the TinyURL API to shorten the URL
    const response = await fetch(`https://api.tinyurl.com/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer xT7LWrajUYx6bCqFfXkU84UmcSaXjEh3EHziVOjyngYovOP9bIDhjfeo3drb', // Replace YOUR_API_KEY with your TinyURL API key
      },
      body: JSON.stringify({ url: urlInput, domain: "tiny.one" }),
    });

    const data = await response.json();

    if (response.ok && data.data && data.data.tiny_url) {
      resultDiv.innerHTML = `Shortened URL: <a href="${data.data.tiny_url}" target="_blank">${data.data.tiny_url}</a>`;
    } else {
      // Display error message if the API returns an error
      const errorMessage = data.errors ? data.errors[0].message : 'Failed to shorten URL.';
      resultDiv.textContent = `Error: ${errorMessage}`;
    }
  } catch (error) {
    // Handle network errors or other unexpected issues
    resultDiv.textContent = 'An error occurred. Please check your internet connection and try again.';
    console.error('Error:', error);
  }
});
