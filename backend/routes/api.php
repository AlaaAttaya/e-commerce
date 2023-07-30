<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

///write what u want to use here :D
///use App\Http\Controllers\HayalaController;




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



// Route::group(["prefix" => "v0.0.1"], function(){
//     Route::group(["prefix" => "buyer"], function(){
//         Route::get('/', [HayalaController::class, "test"]);
//         Route::get('/trust_issues', [HayalaController::class, "issuesV01"]);
//         Route::get('/third', [HayalaController::class, "third"]);
//     });
//     Route::group(["prefix" => "seller"], function(){
//         Route::get('/', [HayalaController::class, "test"]);
//         Route::get('/trust_issues', [HayalaController::class, "issuesV01"]);
//         Route::get('/third', [HayalaController::class, "third"]);
//     });
// });
