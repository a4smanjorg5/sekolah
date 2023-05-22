<?php

namespace App\Http\Controllers\Forum;

use App\Http\Controllers\Controller;
use App\Models\Forum\Thread;
use App\Models\Forum\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ThreadController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Forum/Thread/Create', [
            'categories' => Topic::all(),
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
        $thread = static::validateReq($request);
        if ($request->user())
            $thread = $request->user()->forumThreads()->create($thread);
        else $thread = Thread::create($thread);
        return redirect(route('forum.threads.show', $thread->id));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Forum\Thread  $thread
     * @return \Illuminate\Http\Response
     */
    public function show(Thread $thread)
    {
        $thread->user;
        $thread->topic->category;
        $threadReply = $thread->replies()->find(session('reply_id'));
        $props = [
            'thread' => $thread,
            'replies' => $thread->replies()->with('user')->paginate(),
        ];
        if ($threadReply) $props['lastReply'] = $threadReply;
        return Inertia::render('Forum/Thread/Show', $props);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Forum\Thread  $thread
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Thread $thread)
    {
        Gate::authorize('update', $thread);
        $thread->fill(static::validateReq($request))->save();
        return back(303);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Forum\Thread  $thread
     * @return \Illuminate\Http\Response
     */
    public function destroy(Thread $thread)
    {
        Gate::authorize('delete', $thread);
        $thread->delete();
        return back(303);
    }

    protected static function validateReq($request)
    {
        return $request->validate([
            'topic_id' => 'required|exists:forum_topics,id',
            'title' => 'required|string|max:60',
            'body' => 'required|string|max:600',
        ]);
    }
}
