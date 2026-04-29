<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Parcel extends Model
{
    protected $fillable = [
    'parcel_id',
    'tracking_number',
    'receiver_name',
    'courier',
    'received_date',
    'description',
    'storage_location',
    'status'
];
}
