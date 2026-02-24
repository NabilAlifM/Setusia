<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{

    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->has('featured')) {
            $query->where('is_featured', true);
        }

        return response()->json($query->get());
    }


    public function show(string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            $product = Product::where('slug', $id)->firstOrFail();
        }

        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'category' => 'required',
            'price' => 'required|numeric',
            'description' => 'required',
            'sizes' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'features' => 'array',
            'stock' => 'integer'
        ]);

        $imageUrls = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                // Store in public/products folder
                $path = $image->store('products', 'public');
                // Create full URL
                $imageUrls[] = asset('storage/' . $path);
            }
        }

        $product = Product::create([
            'name' => $request->name,
            'slug' => \Illuminate\Support\Str::slug($request->name),
            'brand' => $request->brand ?? 'Setusia',
            'category' => $request->category,
            'price' => $request->price,
            'discount_price' => $request->discount_price,
            'description' => $request->description,
            'sizes' => $request->sizes, // Cast to array handled by model
            'images' => $imageUrls,     // Cast to array handled by model
            'features' => $request->features,
            'is_featured' => $request->is_featured ?? false,
            'stock' => $request->stock ?? 100,
        ]);

        return response()->json($product, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::find($id);
        if (!$product) {
            $product = Product::where('slug', $id)->firstOrFail();
        }

        $request->validate([
            'name' => 'required',
            'category' => 'required',
            'price' => 'required|numeric',
            'description' => 'required',
            'sizes' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'features' => 'array',
            'stock' => 'integer'
        ]);

        $imageUrls = $product->images; // Keep existing images by default
        if ($request->hasFile('images')) {
            $imageUrls = []; // Replace images if new ones are uploaded
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $imageUrls[] = asset('storage/' . $path);
            }
        }

        $product->update([
            'name' => $request->name,
            'slug' => \Illuminate\Support\Str::slug($request->name),
            'brand' => $request->brand ?? $product->brand,
            'category' => $request->category,
            'price' => $request->price,
            'discount_price' => $request->discount_price,
            'description' => $request->description,
            'sizes' => $request->sizes,
            'images' => $imageUrls,
            'features' => $request->features,
            'is_featured' => $request->is_featured ?? $product->is_featured,
            'stock' => $request->stock ?? 100,
        ]);

        // Log Activity
        if ($request->user()) {
            \App\Models\ActivityLog::create([
                'user_id' => $request->user()->id,
                'action' => 'update',
                'description' => "Updated product: {$product->name}",
                'subject' => $product->name,
            ]);
        }

        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $product = Product::find($id);
        if (!$product) {
            $product = Product::where('slug', $id)->firstOrFail();
        }

        $productName = $product->name;
        $product->delete();

        // Log Activity
        if ($request->user()) {
            \App\Models\ActivityLog::create([
                'user_id' => $request->user()->id,
                'action' => 'delete',
                'description' => "Deleted product: {$productName}",
                'subject' => $productName,
            ]);
        }

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
