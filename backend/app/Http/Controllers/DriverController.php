<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DriverController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function get(Request $request): JsonResponse
    {
        $driver = $request->user()->driver;
        
        if ($driver){
            $driver->load('user');
        }

        return response()->json([
            'driver' => $driver
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string',
            'year' => 'required|numeric',
            'make' => 'required|string',
            'model' => 'required|string',
            'color' => 'required|string',
            'license_plate' => 'required|string'
        ]);

        $user = $request->user();

        $user->update($request->only('name'));

        $driver = $user->driver;

        $driver->updateOrCreate($request->only([
            'year',
            'make',
            'model',
            'color',
            'license_plate'
        ]));

        $driver->load('user');

        return response()->json([
            'driver' => $driver
        ]);
    }
}
