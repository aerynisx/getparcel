<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ParcelController;
use App\Http\Controllers\AuthController;

Route::get('/parcel/{tracking}', [ParcelController::class, 'search']);
Route::post('/parcel', [ParcelController::class, 'store']);
Route::patch('/parcel/{id}/collect', [ParcelController::class, 'markCollected']);
Route::post('/login', [AuthController::class, 'login']);