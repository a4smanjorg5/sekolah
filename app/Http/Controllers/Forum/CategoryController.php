<?php

namespace App\Http\Controllers\Forum;

use App\Http\Controllers\Controller;
use App\Models\Forum\Category;
use App\Models\Forum\Thread;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Forum/Index', [
            'categories' => Category::all(),
            'threads' => Thread::orderByDesc('id')->limit((int)request()->query('t', 15))->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Category::create(static::validateReq($request, 'addCategory'));
        return back(303);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Forum\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        return Inertia::render('Forum/Show', [
            'current' => $category,
            'threads' => $category->threads()->with('topic:id,name')->paginate(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Forum\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $category->fill(static::validateReq($request, 'updateCategory'))->save();
        return back(303);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Forum\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return back(303);
    }

    protected static function validateReq($request, $errorBag)
    {
        return $request->validateWithBag($errorBag, [
            'name' => 'required|string|max:60',
        ]);
    }
}
