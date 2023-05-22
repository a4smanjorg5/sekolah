import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default function Student({ candidates, page, ...props }) {
    return (
        <Authenticated
            auth={props.auth}
            logo={props.logo}
            theme={props.theme}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Koleksi Peserta Didik
            </h2>}
        >
            <Head title="Peserta Didik" />

            <div className="py-12">
                <div className="max-w-7xl w-fit mx-auto sm:px-6 lg:px-8" align="center">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg" align="left">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <Link href={route('ppdb.create')} className="block mb-4 underline">Lihat Kandidat</Link>
                            <table width="100%" style={{ borderCollapse: 'separate' }}>
                                <thead>
                                    <tr>
                                        <td>{candidates ? 'No.' : 'NIS'}</td>
                                        <td>Nama</td>
                                        {candidates ? <td>NIK</td> : <>
                                            {(page.data.length || '') && <td>Tahun Pendaftaran</td>}
                                            <td>Semester</td>
                                        </>}
                                        {(page.data.length || '') && <td>aksi</td>}
                                    </tr>
                                </thead>
                                <tbody>{page.data.length ? (<>
                                    {page.data.map((s, i) =>
                                        <tr>
                                            <td>{candidates ? (page.current_page - 1) * page.per_page + i + 1 : s.id}</td>
                                            <td>{candidates ? s.nama : s.profil.nama}</td>
                                            {candidates ? <td>{s.nik}</td> : <>
                                                {(page.data.length || '') && <td>{s.tahun}</td>}
                                                <td>{s.semester}</td>
                                            </>}
                                            <td><div className='flex space-x-4'>
                                                <Link href={route('ppdb.edit', {ppdb:s.nik})}>Ubah</Link>
                                                <Link href={route('ppdb.destroy', {ppdb:s.nik})} as="button" method="delete">Hapus</Link>
                                            </div></td>
                                        </tr>
                                    )}
                                </>) : (
                                    <tr>
                                        <td colSpan="3">{`Belum ada${(candidates ? ' calon' : '')} peserta didik yang terdaftar`}</td>
                                    </tr>
                                )}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
