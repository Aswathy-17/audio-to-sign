import React, { useState } from "react";
import axios from "axios";

function FileUpload() {
    const [audioFile, setAudioFile] = useState(null);
    const [transcription, setTranscription] = useState("");
    const [signOutput, setSignOutput] = useState("");

    const handleFileChange = (event) => {
        setAudioFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!audioFile) return;

        const formData = new FormData();
        formData.append("audio_file", audioFile);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/transcribe`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            console.log(response.data);
            setTranscription(response.data.transcription);
            setSignOutput("Sign language output will be here.");
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div>
            <h2>Upload an Audio File for Transcription</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} required />
                <button type="submit">Transcribe</button>
            </form>
            {transcription && (
                <div>
                    <h3>Transcription:</h3>
                    <p>{transcription}</p>
                </div>
            )}
            {signOutput && (
                <div>
                    <h3>Sign Language Output:</h3>
                    <p>{signOutput}</p>
                </div>
            )}
        </div>
    );
}

export default FileUpload;
