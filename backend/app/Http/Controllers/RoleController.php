<?php
// app/Http/Controllers/RoleController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::all();
        return response()->json($roles);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'title' => 'required|string',
        ]);

        $role = Role::create($request->all());
        return response()->json($role, 201);
    }

    public function show($id)
    {
        $role = Role::where('user_id', $id)->first();

        if ($role) {
            return response()->json($role);
        } else {
            return response()->json(['error' => 'Role not found'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'title' => 'required|string',
        ]);

        $role = Role::where('user_id', $id)->first();

        if (!$role) {
            return response()->json(['error' => 'Role not found'], 404);
        }
    
        $role->update($request->all());
    
        return response()->json($role, 200);
    }

    public function destroy($id)
    {
        $role = Role::where('user_id', $id)->first();

        if (!$role) {
            return response()->json(['error' => 'Role not found'], 404);
        }
    
        $role->delete();
    
        return response()->json(null, 204);
    }
}
