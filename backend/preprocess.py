from pydub import AudioSegment
import noisereduce as nr
import librosa
import soundfile as sf

def preprocess_audio(file_path, output_path="uploads/processed_audio.wav"):
    """Convert to mono and set sample rate to 16kHz."""
    audio = AudioSegment.from_file(file_path, format="mp3")
    audio = audio.set_channels(1)  # Convert to mono
    audio = audio.set_frame_rate(16000)  # Standardize sample rate
    audio.export(output_path, format="mp3")
    return output_path

def reduce_noise(file_path, output_path="uploads/denoised_audio.wav"):
    """Reduce background noise in the audio file."""
    y, sr = librosa.load(file_path, sr=None)
    reduced_noise = nr.reduce_noise(y=y, sr=sr)
    sf.write(output_path, reduced_noise, sr)
    return output_path

# def remove_silence(file_path, output_path="audio/no_silence.wav"):
#     """Remove silence from the audio file."""
#     audio = AudioSegment.from_file(file_path)
#     chunks = [chunk for chunk in audio if chunk.dBFS > -40]
#     processed_audio = sum(chunks)
#     processed_audio.export(output_path, format="wav")
#     return output_path
