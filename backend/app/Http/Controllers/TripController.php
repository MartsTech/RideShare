<?php

namespace App\Http\Controllers;

use App\Events\TripAcceptedEvent;
use App\Events\TripEndedEvent;
use App\Events\TripLocatedEvent;
use App\Events\TripStartedEvent;
use App\Models\Trip;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TripController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function get(Request $request, Trip $trip): JsonResponse
    {
        if ($trip->user->id !== $request->user()->id && !($trip->driver && $request->user()->driver && $trip->driver->id === $request->user()->driver->id))
        {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }
        $trip->load('user', 'driver.user');

        return response()->json([
            'trip' => $trip
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
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

        $trip->load('user', 'driver.user');

        return response()->json([
            'trip' => $trip
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function accept(Request $request, Trip $trip): JsonResponse
    {
        $request->validate([
            'driver_location' => 'required'
        ]);

        if ($trip->driver || !$request->user()->driver)
        {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

       $trip->update([
           'driver_id' => $request->user()->driver->id,
           'driver_location' => $request->input('driver_location')
       ]);

        $trip->load('user', 'driver.user');

        TripAcceptedEvent::dispatch($trip, $trip->user);

        return response()->json([
            'trip' => $trip
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function start(Request $request, Trip $trip): JsonResponse
    {
        if (!$trip->driver || !$request->user()->driver || $trip->driver->id !== $request->user()->driver->id)
        {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $trip->update([
            'is_started' => true
        ]);

        $trip->load('user', 'driver.user');

        TripStartedEvent::dispatch($trip, $trip->user);

        return response()->json([
            'trip' => $trip
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function locate(Request $request, Trip $trip): JsonResponse
    {
        $request->validate([
            'driver_location' => 'required'
        ]);

        if (!$trip->driver || !$request->user()->driver || $trip->driver->id !== $request->user()->driver->id)
        {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        if (!$trip->is_started || $trip->is_completed)
        {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $trip->update([
            'driver_location' => $request->input('driver_location')
        ]);

        $trip->load('user', 'driver.user');

        TripLocatedEvent::dispatch($trip, $trip->user);

        return response()->json([
            'trip' => $trip
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function end(Request $request, Trip $trip): JsonResponse
    {
        if (!$trip->driver || !$request->user()->driver || $trip->driver->id !== $request->user()->driver->id)
        {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $trip->update([
            'is_completed' => true
        ]);

        $trip->load('user', 'driver.user');

        TripEndedEvent::dispatch($trip, $trip->user);

        return response()->json([
            'trip' => $trip
        ]);
    }
}
