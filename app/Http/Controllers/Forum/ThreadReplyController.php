<?php

namespace App\Http\Controllers\Forum;

use App\Http\Controllers\Controller;
use App\Models\Forum\ThreadReply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ThreadReplyController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $threadReply = static::validateReq($request);
        if ($request->user())
            $threadReply = $request->user()->threadReplies()->create($threadReply);
        else $threadReply = ThreadReply::create($threadReply);
        $request->session()->flash('reply_id', $threadReply->id);
        return back(303);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Forum\ThreadReply  $threadReply
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ThreadReply $threadReply)
    {
        Gate::authorize('update', $threadReply);
        $threadReply->fill(static::validateReq($request))->save();
        return back(303);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Forum\ThreadReply  $threadReply
     * @return \Illuminate\Http\Response
     */
    public function destroy(ThreadReply $threadReply)
    {
        Gate::authorize('delete', $threadReply);
        $threadReply->delete();
        return back(303);
    }

    protected static function validateReq($request)
    {
        return $request->validate([
            'thread_id' => 'required|exists:forum_threads,id',
            'body' => 'required|string|max:600',
        ]);
    }
}
