# 👟 Setusia - E-Commerce Platform



**Setusia** adalah platform e-commerce modern yang dirancang khusus untuk penjualan produk sepatu premium. Dibangun dengan fokus pada kecepatan, desain bersih, dan pengalaman pengguna yang intuitif.

---

## 🚀 Main Feature

* **🛍️ Wishlist System Without Login:** Penambahan produk ke keranjang secara real-time dengan manajemen jumlah (qty).
* **🔍 Advanced Filtering:** Pencarian sepatu berdasarkan kategori, ukuran, merk, dan rentang harga.
* **📱 Responsive Design:** Pengalaman belanja yang mulus baik di desktop maupun perangkat mobile (Mobile First).
* **📊 Admin Dashboard:** Manajemen stok produk, pemantauan pesanan, dan statistik penjualan.

---

## 🛠️ Tech Stack

| Bagian | Teknologi |
| :--- | :--- |
| **Frontend** | React.js |
| **Styling** | Tailwind CSS |
| **State Management** | Context API / Zustand |
| **Backend** | Laravel |
| **Database** | MySQL |
| **Tools** | Git, Composer, NPM, Visual Studio Code|

---

## 📂 Project Structure & Logic

Proyek ini mengikuti arsitektur modular untuk memisahkan logika bisnis dengan tampilan:

* **`components/`**: UI Reusable seperti Button, Navbar, dan ProductCard.
* **`pages/`**: Menangani routing utama (Home, Shop, Cart, Detail).
* **`store/`**: Logika Global State untuk mengelola data keranjang belanja secara sinkron.
* **`services/`**: Menangani komunikasi data dengan API (Axios/Fetch).

---

## ⚙️ Local Installation

Ikuti langkah berikut untuk menjalankan proyek di komputer Anda:

1. **Clone Repositori**
   ```bash
   git clone [https://github.com/NabilAlifM/Setusia.git](https://github.com/NabilAlifM/Setusia.git)
   cd Setusia
