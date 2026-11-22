# EARTH / OBSERVATORY

Website observasi lingkungan dengan desain futuristik tanpa gradient pada sistem warna, peta interaktif, data cuaca Open-Meteo, dan feed gempa USGS.

## Cara menjalankan
1. Ekstrak folder `earth-observatory`.
2. Buka folder menggunakan VS Code.
3. Jalankan `index.html` menggunakan extension Live Server.
4. Pastikan internet aktif untuk memuat peta, ikon, foto, grafik, dan API publik.

Jangan membuka `index.html` langsung dari file manager jika browser memblokir JavaScript module. Gunakan Live Server atau hosting HTTP.

## Struktur
- `index.html`: struktur halaman.
- `css/`: reset, variabel warna, layout, komponen, halaman, responsivitas.
- `js/config.js`: konfigurasi sumber data dan lokasi.
- `js/api.js`: helper fetch JSON.
- `js/weather.js`: Open-Meteo current weather.
- `js/earthquakes.js`: USGS earthquake feed, tabel, marker peta, dan grafik.
- `js/map.js`: Leaflet map, layer street/satellite, koordinat.
- `js/clock.js`, `navigation.js`: jam dan navigasi.
- `js/wildfires.js`, `forests.js`: titik awal integrasi data lanjutan.

## Catatan data
- Cuaca mengambil data aktual dari Open-Meteo untuk koordinat awal Majenang, Indonesia.
- Daftar gempa mengambil feed GeoJSON USGS `all_day` dan menunjukkan hingga 8 kejadian terbaru.
- Jumlah gempa pada kartu berasal dari metadata feed USGS, bukan jumlah kejadian seluruh dunia yang dijamin lengkap.
- Layer peta memakai OpenStreetMap dan Esri World Imagery; layanan eksternal dapat berubah atau memiliki batas penggunaan.
- Kartu hutan dan kebakaran saat ini mengarah ke sumber resmi; belum menampilkan angka live karena integrasi yang layak memerlukan pemilihan dataset dan/atau kredensial.
- Data gagal dimuat akan menampilkan status error, bukan nilai palsu.
- Foto memakai URL gambar Unsplash sebagai placeholder visual; ganti dengan aset berlisensi yang kamu pilih jika diperlukan.

## Publikasi
Bisa di-host pada GitHub Pages. Karena semua API dipanggil dari browser, jangan simpan API key rahasia di file JavaScript publik. NASA FIRMS dapat membutuhkan MAP_KEY untuk endpoint tertentu.
