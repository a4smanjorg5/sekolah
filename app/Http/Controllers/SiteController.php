<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class SiteController extends Controller
{
    public function show()
    {
        return Inertia::render('Tools/Show', [
            'mediaPage' => Inertia::lazy(function() {
                return ig_media();
            }),
            'pb' => cache('pb'),
            'pages' => Page::all(),
            'ci' => cache('carousel', []),
            'featured' => cache('featured', []),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        foreach ($data as $key => $v) {
            if (in_array($key, ['carousel', 'featured']))
                $data[$key] = array_values(array_unique($v));
        }
        cache($data);
        return redirect()->back();
    }
}
