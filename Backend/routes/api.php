<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VideoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);
Route::post('/message/add', [MessageController::class, 'store']);
Route::get('/user/article', [ArticleController::class, 'index']);
Route::get('/user/video', [VideoController::class, 'index']);

Route::middleware('auth-token')->group(function() {
    Route::delete('/logout', [UserController::class, 'logout']);
    Route::get('/getuser', [UserController::class, 'getUser']);

    Route::middleware('role:1')->group(function() {
        Route::get('/article', [ArticleController::class, 'index']);
        Route::post('/article', [ArticleController::class, 'store']);
        Route::get('/article/{id}', [ArticleController::class, 'show']);
        Route::post('/article/{id}', [ArticleController::class, 'update']);
        Route::delete('/article/{id}', [ArticleController::class, 'destroy']);

        Route::get('/message', [MessageController::class, 'index']);

        Route::get('/video', [VideoController::class, 'index']);
        Route::post('/video', [VideoController::class, 'store']);
        Route::get('/video/{id}', [VideoController::class, 'show']);
        Route::put('/video/{id}', [VideoController::class, 'update']);
        Route::delete('/video/{id}', [VideoController::class, 'destroy']);

        Route::get('/category', [CategoryController::class, 'index']);
        Route::post('/category', [CategoryController::class, 'store']);
        Route::delete('/category/{id}', [CategoryController::class, 'destroy']);

        Route::get('/admin/doctor', [DoctorController::class, 'index']);
        Route::get('/admin/doctor/{id}', [DoctorController::class, 'show']);
        Route::post('/admin/doctor', [DoctorController::class, 'store']);
        Route::post('/admin/doctor/{id}', [DoctorController::class, 'update']);
        Route::delete('/admin/doctor/{id}', [DoctorController::class, 'destroy']);
    });

    Route::middleware('role:2')->group(function() {
        Route::post('/user/transaction', [TransactionController::class, 'store']);
        Route::get('/user/transaction', [TransactionController::class, 'user']);
        Route::get('/user/transaction/{id}', [TransactionController::class, 'show']);
        Route::get('/user/doctor', [DoctorController::class, 'index']);
        Route::get('/user/doctor/{id}', [DoctorController::class, 'show']);
    });

    Route::middleware('role:3')->group(function() {
        Route::get('/doctor/profile', [DoctorController::class, 'doctor']);

        Route::put('/doctor/transaction/{id}', [TransactionController::class, 'update']);
        Route::get('/doctor/transaction', [TransactionController::class, 'doctor']);
    });

});