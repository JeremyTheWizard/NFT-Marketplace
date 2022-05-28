import os
from pathlib import Path
import requests
import re

PINATA_BASE_URL = "https://api.pinata.cloud/"
endpoint = "pinning/pinFileToIPFS"
headers = {
    "pinata_api_key": os.getenv("PINATA_API_KEY"),
    "pinata_secret_api_key": os.getenv("PINATA_API_SECRET"),
}
images_path = "../../frontend/src/photos/Collections"


def upload_to_pinata(path):
    print(os.getenv("PINATA_API_KEY"))
    for root, current_directory, files in os.walk(path):
        for file in files:
            file_path = os.path.join(root, file)
            if "ImageList" not in file_path:
                file_name = os.path.splitext(file_path.split("/")[-1])[0]
                print(file_name)
                with Path(file_path).open("rb") as fp:
                    image_binary = fp.read()
                    response = requests.post(
                        PINATA_BASE_URL + endpoint,
                        files={"file": (file_name, image_binary)},
                        headers=headers,
                    )
                    print(response.json())


def main():
    upload_to_pinata("../../frontend/src/photos/Collections")


if __name__ == "__main__":
    main()
