




// const videoMap = {
//     "hello": "assets/videos/hello.mp4" 
// };

// const alphabet = "abcdefghijklmnopqrstuvwxyz";


// alphabet.split("").forEach(letter => {
//     videoMap[letter] = `assets/videos/${letter}.mp4`;
// });


// function playWord(word, callback) {
//     const videoElement = document.getElementById("signVideo");

    
//     if (videoMap[word]) {
//         videoElement.src = videoMap[word];
//         videoElement.play();

        
//         videoElement.onended = callback;
//     } else {
        
//         const letters = word.split("");
//         let index = 0;

//         function playNext() {
//             if (index < letters.length) {
//                 const letter = letters[index];
//                 const videoPath = videoMap[letter];

//                 if (videoPath) {
//                     videoElement.src = videoPath;
//                     videoElement.play();
//                     index++;

                    
//                     videoElement.onended = playNext;
//                 } else {
//                     alert(`No video found for the character: ${letter}`);
//                     index++; 
//                     playNext(); 
//                 }
//             } else {
                
//                 callback();
//             }
//         }

//         playNext(); 
//     }
// }


// function playSequence(input) {
//     const words = input.split(/\s+/); 
//     let wordIndex = 0;

//     function playNextWord() {
//         if (wordIndex < words.length) {
//             const word = words[wordIndex];
//             wordIndex++;
//             playWord(word, playNextWord); 
//         }
//     }

//     playNextWord(); 
// }


// document.getElementById("translateButton").addEventListener("click", () => {
//     const input = document.getElementById("textInput").value.toLowerCase().trim();
//     if (/^[a-z\s]+$/.test(input)) {
//         playSequence(input); 
//     } else {
//         alert("Please enter valid words using letters A-Z and spaces only.");
//     }
// });

let lastVideoUrl = null; // Variable to store the last video URL

const videoMap = {
    "1": "assets/videos/1.mp4",
    "2": "assets/videos/2.mp4",
    "3": "assets/videos/3.mp4",
    "4": "assets/videos/4.mp4",
    "5": "assets/videos/5.mp4",
    "6": "assets/videos/6.mp4",
    "7": "assets/videos/7.mp4",
    "8": "assets/videos/8.mp4",
    "9": "assets/videos/9.mp4",
    "10": "assets/videos/10.mp4",
    "a": "assets/videos/A.mp4",
    "b": "assets/videos/B.mp4",
    "c": "assets/videos/C.mp4",
    "d": "assets/videos/D.mp4",
    "e": "assets/videos/E.mp4",
    "f": "assets/videos/F.mp4",
    "g": "assets/videos/G.mp4",
    // "h": "assets/videos/H.mp4",
    // "i": "assets/videos/I.mp4",
    // "j": "assets/videos/J.mp4",
    // "k": "assets/videos/K.mp4",
    // "l": "assets/videos/L.mp4",
    // "m": "assets/videos/M.mp4",
    // "n": "assets/videos/N.mp4",
    // "o": "assets/videos/O.mp4",
    "p": "assets/videos/P.mp4",
    "q": "assets/videos/Q.mp4",
    "r": "assets/videos/R.mp4",
    "s": "assets/videos/S.mp4",
    "t": "assets/videos/T.mp4",
    "u": "assets/videos/U.mp4",
    "v": "assets/videos/V.mp4",
    "w": "assets/videos/W.mp4",
    "x": "assets/videos/X.mp4",
    "y": "assets/videos/Y.mp4",
    "z": "assets/videos/Z.mp4" // Add the video for "bus"
    // Add other letters and words as needed
};

// Translate input into a list of videos
function getVideosFromInput(input) {
    const words = input.split(" ");
    const videoList = [];
    let displayText = "";

    words.forEach((word) => {
        if (videoMap[word]) {
            videoList.push(videoMap[word]); // Add full word video
            displayText += word + " "; // Add the word to display text
        } else {
            word.split("").forEach((letter) => {
                if (videoMap[letter]) {
                    videoList.push(videoMap[letter]); // Add letter videos
                    displayText += letter + "-"; // Add letter with dash
                }
            });
            // Remove the last dash for the current word
            if (displayText.endsWith("-")) {
                displayText = displayText.slice(0, -1);
            }
            displayText += " "; // Add space after the word
        }
    });

    return { videoList, displayText: displayText.trim() }; // Return both video list and display text
}

// Request video deletion from the server
async function deleteOldVideo(videoPath) {
    try {
        const response = await fetch("/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ videoPath }),
        });

        if (!response.ok) {
            throw new Error("Failed to delete old video");
        }

        const data = await response.json();
        console.log(data.message); // Log success message
    } catch (error) {
        console.error("Error:", error);
    }
}

// Request video stitching from the server
async function stitchVideos(videoList) {
    try {
        const response = await fetch("/stitch", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ videos: videoList }),
        });

        if (!response.ok) {
            throw new Error("Failed to stitch videos");
        }

        const data = await response.json(); // Assuming the server returns JSON
        return data.url; // Return the URL of the stitched video
    } catch (error) {
        console.error("Error:", error);
    }
}

// Play the stitched video
document.getElementById("translateButton").addEventListener("click", async () => {
    const input = document.getElementById("textInput").value.toLowerCase().trim();
    if (!input) {
        alert("Please enter some text.");
        return;
    }

    const { videoList, displayText } = getVideosFromInput(input);
    document.getElementById("displayText").innerText = displayText; // Display the formatted text
    console.log("Video List:", videoList); // Log the video list for debugging

    // Delete the old video if it exists
    if (lastVideoUrl) {
        await deleteOldVideo(lastVideoUrl);
    }

    const stitchedVideoUrl = await stitchVideos(videoList);

    if (stitchedVideoUrl) {
        const videoElement = document.getElementById("signVideo");
        videoElement.src = stitchedVideoUrl;

        // Force the video element to load the new source
        videoElement.load(); // Load the new video source
        videoElement.play(); // Play the new video

        // Update the last video URL
        lastVideoUrl = stitchedVideoUrl; // Store the new video URL
    }
});
