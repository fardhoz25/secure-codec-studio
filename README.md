 **Secure Multimedia Codec Studio**.

# Project

Secure Multimedia Codec Studio adalah Single Page Web Application (SPA) yang digunakan untuk melakukan:
- Media Compression
- Media Decompression
- Steganography
- Hidden Message Extraction

Media yang didukung:

- Image
- Audio
- Video

Project ini merupakan MVP (Minimum Viable Product) :

- Working implementation first
- Simple architecture
- Stateless backend
- No database
- Temporary file handling
- Academic demonstration project

Frontend menggunakan:

- Next.js
- Tailwind CSS

Backend menggunakan:

- FastAPI


Aplikasi hanya memiliki satu halaman utama (Single Page Application).

User melakukan:

Upload → pilih mode → proses → melihat hasil → download hasil.

Tidak ada dashboard.

Tidak ada authentication.

Tidak ada history.

Tidak ada database.

Tidak ada cloud storage.

Hasil proses harus selalu menampilkan:

- Original Size
- Processed Size
- Compression Ratio
- Processing Time

Untuk steganography juga menampilkan:

- Success / Failed
- Extracted Message

Media Processing Concept:

Image menggunakan algoritma sederhana berbasis Run Length Encoding (compression) dan Least Significant Bit (steganography).

Audio menggunakan algoritma sederhana berbasis Delta Encoding (compression) dan Least Significant Bit (steganography).

Video menggunakan algoritma sederhana berbasis Frame Difference atau Frame Sampling (compression) dan Least Significant Bit (steganography).
