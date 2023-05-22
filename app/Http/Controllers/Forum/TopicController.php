<?php

namespace App\Http\Controllers\Forum;

use App\Http\Controllers\Controller;
use App\Models\Forum\Topic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TopicController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Topic::create(static::validateReq($request, 'addTopic'));
        return back(303);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Forum\Topic  $topic
     * @return \Illuminate\Http\Response
     */
    public function show(Topic $topic)
    {
        return Inertia::render('Forum/Show', [
            'current' => $topic,
            'threads' => $topic->threads()->paginate(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Forum\Topic  $topic
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Topic $topic)
    {
        $topic->fill(static::validateReq($request, 'updateTopic'))->save();
        return back(303);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Forum\Topic  $topic
     * @return \Illuminate\Http\Response
     */
    public function destroy(Topic $topic)
    {
        $topic->delete();
        return back(303);
    }

    protected static function validateReq($request, $errorBag)
    {
        return $request->validateWithBag($errorBag, [
            'category_id' => 'required|exists:forum_categories,id',
            'name' => 'required|string|max:60',
        ]);
    }
}
