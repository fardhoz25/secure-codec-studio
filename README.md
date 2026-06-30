# Secure Multimedia Codec Studio

A full-stack web application for demonstrating **lossless multimedia compression** and **steganography** algorithms on digital media. This project is developed using a Single Page Application (SPA) architecture with **Next.js** as the frontend and **FastAPI** as the backend.

---
## Overview

Secure Multimedia Codec Studio is a full-stack web application for demonstrating multimedia compression and steganography techniques on digital media.

The application supports both **Lossless Compression** and **Lossy Compression**, allowing users to understand the fundamental differences between reversible and irreversible compression methods through an interactive web interface.

Current capabilities include image compression, decompression, steganography, and hidden message extraction, while audio and video modules are being developed incrementally.

---

## 📸 Application Gallery

| 1️⃣ Main User Interface | 2️⃣ Integrated Media Player |
| :---: | :---: |
| <!-- PASTE SCREENSHOT 1 HERE --> | <!-- PASTE SCREENSHOT 2 HERE --> |
| **Clean & Responsive UI**: The main dashboard featuring a dark-themed dropzone and mode selection. | **Media Preview**: Built-in player to instantly render and playback processed Video, Audio, and Images. |

| 3️⃣ Lossless Compression Analytics | 4️⃣ Lossy Compression Analytics |
| :---: | :---: |
| <!-- PASTE SCREENSHOT 3 HERE --> | <!-- PASTE SCREENSHOT 4 HERE --> |
| **Data Preservation**: Results showing exact original data retention using the Zlib algorithm. | **Size Optimization**: Results demonstrating massive file size reduction and PSNR/MSE quality metrics. |

| 5️⃣ Steganography (Hide Message) | 6️⃣ Steganography (Extract Message) |
| :---: | :---: |
| <!-- PASTE SCREENSHOT 5 HERE --> | <!-- PASTE SCREENSHOT 6 HERE --> |
| **Secure Embedding**: Hiding a secret text message inside a media file via LSB. | **Data Extraction**: Successfully extracting and reading the hidden secret text from a stego file. |

---

# Features

## Compression Types

### Lossless Compression

Lossless compression preserves all original information, allowing the compressed media to be fully restored.

Characteristics:

- Original data can be recovered completely
- Supports decompression
- Suitable for archival and editing
- Uses Zlib Compression Algorithm

---

### Lossy Compression

Lossy compression permanently removes part of the original information to achieve a higher compression ratio.

Characteristics:

- Original data cannot be perfectly restored
- Decompression is not supported
- Optimized for storage efficiency
- Suitable for multimedia distribution

## Image

### Lossless Compression

- Zlib Algorithm
- Supports Decompression

### Lossy Compression

- Quality Reduction Compression
- Smaller output size
- Decompression is not available

### Steganography

- Least Significant Bit (LSB)
- Hide Secret Message
- Extract Secret Message

### Audio 

- Zlib Algorithm (Lossless)
- FFmpeg libmp3lame (Lossy)
- LSB Steganography

Supported Formats

- WAV, MP3, OGG, M4A, AAC, FLAC

---

### Video 

- Zlib Algorithm (Lossless)
- FFmpeg H.264 / libx264 (Lossy)
- LSB with FFV1 Codec (Steganography)

Supported Formats

- MP4, AVI, MOV, MKV

---

# Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide Icons

---

## Backend

- FastAPI
- Python
- OpenCV
- FFmpeg (FFV1, H.264)
- Zlib

---

## Storage

All processed files are temporarily stored inside:

```

backend/tmp/

```

Temporary files are only used during processing.

---

# Compression Concepts

Secure Multimedia Codec Studio demonstrates two major categories of multimedia compression.

| Feature | Lossless | Lossy |
|----------|----------|--------|
| Original Data Preserved | ✅ | ❌ |
| Can Be Decompressed | ✅ | ❌ |
| Information Loss | No | Yes |
| Compression Ratio | Moderate | High |
| Suitable For | Editing, Archiving | Distribution, Streaming |

This comparison helps users understand the practical trade-offs between preserving data integrity and achieving higher compression efficiency.

# Project Architecture

```

Secure-Codec-Studio
│
├── app/
│
├── components/
│   ├── ActionPanel.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── UploadDropzone.tsx
│   ├── ModeSelector.tsx
│   ├── ResultCards.tsx
│   └── MediaPreview.tsx
│
├── hooks/
│
├── lib/
│   ├── api.ts
│   └── utils.ts
│
├── backend/
│   ├── app/
│   │
│   ├── algorithms/
│   │   ├── image/
│   │   ├── audio/
│   │   └── video/
│   │
│   ├── services/
│   │
│   ├── routes.py
│   ├── schemas.py
│   ├── utils.py
│   │
│   └── tmp/
│
└── README.md

```

---

# Backend Architecture

The backend follows a simple layered architecture.

