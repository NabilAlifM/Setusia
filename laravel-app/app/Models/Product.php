<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'brand',
        'category',
        'price',
        'discount_price',
        'description',
        'sizes',
        'images',
        'features',
        'is_featured',
        'stock'
    ];

    protected $casts = [
        'sizes' => 'array',
        'images' => 'array',
        'features' => 'array',
        'is_featured' => 'boolean',
        'price' => 'decimal:2',
        'discount_price' => 'decimal:2',
    ];
}
