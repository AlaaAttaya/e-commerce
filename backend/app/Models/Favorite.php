<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $fillable = ['role_id', 'product_id'];

    // Define the relationships with the Role and Product models
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}