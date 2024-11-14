import whisper

# Load the Whisper model
model = whisper.load_model("large")

def transcribe_audio(file_path):
    print(f"Transcribing audio file: {file_path}")
    """Transcribes an audio file to text using Whisper."""
    result = model.transcribe(file_path)
    transcription = result["text"]
    print(f"Transcription result: {transcription}")  # Debugging line
    return transcription    


if __name__ == "__main__":
    audio_file_path = "C:/Users/Aswathy/Downloads/common_voice_en_40865211.mp3"  # Change this to your audio file path
    transcribe_audio(audio_file_path)