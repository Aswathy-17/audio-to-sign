from flask import Flask, request, jsonify
from flask_cors import CORS
from scripts.transcribe import transcribe_audio
from scripts.preprocess import preprocess_audio, reduce_noise, remove_silence
from scripts.text_to_sign import convert_text_to_sign
import os

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'audio'
TRANSCRIPT_FOLDER = 'transcriptions'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/api/transcribe", methods=["POST"])
def transcribe():
    if "audio_file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    audio_file = request.files["audio_file"]
    raw_file_path = os.path.join(app.config['UPLOAD_FOLDER'], audio_file.filename)
    audio_file.save(raw_file_path)

    print("File saved:", raw_file_path)

    # Preprocessing steps
    print(f"Preprocessing audio file: {raw_file_path}")
    
    processed_file = preprocess_audio(raw_file_path)
    processed_file = reduce_noise(processed_file)
    processed_file = remove_silence(processed_file)
    print("Processed file path:", processed_file)

    # Transcription
    print(f"Processing audio file for transcription: {processed_file}")
    transcription_text = transcribe_audio(processed_file)
    print("Transcription:", transcription_text)

    transcription_file_path = os.path.join("transcriptions", "transcription.txt")
    try:
        with open(transcription_file_path, "w") as f:
            f.write(transcription_text)
    except Exception as e:
        print(f"Error saving transcription file: {e}")
    # Future text-to-sign conversion
    sign_output = convert_text_to_sign(transcription_text)

    return jsonify({"transcription": transcription_text, "sign_output": sign_output})

if __name__ == "__main__":
    app.run(debug=True)
