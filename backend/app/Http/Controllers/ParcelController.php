<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ParcelController extends Controller
{
    public function search($tracking)
    {
        $parcel = \App\Models\Parcel::where('tracking_number', $tracking)->first();

        if (!$parcel) {
            return response()->json([
                'message' => 'Parcel not found'
            ], 404);
        }

        return response()->json([
            'parcel_id' => $parcel->parcel_id,
            'status' => $parcel->status
        ]);
    }

    public function store(Request $request)
    {
        $lastParcel = \App\Models\Parcel::orderBy('id', 'desc')->first();

        $nextNumber = $lastParcel ? ((int)substr($lastParcel->parcel_id, 2)) + 1 : 1;

        $parcelId = 'GP' . str_pad($nextNumber, 3, '0', STR_PAD_LEFT);

        $parcel = \App\Models\Parcel::create([
            'parcel_id' => $parcelId,
            'tracking_number' => $request->tracking_number,
            'receiver_name' => $request->receiver_name,
            'courier' => $request->courier,
            'received_date' => $request->received_date,
            'description' => $request->description,
            'storage_location' => $request->storage_location,
            'status' => 'stored'
        ]);

        return response()->json($parcel);
    }

    public function markCollected($id)
    {
        $parcel = \App\Models\Parcel::findOrFail($id);

        $parcel->status = 'collected';
        $parcel->save();

        return response()->json($parcel);
    }  
}

?>
