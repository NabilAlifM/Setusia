ADMIN LOGIN FOR JURY:
- Email: admin@setusia.com
- Password: password

--------------------------------------------------
DAFTAR FITUR YANG BERHASIL DISELESAIKAN:
--------------------------------------------------
1.  Frontend Architecture (React 18 + Vite)
    - Single Page Application (SPA) dengan Framer Motion untuk animasi.
    - Responsive Design (Mobile-first).
    - Custom UI Components (Header, Footer, Product Card, Modals).

2.  Product Catalog
    - Grid view produk yang dinamis.
    - Filter kategori dan pencarian.
    - Halaman detail produk lengkap.

3.  User Interaction Features
    - Wishlist: Menyimpan produk favorit (Persistensi LocalStorage).
    - Comparison Tool: Membandingkan 2 produk sepatu secara side-by-side.
    - Notify Out-of-Stock: Modal pengingat stok (LocalStorage logic).

4.  Backend API (Laravel 11)
    - RESTful API untuk data produk dan autentikasi.
    - Laravel Sanctum untuk keamanan token admin.

5.  Admin Panel (Full CRUD)
    - Autentikasi Admin (Login/Logout).
    - Manajemen Produk: Tambah, Lihat, Edit, dan Hapus data produk.
    - Image Cloud/Local Upload: Sistem penyimpanan gambar produk.

6.  Activity Logs
    - Pencatatan otomatis setiap ada perubahan (tambah/edit/hapus) di sisi admin untuk transparansi data.

--------------------------------------------------
PANDUAN INSTALASI & MENJALANKAN APLIKASI:
--------------------------------------------------
Prasyarat:
- PHP >= 8.2 & Composer
- Node.js & npm
- MySQL (XAMPP/Laragon/Native)

Langkah-langkah:

1. Setup Backend (Laravel):
   - Buka terminal dan masuk ke direktori: cd laravel-app
   - Install dependensi: composer install
   - Buat database baru di MySQL dengan nama: setusia
   - Salin file .env: cp .env.example .env (jika belum ada)
   - Generate key: php artisan key:generate
   - Jalankan migrasi dan seeder: php artisan migrate --seed
   - Jalankan server: php artisan serve (biasanya jalan di http://127.0.0.1:8000)

2. Setup Frontend (React + Vite):
   - Buka terminal baru dan masuk ke direktori: cd frontend
   - Install dependensi: npm install
   - Jalankan frontend: npm run dev

3. Akses Aplikasi:
   - Frontend (Customer): http://localhost:5173
   - Admin Panel: http://localhost:5173/admin

--------------------------------------------------
CATATAN PENGEMBANGAN:
--------------------------------------------------
- Fitur Payment Gateway dan Checkout saat ini masih dalam tahap pengembangan.
- Beberapa tombol di menu bantuan dan bantuan footer akan memunculkan notifikasi "Masih dalam pengembangan" karena masih dalam tahap pembangunan tahap selanjutnya.
