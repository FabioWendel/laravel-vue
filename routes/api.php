<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth:sanctum', 'role:admin,master']], function () {
    Route::apiResource('users', AuthController::class);
    Route::get('/users-search', [AuthController::class, 'search']);
    Route::post('/register', [AuthController::class, 'register']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('products', ProductController::class);
    Route::get('/products-search', [ProductController::class, 'search']);
    Route::get('/categories-search', [CategoryController::class, 'search']);
    Route::apiResource('categories', CategoryController::class);
    Route::get('/categoriesAll', [CategoryController::class, 'all']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/login', [AuthController::class, 'login']);
