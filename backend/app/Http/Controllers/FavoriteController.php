<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorite;

class FavoriteController extends Controller
{   

    public function index()
    {
        $favorites = Favorite::all();
        return response()->json($favorites);
    }

    
    public function store(Request $request)
    {
        $request->validate([
            'role_id' => 'required|integer|exists:roles,id',
            'product_id' => 'required|integer|exists:products,id',
        ]);

        $favorite = Favorite::create($request->all());
        return response()->json($favorite, 201);
    }

    public function destroy($id)
    {
        $favorite = Favorite::findOrFail($id);
        $favorite->delete();

        return response()->json(null, 204);
    }
}