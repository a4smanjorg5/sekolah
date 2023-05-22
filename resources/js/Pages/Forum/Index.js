import React, { useState } from 'react';
import Guest from '@/Layouts/Guest';
import BlankSection from '@/Components/BlankSection';
import SectionBorder from '@/Components/SectionBorder';
import CategoryForm from './Create/CategoryForm';
import TopicForm from './Create/TopicForm';
import { Head, Link } from '@inertiajs/inertia-react';

export default function Index({ categories, threads, ...props }) {
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
            header={<h2 className={`font-semibold text-xl text-${props.theme}-800 leading-tight`}>
                Selamat Datang di Forum
            </h2>}
        >
            <Head title="Selamat Datang" />

            <div className={`py-10 text-${props.theme}-800`}>
                {props.auth.user && <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <CategoryForm theme={props.theme} />

                    <SectionBorder theme={props.theme} />

                    <TopicForm categories={categories} theme={props.theme} />

                    <SectionBorder theme={props.theme} />
                </div>}
                <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
                    <BlankSection theme={props.theme}>
                        <Link href={route('forum.threads.create')} className="underline mb-4">Bahasan baru</Link>
                        <div className="font-semibold">Koleksi Kategori</div>
                        <ul className="mb-4">
                            {categories.map(c => <li key={'c'+c.id}><Link href={route('forum.categories.show', c)}>
                                {c.name}
                            </Link></li>)}
                        </ul>
                        <div className="font-semibold">Bahasan Terbaru</div>
                        <ul className="mb-4">
                            {threads.map(t => <li key={'th'+t.id}><Link href={route('forum.threads.show', t)}>
                                {t.title}
                            </Link></li>)}
                        </ul>
                    </BlankSection>
                </div>
            </div>
        </Guest>
    );
}
