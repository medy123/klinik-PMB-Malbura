# klinik-PMB-Malbura

# PMB Maribu - Website Profile

Website statis (HTML + CSS + JavaScript) untuk profil PMB. Tidak perlu install paket atau database, cukup buka `index.html` di browser.

## Struktur folder

| File | Fungsi |
| --- | --- |
| `index.html` | Seluruh konten halaman (teks, gambar, kartu, formulir). |
| `style.css` | Tampilan: warna, layout, animasi, dan aturan layar ponsel. |
| `script.js` | Interaksi: menu, filter layanan, slide, animasi, dan formulir WhatsApp. |

## Cara menjalankan

- Klik 2x file `index.html`, atau
- Jalankan server lokal dari folder ini, misalnya:
  ```powershell
  python -m http.server 8000
  ```
  lalu buka `http://localhost:8000`.

## Bagian yang paling sering diganti

Semua data di bawah ini masih **contoh**:

1. **Nama, alamat, telepon, email, jam buka**
   - `index.html` → section `KONTAK` dan `FOOTER`.
2. **Nomor WhatsApp**
   - `index.html` → cari `wa.me/6281234567890` dan `tel:+6281234567890` (ada di CTA, tombol melayang, dan kontak).
   - `script.js` → ubah nilai `NOMOR_WA = '6281234567890'`.
3. **Daftar layanan dan harga**
   - `index.html` → section `LAYANAN`. Tiap kartu memakai `data-category` (`konsultasi`, `pemeriksaan`, `perawatan`) yang harus cocok dengan tombol filter.
   - `script.js` → daftar `<option>` di formulir kontak juga perlu disesuaikan.
4. **Data dokter**
   - `index.html` → section `TIM DOKTER`.
5. **Gambar**
   - `index.html` → semua atribut `src` dan `background-image` memakai URL Unsplash/RandomUser. Ganti dengan foto PMB sendiri jika sudah ada.
6. **Warna tema**
   - `style.css` → blok `:root` di bagian atas. Variabel `--primary` adalah warna utama hijau-medis.

## Menambah kartu layanan baru

Salin salah satu blok `<div class="layanan-card">`, lalu ubah:

- `data-category`: `konsultasi` / `pemeriksaan` / `perawatan`
- `src` gambar, nama layanan, harga, durasi, dan bintang rating

## Catatan

- Formulir kontak **tidak menyimpan data ke server**. Saat dikirim, formulir membuka WhatsApp berisi pesan yang sudah terisi otomatis.
- Formulir newsletter di footer juga masih contoh (belum tersambung ke layanan email).
- Setiap blok kode sudah diberi komentar dalam bahasa Indonesia supaya mudah dipahami.
