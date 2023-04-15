<?php

namespace App\Http\Controllers;

use App\Models\Trip;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TripController extends Controller
{
    public function get(Request $request, Trip $trip): JsonResponse
    {
        if ($trip->user->id === $request->user()->id){
            return response()->json([
                'trip' => $trip
            ]);
        }

        if ($trip->driver && $request->user()->driver && $trip->driver->id === $request->user()->driver->id){
            return response()->json([
                'trip' => $trip
            ]);
        }

        return response()->json([
            'message' => 'Unauthorized'
        ], 401);
    }

    public function create(Request $request): JsonResponse
    {
        $request->validate([
            'origin' => 'required',
            'destination' => 'required',
            'destination_name' => 'required'
        ]);

        $trip = $request->user()->trips()->create($request->only([
            'origin',
            'destination',
            'destination_name'
        ]));

        return response()->json([
            'trip' => $trip
        ]);
    }
}
