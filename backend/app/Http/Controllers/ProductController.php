<?php



namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    

    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:70',
        'description' => 'required|string',
        'category' => 'required|string|max:70',
        'price' => 'required|numeric',
        'quantity' => 'required|integer',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,ico|max:2048',
    ]);

    $productData = $request->all();

    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('public/images');
        $productData['image'] = "/storage/".str_replace('public/', '', $imagePath);
    }

    $product = Product::create($productData);
    return response()->json($product, 201);
}



    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:70',
            'description' => 'required|string',
            'category' => 'required|string|max:70',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'image' => 'nullable|string',
        ]);

        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->update($request->all());

        return response()->json($product, 200);
    }

    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json(null, 204);
    }
}
