/*// Generate videoMap for all alphabets and predefined words
const videoMap = {
    "hello": "assets/videos/hello.mp4" // Specific mapping for the word "hello"
};

const alphabet = "abcdefghijklmnopqrstuvwxyz";

// Add video mappings for each letter
alphabet.split("").forEach(letter => {
    videoMap[letter] = `assets/videos/${letter}.mp4`;
});

// Function to play a sequence of videos
function playSequence(input) {
    const videoElement = document.getElementById("signVideo");

    // Check if the input is a predefined word
    if (videoMap[input]) {
        videoElement.src = videoMap[input];
        videoElement.play();
        return;
    }

    // Split the input into individual letters and play each one sequentially
    const letters = input.split("");
    let index = 0;

    function playNext() {
        if (index < letters.length) {
            const letter = letters[index];
            const videoPath = videoMap[letter];

            if (videoPath) {
                videoElement.src = videoPath;
                videoElement.play();
                index++;

                // Play the next video when the current one ends
                videoElement.onended = playNext;
            } else {
                alert(`No video found for the character: ${letter}`);
                index++; // Skip to the next character
                playNext(); // Call recursively
            }
        }
    }

    playNext(); // Start the sequence
}

// Event listener for the Translate button
document.getElementById("translateButton").addEventListener("click", () => {
    const input = document.getElementById("textInput").value.toLowerCase().trim();
    if (/^[a-z]+$/.test(input)) {
        playSequence(input); // Play the sequence for the entered text
    } else {
        alert("Please enter a valid word using letters A-Z only.");
    }
}); */




const videoMap = {
    "hello": "assets/videos/hello.mp4" 
};

const alphabet = "abcdefghijklmnopqrstuvwxyz";


alphabet.split("").forEach(letter => {
    videoMap[letter] = `assets/videos/${letter}.mp4`;
});


function playWord(word, callback) {
    const videoElement = document.getElementById("signVideo");

    
    if (videoMap[word]) {
        videoElement.src = videoMap[word];
        videoElement.play();

        
        videoElement.onended = callback;
    } else {
        
        const letters = word.split("");
        let index = 0;

        function playNext() {
            if (index < letters.length) {
                const letter = letters[index];
                const videoPath = videoMap[letter];

                if (videoPath) {
                    videoElement.src = videoPath;
                    videoElement.play();
                    index++;

                    
                    videoElement.onended = playNext;
                } else {
                    alert(`No video found for the character: ${letter}`);
                    index++; 
                    playNext(); 
                }
            } else {
                
                callback();
            }
        }

        playNext(); 
    }
}


function playSequence(input) {
    const words = input.split(/\s+/); 
    let wordIndex = 0;

    function playNextWord() {
        if (wordIndex < words.length) {
            const word = words[wordIndex];
            wordIndex++;
            playWord(word, playNextWord); 
        }
    }

    playNextWord(); 
}


document.getElementById("translateButton").addEventListener("click", () => {
    const input = document.getElementById("textInput").value.toLowerCase().trim();
    if (/^[a-z\s]+$/.test(input)) {
        playSequence(input); 
    } else {
        alert("Please enter valid words using letters A-Z and spaces only.");
    }
});
