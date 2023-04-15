<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\LoginVerificationNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function submit(Request $request): JsonResponse
    {
        $request->validate([
            'phone' => 'required|numeric|min:10'
        ]);

        $user = User::firstOrCreate([
            'phone' => $request->phone
        ]);

        if (!$user){
            return response()->json([
                'message' => 'Could not authenticate user'
            ], 401);
        }

        $user->notify(new LoginVerificationNotification());

        return response()->json([
            'message' => 'Verification code sent'
        ]);
    }
}
