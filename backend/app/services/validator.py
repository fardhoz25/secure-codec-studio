import os

IMAGE_EXT = [".png", ".jpg", ".jpeg", ".bmp"]
AUDIO_EXT = [".wav"]
VIDEO_EXT = [".mp4", ".avi", ".mov"]
RLE_EXT = [".rle"]
DELTA_EXT = [".delta"]

LIMITS = {
    "image": 5 * 1024 * 1024,
    "audio": 10 * 1024 * 1024,
    "video": 20 * 1024 * 1024
}


def detect_media(filename: str):
    ext = os.path.splitext(filename)[1].lower()

    if ext in IMAGE_EXT or ext in RLE_EXT:
        return "image"

    if ext in AUDIO_EXT or ext in DELTA_EXT:
        return "audio"

    if ext in VIDEO_EXT:
        return "video"
    
    

    return None


def validate_size(media_type, size):

    if media_type is None:
        raise ValueError("Unsupported file type")

    if size > LIMITS[media_type]:
        raise ValueError("File size exceeded limit")