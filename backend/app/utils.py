import os
import uuid

TMP_DIR = "tmp"


def init_tmp():

    os.makedirs(TMP_DIR, exist_ok=True)


def save_temp_file(filename, content):

    init_tmp()

    unique_name = f"{uuid.uuid4().hex}_{filename}"

    path = os.path.join(
        TMP_DIR,
        unique_name
    )

    with open(path, "wb") as f:
        f.write(content)

    return path