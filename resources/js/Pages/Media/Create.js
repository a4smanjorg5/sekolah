import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import BlankSection from '@/Components/BlankSection';
import { Head, Link } from '@inertiajs/inertia-react';

export default function Create(props) {
    return (
        <Authenticated
            auth={props.auth}
            canEntry={props.canEntry}
            canLogin={props.canLogin}
            canRegister={props.canRegister}
            logo={props.logo}
            theme={props.theme}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Media</h2>}
        >
            <Head title="Tambah Media" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <BlankSection>
                        <Link href={route('media.index')} className="block my-6 text-gray-700 underline">
                            Lihat Galeri
                        </Link>
                    </BlankSection>
                </div>
            </div>
        </Authenticated>
    );
}
