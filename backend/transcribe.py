import whisper
from word_segmentation import segment_words

def transcribe_audio(file_path):
    model = whisper.load_model("base")  # Load Whisper model
    result = model.transcribe(file_path)
    transcription = result["text"]

    # # Word segmentation based on timestamps
    # segments = []
    # for segment in result["segments"]:
    #     segments.append({
    #         "start": segment["start"],  # Start time in seconds
    #         "end": segment["end"],      # End time in seconds
    #         "text": segment["text"]     # Transcription text
    #     })

    words = segment_words(transcription)

    return transcription, words