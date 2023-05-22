import React, { useEffect, useState } from 'react';
import Guest from '@/Layouts/Guest';
import ActionMessage from '@/Components/ActionMessage';
import BlankSection from '@/Components/BlankSection';
import Button from '@/Components/Button';
import SectionBorder from '@/Components/SectionBorder';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Show({ thread, lastReply, replies, ...props }) {
    const { data, setData, post, processing, reset, recentlySuccessful } = useForm({
        thread_id: thread.id,
        body: '',
    }), category = thread.topic.category, posts = [{
        user: thread.user,
        body: thread.body,
    }].concat(replies.data)

    const submitted = () => {
        post(route('forum.threads.replies.store'), {
            preserveScroll: !0,
            onSuccess: () => reset(),
        });
    };

    useEffect(() => {
        if (lastReply) {
            let reply = document.getElementById('post'+lastReply.id);
            reply && scrollTo(0, reply.offsetTop);
        }
    }, [lastReply]);

    return (
        <Guest
            auth={props.auth}
            bgStyle={props.bgStyle}
            canEntry={props.canEntry}
            canLogin={props.canLogin}
            canRegister={props.canRegister}
            logo={props.logo}
            theme={props.theme}
            info={props.info}
            header={<div className="flex flex-col">
                <h2 className={`font-semibold text-xl text-${props.theme}-800 leading-tight`}>
                    {thread.title}
                </h2>
                <Link href={route('forum.categories.show', category.id)} className={`block text-sm text-${props.theme}-600 hover:underline`}>
                    {category.name}
                </Link>
            </div>}
        >
            <Head title={thread.title} />

            <div className={`py-12 text-${props.theme}-700`}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {posts.map((post, i) => <div key={i===0 ? 't'+post.id : 'r'+post.id}>
                        {i !== 0 && <SectionBorder theme={props.theme} />}
                        <BlankSection theme={props.theme} {...(i === 0 ? {} : {id: 'post'+post.id})}>
                            {post.user && <div className={`font-semibold text-${props.theme}-600 text-lg`}>
                                <Link href={route('users.show', post.user.id)}>{post.user.name}</Link>
                            </div>}
                            <pre>{post.body}</pre>
                        </BlankSection>
                        {i === 0 && <>
                            <SectionBorder theme={props.theme} />
                            <form onSubmit={(e) => { e.preventDefault(); submitted() }}>
                                <div className="overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className={`px-4 py-5 bg-${props.theme}-50 sm:p-6`}>
                                        <div className={`font-semibold text-${props.theme}-600 text-lg`}>Balasan</div>
                                        <textarea name="body" value={data.body} className="w-full" onChange={({target}) => setData(target.name, target.value)} required />
                                    </div>

                                    <div className={`flex items-center justify-end px-4 py-3 bg-${props.theme}-200 text-right sm:px-6`}>
                                        <ActionMessage on={recentlySuccessful} className="mr-3">
                                            Terposting.
                                        </ActionMessage>

                                        <Button processing={processing}>Posting</Button>
                                    </div>
                                </div>
                            </form>
                        </>}
                    </div>)}
                </div>
            </div>
        </Guest>
    );
}
