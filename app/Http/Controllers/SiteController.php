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
            'pf' => cache('posts', []),
            'marquee' => cache('marquee', ''),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        foreach ($data as $key => $v) {
            if (in_array($key, ['carousel', 'featured', 'tels'])) {
                $v = array_values(array_unique($v));
                // $data[$key] = $v;
            }
            cache([$key => $v]);
        }
        // cache($data);
        if ($request->user())
            $request->user()->audits()->create([
                'action' => sprintf(
                    'mengubah konfigurasi situs (%s)',
                    implode(',', array_keys($data))
                ),
            ]);
        return back(303);
    }
}
