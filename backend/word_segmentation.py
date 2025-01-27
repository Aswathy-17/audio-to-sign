def segment_words(transcribed_text):
    """
    Segments the transcribed text into words.
    
    Args:
        transcribed_text (str): The text to be segmented.
        
    Returns:
        list: A list of segmented words.
    """
    # Split the text into words based on spaces and punctuation
    words = transcribed_text.split()
    return words
