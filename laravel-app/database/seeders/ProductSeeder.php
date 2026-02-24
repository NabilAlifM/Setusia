<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Setusia Velocity X1',
                'category' => 'Running',
                'price' => 450000,
                'discount_price' => 399000,
                'description' => 'Sepatu lari lokal dengan teknologi AirFlow yang membuat kaki tetap sejuk. Cocok untuk lari jarak jauh maupun jogging santai.',
                'sizes' => [39, 40, 41, 42, 43, 44],
                'images' => [
                    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1000&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop'
                ],
                'features' => ['Breathable Mesh', 'Ultra-light Sole', 'Reflective Strips'],
                'is_featured' => true,
            ],
            [
                'name' => 'Setusia Urban Low',
                'category' => 'Sneakers',
                'price' => 320000,
                'discount_price' => null,
                'description' => 'Sneakers kasual dengan desain minimalis. Upper kanvas premium yang tahan lama dan nyaman dipakai seharian.',
                'sizes' => [38, 39, 40, 41, 42],
                'images' => [
                    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1560769629-975e13f0c470?q=80&w=1000&auto=format&fit=crop'
                ],
                'features' => ['Premium Canvas', 'Vulcanized Rubber', 'Memory Foam Insole'],
                'is_featured' => true,
            ],
            [
                'name' => 'Setusia Heritage 90',
                'category' => 'Original',
                'price' => 550000,
                'discount_price' => 495000,
                'description' => 'Mengusung desain retro tahun 90-an dengan sentuhan modern. Kombinasi suede dan mesh memberikan tampilan yang timeless.',
                'sizes' => [40, 41, 42, 43],
                'images' => [
                    'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1000&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=1000&auto=format&fit=crop'
                ],
                'features' => ['Genuine Suede', 'Retro Look', 'Durable Construction'],
                'is_featured' => false,
            ],
            [
                'name' => 'Setusia Breeze Walker',
                'category' => 'Casual',
                'price' => 280000,
                'discount_price' => null,
                'description' => 'Slip-on ringan untuk aktivitas santai. Mudah dipakai dan dilepas, sangat praktis untuk bepergian.',
                'sizes' => [38, 39, 40, 41, 42, 43],
                'images' => [
                    'https://images.unsplash.com/photo-1626379953822-baec19c3accd?q=80&w=1000&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1626379961311-665e8832a58c?q=80&w=1000&auto=format&fit=crop'
                ],
                'features' => ['Slip-on Design', 'Breathable Knit', 'Flexible Sole'],
                'is_featured' => false,
            ],
            [
                'name' => 'Setusia Trail Master',
                'category' => 'Running',
                'price' => 600000,
                'discount_price' => 550000,
                'description' => 'Sepatu trail running dengan grip ekstra kuat. Taklukkan medan berat dengan percaya diri.',
                'sizes' => [40, 41, 42, 43, 44, 45],
                'images' => [
                    'https://images.unsplash.com/photo-1581100319214-dc1f15c8c22e?q=80&w=1000&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1581099684176-655f058ee9d4?q=80&w=1000&auto=format&fit=crop'
                ],
                'features' => ['Water Resistant', 'High Traction Lug', 'Toe Protection'],
                'is_featured' => true,
            ],
            [
                'name' => 'Setusia Court Pro',
                'category' => 'Sneakers',
                'price' => 420000,
                'discount_price' => null,
                'description' => 'Terinspirasi dari sepatu tenis klasik. Tampilan bersih dan elegan cocok untuk gaya semi-formal.',
                'sizes' => [39, 40, 41, 42, 43],
                'images' => [
                    'https://images.unsplash.com/photo-1514989940723-e88754173d56?q=80&w=1000&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1000&auto=format&fit=crop'
                ],
                'features' => ['Leather Upper', 'Cupsole Construction', 'Minimalist Design'],
                'is_featured' => false,
            ],
            [
                'name' => 'Setusia Aero Run',
                'category' => 'Running',
                'price' => 500000,
                'discount_price' => 450000,
                'description' => 'Didesain untuk kecepatan. Aero Run memiliki profil aerodinamis dan bantalan responsif.',
                'sizes' => [39, 40, 41, 42, 43, 44],
                'images' => [
                    'https://images.unsplash.com/photo-1512763319020-40e94916a036?q=80&w=1000&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1512763428-10b65f3a093e?q=80&w=1000&auto=format&fit=crop'
                ],
                'features' => ['Aerodynamic Profile', 'Responsive Foam', 'Lightweight'],
                'is_featured' => true,
            ],
            [
                'name' => 'Setusia Canvas High',
                'category' => 'Sneakers',
                'price' => 350000,
                'discount_price' => 315000,
                'description' => 'High-top sneakers dengan bahan kanvas tebal. Memberikan perlindungan lebih pada pergelangan kaki.',
                'sizes' => [38, 39, 40, 41, 42],
                'images' => [
                    'https://images.unsplash.com/photo-1607522370255-f8042455db95?q=80&w=1000&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1607522370245-c800c198118f?q=80&w=1000&auto=format&fit=crop'
                ],
                'features' => ['High-top', 'Double Stitching', 'Rubber Toe Cap'],
                'is_featured' => false,
            ],
            [
                'name' => 'Setusia Slipstream',
                'category' => 'Casual',
                'price' => 300000,
                'discount_price' => null,
                'description' => 'Sepatu santai dengan desain futuristik. Nyaman digunakan untuk jalan-jalan sore.',
                'sizes' => [39, 40, 41, 42, 43],
                'images' => [
                    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop'
                ],
                'features' => ['Futuristic Look', 'Easy Clean', 'Soft Lining'],
                'is_featured' => false,
            ],
            [
                'name' => 'Setusia Classic Lo',
                'category' => 'Original',
                'price' => 299000,
                'discount_price' => null,
                'description' => 'Kembali ke dasar. Classic Lo adalah sepatu yang memulai segalanya. Sederhana, kuat, dan ikonik.',
                'sizes' => [36, 37, 38, 39, 40, 41, 42, 43, 44],
                'images' => [
                    'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop'
                ],
                'features' => ['Original Design', 'Anti-slip Sole', 'Comfort Fit'],
                'is_featured' => true,
            ],
            [
                'name' => 'Setusia Striker Elite',
                'category' => 'Soccer',
                'price' => 550000,
                'discount_price' => null,
                'description' => 'Sepatu bola dengan pul (studs) yang dirancang untuk traksi maksimal di lapangan rumput. Upper sintetis ringan untuk kontrol bola yang presisi.',
                'sizes' => [39, 40, 41, 42, 43],
                'images' => [
                    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=1000&auto=format&fit=crop'
                ],
                'features' => ['High Traction Studs', 'Lightweight Synthetic', 'Ball Control Texture'],
                'is_featured' => true,
            ],
        ];

        foreach ($products as $product) {
            Product::create(array_merge($product, [
                'slug' => Str::slug($product['name']),
            ]));
        }
    }
}
