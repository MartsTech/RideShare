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
        $user = $request->user();
        $user->load('driver');

        return response()->json([
            'user' => $user
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

        $user->driver()->updateOrCreate($request->only([
            'year',
            'make',
            'model',
            'color',
            'license_plate'
        ]));

        $user->load('driver');

        return response()->json([
            'user' => $user
        ]);
    }
}
