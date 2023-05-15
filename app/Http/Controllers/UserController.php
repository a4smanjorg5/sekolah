<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Users', [
            'page' => request()->user() 
                        ? User::withTrashed()->paginate()
                        : User::paginate(),
        ]);
    }

    /**
     * Restore a the specified resource in storage.
     *
     * @param  string  $user
     * @return \Illuminate\Http\Response
     */
    public function restore($user)
    {
        $user = User::onlyTrashed()->find($user);
        if (!$user) abort(404);
        $user->restore();
        return back(303);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return Inertia::render('Auth/Register', [
            'select' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
            'major' => 'nullable|string|max:191',
            'univ' => 'nullable|string|max:191',
            'nuptk' => 'nullable|string|max:191',
        ]);

        if ($request->password) {
            $user->password = Hash::make($request->password);
        }

        $user->forceFill([
            'name' => $request->name,
            'email' => $request->email,
            'major' => $request->major,
            'univ' => $request->univ,
            'nuptk' => $request->nuptk,
        ])->save();
        return back(303);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return back(303);
    }
}
