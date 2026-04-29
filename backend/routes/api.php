<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ParcelController;

Route::get('/parcel/{tracking}', [ParcelController::class, 'search']);
Route::post('/parcel', [ParcelController::class, 'store']);
Route::patch('/parcel/{id}/collect', [ParcelController::class, 'markCollected']);