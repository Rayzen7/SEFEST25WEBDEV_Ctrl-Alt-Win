<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function user()
    {
        $user = Auth::user();
        Transaction::where('user_id', $user->id)
            ->where('created_at', '<', now()->subHours(24))
            ->update(['doctor_id' => null]);
    
        $transaction = Transaction::where('user_id', $user->id)
            ->with('doctor', 'user')
            ->get()
            ->map(function ($transaction) {
                if ($transaction->doctor_id === null) {
                    unset($transaction->doctor);
                }
                return $transaction;
            });
    
        return response()->json([
            'transaction' => $transaction
        ], 200);
    }
    

    public function doctor()
    {
        $user = Auth::user();
        $transaction = Transaction::with('doctor', 'user')->where('doctor_name', $user->name)->get();
        return response()->json([
            'transaction' => $transaction
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'user_id' => 'exists:users,id',
            'doctor_id' => 'exists:doctors,id',
            'doctor_name' => 'string',
            'user_name' => 'string',
            'doctor_image' => 'string',
            'doctor_specialist' => 'string',
            'disease_complaints' => 'required',
            'no_phone' => 'required|numeric',
            'status' => 'string'
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid Field'
            ], 401);
        }

        $user = Auth::user();
        Transaction::create([
            'user_id' => $user->id,
            'doctor_id' => $request->doctor_id,
            'doctor_name' => $request->doctor_name,
            'user_name' => $request->user_name,
            'doctor_image' => $request->doctor_image,
            'doctor_specialist' => $request->doctor_specialist,
            'disease_complaints' => $request->disease_complaints,
            'no_phone' => $request->no_phone,
            'status' => 'pending'
        ]);

        return response()->json([
            'message' => 'Consultation Message Successful'
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = Auth::user();
        $transaction = Transaction::with(['doctor', 'user'])->where('user_id', $user->id)->findOrFail($id);
        return response()->json([
            'transaction' => $transaction
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = Auth::user();
        $transaction = Transaction::with(['doctor', 'user'])->where('user_id', $user->id)->findOrFail($id);
        $validateData = Validator::make($request->all(), [
            'user_id' => 'exists:users,id',
            'doctor_id' => 'exists:doctors,id',
            'doctor_name' => 'string',
            'user_name' => 'string',
            'doctor_image' => 'string',
            'doctor_specialist' => 'string',
            'disease_complaints' => 'required',
            'no_phone' => 'required|numeric',
            'status' => 'string'
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid Field'
            ], 401);
        }

        $transaction->update([
            'status' => 'accepted'
        ]);

        return response()->json([
            'message' => 'Consultation Accepted'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
