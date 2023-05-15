import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Guest from '@/Layouts/Guest';
import BlankSection from '@/Components/BlankSection';
import { Head, Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default function Index(props) {
    const Layout = props.auth.user ? Authenticated : Guest;

    return (
        <Layout
            auth={props.auth}
            bgStyle={props.bgStyle}
            canEntry={props.canEntry}
            canLogin={props.canLogin}
            canRegister={props.canRegister}
            logo={props.logo}
            theme={props.theme}
            info={props.info}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Koleksi Halaman Situs
            </h2>}
        >
            <Head title="Halaman Tambahan" />

            <BlankSection>
                {props.pages.map(p => <div key={p.id} {...(props.auth.user && {className: 'grid grid-cols-3 gap-6'})}>
                    <div {...(props.auth.user && {className: 'col-span-2'})}>
                        <Link href={route('pages.show', {page: p.id})} className="text-lg transition-[font-size] duration-750 hover:text-cyan-500 hover:text-xl">{p.judul}</Link>
                    </div>
                    {props.auth.user && (<div className="col-start-3 flex justify-around">
                        <Link
                            href={route('pages.show', {page: p.id})}
                            method="delete"
                            as="button"
                            className="text-sm text-rose-700 hover:text-pink-500"
                        >
                            HAPUS
                        </Link>
                    </div>)}
                </div>)}
            </BlankSection>
        </Layout>
    );
}
