<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('brand')->default('Setusia');
            $table->enum('category', ['Sneakers', 'Running', 'Casual', 'Original', 'Soccer']);
            $table->decimal('price', 10, 2);
            $table->decimal('discount_price', 10, 2)->nullable();
            $table->text('description');
            $table->json('sizes'); // e.g. [38, 39, 40, 41, 42]
            $table->json('images'); // e.g. ["url1", "url2"]
            $table->json('features')->nullable(); // e.g. ["Breathable", "Lightweight"]
            $table->boolean('is_featured')->default(false);
            $table->integer('stock')->default(100);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
