from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from preprocess import preprocess_audio, reduce_noise
from transcribe import transcribe_audio

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# @app.route('/', methods=['GET'])
# def home():
#     return jsonify({"message": "Welcome to the Speech to Text API!"})
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# logging.basicConfig(level=logging.DEBUG)

@app.route('/')
def home():
    return send_from_directory('../frontend', 'index.html')

@app.route('/api/transcribe', methods=['POST'])
def upload():

    if "audioFile" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["audioFile"]
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    try:
        # Transcribe and segment audio
        processed_file = preprocess_audio(file_path)
        processed_file = reduce_noise(processed_file)
        transcription, words = transcribe_audio(processed_file)
        return jsonify({"transcription": transcription , "words": words}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)