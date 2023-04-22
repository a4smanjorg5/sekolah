<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PageController extends Controller
{
    protected static function validasi(Request $request)
    {
        $valid = $request->validateWithBag('publishPage', [
            'judul' => 'required|string|max:255',
            'id_media' => ['regex:/^[0-9]+$/', Rule::when(function($input) {
                return is_null($input->paragraf);
            }, 'gt:0')],
            'paragraf' => 'nullable|string|max:255',
        ]);
        return $valid;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Additional/Index', ['pages' => Page::orderByDesc('id')->get()]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Page::create(static::validasi($request));
        return back(303);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function show(Page $page)
    {
        $page->media = function() use($page) {
            return $page->getMedia();
        };
        return Inertia::render('Additional/Show', ['current' => $page]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Page $page)
    {
        $page->update(static::validasi($request));
        return back(303);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function destroy(Page $page)
    {
        $page->delete();
        return back(303);
    }
}
