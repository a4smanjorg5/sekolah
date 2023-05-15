<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Media/Index', [
            'ig' => function() {
                return ig_profile();
            },
            'mediaPage' => function() {
                return ig_media();
            },
        ]);
    }

    protected function prefixUrl($endpoint)
    {
        return config('services.ig_business.prefix_url') .
         config('services.ig_business.id') . "/$endpoint";
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Media/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $ig = ig_business();
        $r = $ig->post(
            $this->prefixUrl('media?' . http_build_query($request->except(['access_token'])))
        )->json();
        if (!empty($r['id'])) {
            $r = $ig->post(
                $this->prefixUrl("media_publish?creation_id=$r[id]")
            )->json();
            if (!empty($r['id'])) {
                if ($request->user())
                    $request->user()->audits()->create([
                        'action' => sprintf('menambahkan media ke ig(ket:%s)', $request->input('caption')),
                    ]);
                return back(303);
            }
        }
        // return back(303)->withErrors([$r]);
        return $r;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $q = request()->except(['access_token']);
        if (!empty($q['fields']) && strpos($q['fields'], 'media_url') === false)
            $q['fields'] .= ',media_url';
        $media = ig_business()->get(
            config('services.ig_business.prefix_url') . $id,
            array_merge(['fields' => 'media_url'], $q)
        )->json();
        if (!isset($media['media_url'])) abort(404);
        list($width, $height) = getimagesize($media['media_url']);
        if (!$width) {
            if (empty($media['thumbnail_url']))
                abort(404);
            list($width, $height) = getimagesize($media['thumbnail_url']);
        }
        return Inertia::render('Media/Show', array_merge([
            'width' => $width,
            'height' => $height,
        ], $media));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return Inertia::render('Media/Edit');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
