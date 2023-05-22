import React, { useState } from 'react';
import Guest from '@/Layouts/Guest';
import BlankSection from '@/Components/BlankSection';
import { Head, Link } from '@inertiajs/inertia-react';

export default function Show({ current, threads, ...props }) {
    var rName = route().current();

    switch (rName) {
    case 'forum.categories.show':
        rName = 'Kategori';
        break;
    case 'forum.topics.show':
        rName = 'Topik';
        break;
    }

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
                <div className={`text-sm text-${props.theme}-500`}>{rName}</div>
                <h2 className={`font-semibold text-xl text-${props.theme}-800 leading-tight`}>
                    {current.name}
                </h2>
            </div>}
        >
            <Head title={current.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <BlankSection theme={props.theme} className={`text-${props.theme}-800`}>
                        <div className="font-semibold">Bahasan Terbaru</div>
                        <ul className="mb-4">
                            {threads.data.map(t => <li key={'th'+t.id} className={`mb-4 border-t border-${props.theme}-200`}>
                                <Link href={route('forum.threads.show', t)} className="block text-lg">
                                    {t.title}
                                </Link>
                                {t.topic && <Link href={route('forum.topics.show', t.topic.id)} className="block text-sm">
                                    {t.topic.name}
                                </Link>}
                            </li>)}
                        </ul>
                    </BlankSection>
                </div>
            </div>
        </Guest>
    );
}
