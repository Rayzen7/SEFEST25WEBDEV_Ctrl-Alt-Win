<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $doctor = Doctor::all();
        return response()->json([
            'doctor' => $doctor
        ], 200);
    }

    public function doctor()
    {
        $user = Auth::user();
        $doctor = Doctor::where('id', $user->id)->first();
        return response()->json([
            'doctor' => $doctor
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'name' => 'required',
            'image' => 'required',
            'email' => 'required|email',
            'specialist' => 'required',
            'desc' => 'required',
            'password' => 'required',
            'price' => 'required|numeric',
            'no_ktp' => 'required|numeric|unique:doctors,no_ktp',
            'no_phone' => 'required|numeric',
            'role_id' => 'exists:roles,id'
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid Field'
            ], 401);
        }

        $image = $request->file('image')->store('doctor', 'public');
        Doctor::create([
            'name' => $request->name,
            'image' => $image,
            'email' => $request->email,
            'specialist' => $request->specialist,
            'desc' => $request->desc,
            'price' => $request->price,
            'no_ktp' => $request->no_ktp,
            'no_phone' => $request->no_phone,
            'password' => bcrypt($request->password),
            'role_id' => 3
        ]);

        return response()->json([
            'message' => 'create doctor success'
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $doctor = Doctor::findOrFail($id);
        return response()->json([
            'doctor' => $doctor
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
        $doctor = Doctor::findOrFail($id);
        $validateData = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'specialist' => 'required',
            'desc' => 'required',
            'password' => 'required',
            'price' => 'required|numeric',
            'no_ktp' => 'required|numeric',
            'no_phone' => 'required|numeric',
            'role_id' => 'exists:roles,id'
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid Field'
            ], 401);
        }

        if ($request->hasFile('image')) {
            if ($request->image) {
                Storage::delete('public' . $doctor->image);
            }

            $image = $request->file('image')->store('doctor', 'public');
            $doctor->image = $image;
        }

        $doctor->update([
            'name' => $request->name,
            'email' => $request->email,
            'specialist' => $request->specialist,
            'desc' => $request->desc,
            'price' => $request->price,
            'no_ktp' => $request->no_ktp,
            'no_phone' => $request->no_phone,
            'password' => bcrypt($request->password),
            'role_id' => 3
        ]);

        return response()->json([
            'message' => 'update doctor success'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $doctor = Doctor::findOrFail($id);
        if ($doctor->image) {
            Storage::delete('public' . $doctor->image);
        }

        $doctor->delete();
        return response()->json([
            'message' => 'delete doctor success'
        ], 200);
    }
}
