<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\CartController;





/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']); 
    
});



Route::group([
    'middleware' => 'api',
    'prefix' => 'roles'
], function ($router) {
    Route::post('/store', [RoleController::class, 'store']);
    Route::post('/show/{id}', [RoleController::class, 'show']);
    Route::post('/update/{id}', [RoleController::class, 'update']);
    Route::post('/destroy/{id}', [RoleController::class, 'destroy']);
});




Route::group([
    'middleware' => 'api',
    'prefix' => 'products'
], function ($router) {
  
    Route::post('/', [ProductController::class, 'index']);
    Route::post('/store', [ProductController::class, 'store']);
    Route::post('/show/{id}', [ProductController::class, 'show']);
    Route::post('/update/{id}', [ProductController::class, 'update']);
    Route::post('/destroy/{id}', [ProductController::class, 'destroy']);
});


Route::group([
    'middleware' => 'api',
    'prefix' => 'favorite'
], function ($router) {
    Route::post('/', [CartController::class, 'index']);
    Route::post('/store', [FavoriteController::class, 'store']);
    Route::post('/destroy/{id}', [FavoriteController::class, 'destroy']);
});





Route::group([
    'middleware' => 'api',
    'prefix' => 'cart'
], function ($router) {
    Route::post('/', [CartController::class, 'index']);
    Route::post('/store', [CartController::class, 'store']);
    Route::post('/update/{id}', [CartController::class, 'update']);
    Route::post('/destroy/{id}', [CartController::class, 'destroy']);
});