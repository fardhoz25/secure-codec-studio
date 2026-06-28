import os
import time
import struct

from PIL import Image

from app.algorithms.image.rle import (
    rle_encode,
    rle_decode,
    compression_ratio,
)

from app.algorithms.image.lsb import (
    encode_lsb,
    decode_lsb,
)


def process_image(path, mode, message=None):

    if mode == "compress":
        return compress(path)

    elif mode == "decompress":
        return decompress(path)

    elif mode == "stego":
        return stego(path, message)

    elif mode == "extract":
        return extract(path)

    raise ValueError("Processing failed")


def compress(path):

    start = time.time()

    image = Image.open(path).convert("RGB")

    width, height = image.size
    channels = len(image.getbands())

    pixel_bytes = image.tobytes()

    encoded = rle_encode(pixel_bytes)

    filename = os.path.splitext(os.path.basename(path))[0]

    output_path = os.path.join(
        os.path.dirname(path),
        f"{filename}.rle"
    )

    with open(output_path, "wb") as f:

        f.write(struct.pack(">I", width))
        f.write(struct.pack(">I", height))
        f.write(struct.pack("B", channels))
        f.write(encoded)

    original_size = os.path.getsize(path)
    processed_size = os.path.getsize(output_path)

    return {
        "status": "success",
        "media_type": "image",
        "original_size": original_size,
        "processed_size": processed_size,
        "compression_ratio": compression_ratio(
            original_size,
            processed_size
        ),
        "processing_time_ms": int((time.time() - start) * 1000),
        "message": "Image compressed successfully",
        "output_path": output_path
    }


def decompress(path):

    start = time.time()

    with open(path, "rb") as f:

        width = struct.unpack(">I", f.read(4))[0]
        height = struct.unpack(">I", f.read(4))[0]
        channels = struct.unpack("B", f.read(1))[0]

        encoded = f.read()

    decoded = rle_decode(encoded)

    mode_map = {
        1: "L",
        3: "RGB",
        4: "RGBA"
    }

    if channels not in mode_map:
        raise ValueError("Unsupported image format")

    image = Image.frombytes(
        mode_map[channels],
        (width, height),
        decoded
    )

    filename = os.path.splitext(os.path.basename(path))[0]

    output_path = os.path.join(
        os.path.dirname(path),
        f"{filename}_restored.png"
    )

    image.save(output_path)

    original_size = os.path.getsize(path)
    processed_size = os.path.getsize(output_path)

    return {
        "status": "success",
        "media_type": "image",
        "original_size": original_size,
        "processed_size": processed_size,
        "compression_ratio": compression_ratio(
            processed_size,
            original_size
        ),
        "processing_time_ms": int((time.time() - start) * 1000),
        "message": "Image decompressed successfully",
        "output_path": output_path
        
    }


def stego(path, message):

    if not message:
        raise ValueError("Message is required")

    start = time.time()

    filename = os.path.splitext(os.path.basename(path))[0]

    output_path = os.path.join(
        os.path.dirname(path),
        f"{filename}_stego.png"
    )

    encode_lsb(
        path,
        output_path,
        message
    )

    original_size = os.path.getsize(path)
    processed_size = os.path.getsize(output_path)

    return {
        "status": "success",
        "media_type": "image",
        "original_size": original_size,
        "processed_size": processed_size,
        "compression_ratio": compression_ratio(
            original_size,
            processed_size
        ),
        "processing_time_ms": int((time.time() - start) * 1000),
        "message": "Hidden message embedded successfully",
        "output_path": output_path
    }


def extract(path):

    start = time.time()

    message = decode_lsb(path)

    original_size = os.path.getsize(path)

    return {
        "status": "success",
        "media_type": "image",
        "original_size": original_size,
        "processed_size": original_size,
        "compression_ratio": 1.0,
        "processing_time_ms": int((time.time() - start) * 1000),
        "message": message,
        "output_path": None
    }