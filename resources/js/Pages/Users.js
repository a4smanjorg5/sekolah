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
                Profil Pegawai
            </h2>}
        >
            <Head title="Profil Pegawai" />

            <BlankSection>
                <Link
                    href={route('users.create')}
                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                >
                    Tambah
                </Link>
                <table width="100%" style={{ borderCollapse: 'separate' }}>
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Jurusan</th>
                            <th>Universitas</th>
                            <th>NUPTK</th>
                            {props.auth.user && <td align="center">Aksi</td>}
                        </tr>
                    </thead>
                    <tbody>
                        {props.page.data.map(u => <tr>
                            <td {...(u.deleted_at ? { className: 'line-through' } : {})}>{u.name}</td>
                            <td {...(u.deleted_at ? { className: 'line-through' } : {})}>{u.major}</td>
                            <td {...(u.deleted_at ? { className: 'line-through' } : {})}>{u.univ}</td>
                            <td {...(u.deleted_at ? { className: 'line-through' } : {})}>{u.nuptk}</td>
                            {props.auth.user && (<td><div className="col-start-6 flex justify-around">
                                <Link href={route('users.show', u.id)}>
                                    UBAH
                                </Link>
                                {u.deleted_at ? <Link
                                    href={route('users.restore', u.id)}
                                    method="patch"
                                    as="button"
                                >
                                    PULIHKAN
                                </Link> : <Link
                                    href={route('users.destroy', u.id)}
                                    method="delete"
                                    as="button"
                                    className="text-sm text-rose-700 hover:text-pink-500"
                                >
                                    HAPUS
                                </Link>}
                            </div></td>)}
                        </tr>)}
                    </tbody>
                </table>
            </BlankSection>
        </Layout>
    );
}
