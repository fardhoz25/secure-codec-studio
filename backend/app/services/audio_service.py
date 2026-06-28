import os
import time
import struct


from app.algorithms.audio.delta import (
    read_wav,
    write_wav,
    delta_encode,
    delta_decode,
    compression_ratio,
)

from app.algorithms.audio.rle import (
    rle_encode,
    rle_decode,
)


def process_audio(path, mode, message=None):

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

    sample_rate, channels, samples = read_wav(path)

    delta_data = delta_encode(samples)

    encoded = rle_encode(delta_data)

    filename = os.path.splitext(
        os.path.basename(path)
    )[0]

    output_path = os.path.join(
        os.path.dirname(path),
        f"{filename}.delta"
    )


    with open(output_path, "wb") as f:

            # Header
            f.write(struct.pack("B", channels))
            f.write(struct.pack("B", 2))  # sample width = 16-bit
            f.write(struct.pack("<I", sample_rate))
            f.write(struct.pack("<I", len(samples)))

            # Compressed data
            f.write(encoded)

    # TODO
    # write_delta(
    #     output_path,
    #     sample_rate,
    #     channels,
    #     encoded
    # )

    original_size = os.path.getsize(path)

    processed_size = original_size

    return {
        "status": "success",
        "media_type": "audio",
        "original_size": original_size,
        "processed_size": processed_size,
        "compression_ratio": 1.0,
        "processing_time_ms": int(
            (time.time() - start) * 1000
        ),
        "message": "Audio compressed successfully",
        "output_path": output_path
    }


def decompress(path):

    start = time.time()

    with open(path, "rb") as f:

        channels = struct.unpack("B", f.read(1))[0]
        sample_width = struct.unpack("B", f.read(1))[0]
        sample_rate = struct.unpack("<I", f.read(4))[0]
        sample_count = struct.unpack("<I", f.read(4))[0]

        encoded = f.read()

    delta_data = rle_decode(encoded)

    samples = delta_decode(delta_data)

    if len(samples) != sample_count:
        raise ValueError("Processing failed")

    # TODO
    # sample_rate
    # channels
    # encoded
    # = read_delta(path)

    # samples = delta_decode(encoded)

    filename = os.path.splitext(
        os.path.basename(path)
    )[0]

    output_path = os.path.join(
        os.path.dirname(path),
        f"{filename}_restored.wav"
    )

    write_wav(
        output_path,
        sample_rate,
        sample_width,
        channels,
        samples
    )


    # TODO
    # write_wav(
    #     output_path,
    #     sample_rate,
    #     channels,
    #     samples
    # )

    original_size = os.path.getsize(path)

    processed_size = original_size

    return {
        "status": "success",
        "media_type": "audio",
        "original_size": original_size,
        "processed_size": processed_size,
        "compression_ratio": 1.0,
        "processing_time_ms": int(
            (time.time() - start) * 1000
        ),
        "message": "Audio decompressed successfully",
        "output_path": output_path
    }


def stego(path, message):

    raise NotImplementedError()


def extract(path):

    raise NotImplementedError()