```

Client
│
▼

routes.py

│

▼

validator.py

│

▼

service

│

▼

algorithm

│

▼

response

```

Business logic is placed inside **services**, while algorithms are isolated inside the **algorithms** directory.

---

## Compression Workflow

```text
                    Upload Image
                         │
                         ▼
          Select Compression Method
                         │
             ┌───────────┴───────────┐
             │                       │
             ▼                       ▼
      Lossless Compression     Lossy Compression
             │                       │
             ▼                       ▼
        Zlib Algorithm         Quality Reduction
             │                       │
             ▼                       ▼
    Codec File (.lossless)    Optimized Image
             │
             ▼
        Decompression
             │
             ▼
       Original Image Restored
```
# Audio Processing Flow

```text
                     Upload Audio
                          │
                          ▼
           Select Compression Method
                          │
              ┌───────────┴───────────┐
              │                       │
              ▼                       ▼
       Lossless Compression     Lossy Compression
              │                       │
              ▼                       ▼
        Zlib Algorithm         FFmpeg libmp3lame
              │                       │
              ▼                       ▼
     Codec File (.lossless)    Optimized Audio
              │
              ▼
         Decompression
              │
              ▼
        Original Audio Restored
```

---

# API Endpoint

## Process File

```

POST /process

```

### Request

Multipart Form Data

| Field | Type | Description |
|--------|------|-------------|
| file | File | Uploaded media |
| mode | String | compress / decompress / stego / extract |
| message | String | Secret message (optional) |

---

### Response

```json
{
    "status": "success",
    "media_type": "image",
    "original_size": 102400,
    "processed_size": 50231,
    "compression_ratio": 50.95,
    "processing_time_ms": 135,
    "message": "Image compressed successfully"
}
```

---

# Supported Modes

| Mode              | Description                         |
| ----------------- | ----------------------------------- |
| Lossless Compress | Compress using reversible algorithm |
| Decompress        | Restore lossless compressed media   |
| Lossy Compress    | Compress with quality reduction     |
| Steganography     | Hide secret message                 |
| Extract           | Extract hidden message              |


---

# Supported File Types

## Image

- PNG
- JPG
- JPEG
- BMP
- WebP

Maximum Size

```

5 MB

```

---

## Audio

- WAV, MP3, OGG, M4A, AAC, FLAC

Maximum Size

```

10 MB

```

---

## Video

- MP4, AVI, MOV, MKV

Maximum Size

```

20 MB

```

---

# Algorithms

## Image Compression

Zlib Algorithm & OpenCV JPEG

Lossless image compression via Zlib stream packaging, and Lossy compression via OpenCV JPEG encoding.

---

## Image Steganography

Least Significant Bit (LSB)

Hide text messages inside RGB image pixels without significant visual changes.

---

## Audio Compression

Zlib Algorithm & libmp3lame

Lossless audio compression via Zlib stream packaging, and Lossy compression using FFmpeg's MP3 codec.

---

## Audio Steganography

Least Significant Bit (LSB)

Embed text inside PCM audio samples.



---

## Video Compression

Zlib Algorithm & H.264

Lossless video compression via Zlib stream packaging, and Lossy compression using FFmpeg's H.264 (libx264) codec.



---

# Design Principles

# Algorithms

## Image Compression

### Lossless

Zlib Universal Algorithm

Provides reversible compression where the original image can be reconstructed without information loss.

---

### Lossy

Quality-based Image Compression

Reduces file size by decreasing image quality. The original image cannot be perfectly reconstructed after compression.

---

### Image Steganography

Least Significant Bit (LSB)

Embeds secret messages into RGB pixel values while maintaining minimal visual distortion.

---

# Running the Project

## Prerequisites

Before running this project, ensure you have the following installed on your system:
- **Node.js** (v18 or higher)
- **Python** (v3.10 or higher)
- **FFmpeg**: Must be installed and added to your system's `PATH`. This is **critically required** for Audio and Video processing to work.

---

## Clone Repository

```bash
git clone https://github.com/yourusername/secure-codec-studio.git

cd secure-codec-studio
```

---

## Backend

Go to backend

```bash
cd backend
```

Create virtual environment

```bash
python -m venv .venv
```

Activate

Windows

```bash
.venv\Scripts\activate
```

Linux / macOS

```bash
source .venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run FastAPI

```bash
python run.py
```

Backend

```
http://127.0.0.1:8000
```

Swagger

```
http://127.0.0.1:8000/docs
```

---

## Frontend

Install packages

```bash
npm install
```

Run development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```



# Future Improvements

- Stereo WAV support
- Video compression optimization
- Advanced lossy image compression
- Better compression ratio for audio
- Progressive processing
- Batch processing
- Download manager

---

# License

This project is developed for educational and research purposes.

---

# Author

**Fardho Zurrahman**
**Muhammad Ridwan Ihsan**
**Muhammad Wiguna Ilham**


Data Science Enthusiast

Built with using Next.js and FastAPI.
