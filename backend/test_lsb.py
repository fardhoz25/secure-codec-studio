from app.algorithms.image.lsb import encode_lsb
from app.algorithms.image.lsb import decode_lsb

INPUT = "samples/test.png"
OUTPUT = "samples/test_stego.png"

encode_lsb(
    INPUT,
    OUTPUT,
    "Hello Secure Multimedia Codec Studio!"
)

message = decode_lsb(OUTPUT)

print(message)