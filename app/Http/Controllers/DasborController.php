<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DasborController extends Controller
{
    public function show()
    {
        return Inertia::render('Dashboard', [
            'dasbor' => [
                'pb' => cache('pb'),
            ],
        ]);
    }

    public function store(Request $request)
    {
        foreach ($request->all() as $key => $value) {
            cache([$key => $value]);
        }
        return redirect()->back();
    }
}
