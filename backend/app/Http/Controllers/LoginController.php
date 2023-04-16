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
            'phone_number' => 'required|numeric|min:10'
        ]);

        $user = User::firstOrCreate($request->only('phone_number'));

        if (!$user)
        {
            return response()->json([
                'message' => 'Could not create user'
            ], 500);
        }

        $user->notify(new LoginVerificationNotification());

        return response()->json([
            'message' => 'Verification code sent'
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function verify(Request $request): JsonResponse
    {
        $request->validate([
            'phone_number' => 'required|numeric|min:10',
            'auth_code' => 'required|numeric|between:111111,999999'
        ]);

        $user = User::where('phone_number', $request->input('phone_number'))
            ->where('auth_code', $request->input('auth_code'))
            ->first();

        if (!$user)
        {
            return response()->json([
                'message' => 'Could not verify user'
            ], 401);
        }

        $user->update([
            'auth_code' => null
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer'
        ]);
    }
}
