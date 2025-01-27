document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("audioFile");
    const formData = new FormData();
    formData.append("audioFile", fileInput.files[0]);
  
    try {
      const response = await fetch('http://127.0.0.1:5000/api/transcribe', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      const output = document.getElementById("output");
      if (response.ok) {
        output.innerHTML = `<h3>Transcription:</h3><p>${data.transcription}</p>`;
        output.innerHTML += `<h3>Segmented Words:</h3><p>${data.words.join(", ")}</p>`;
      } else {
        output.innerText = `Error: ${data.error}`;
      }
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("output").innerText = "An error occurred.";
    }
  });