import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Common from '@/Layouts/Common';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Show(props) {
    return (
        <Common>
            <Head title="PPDB" />

            <table>
                <tr>
                    <td></td>
                    <td>NIK</td>
                    <td>:</td>
                    <td>{props.nik}</td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>Nama</td>
                    <td>:</td>
                    <td>{props.nama}</td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>Jenis Kelamin</td>
                    <td>:</td>
                    <td>{props.jk == 'l' ? 'LAKI-LAKI' : 'PEREMPUAN'}</td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>TTL</td>
                    <td>:</td>
                    <td>{props.t4_lahir}, {props.tgl_lahir.split('T', 1)[0]}</td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>Agama</td>
                    <td>:</td>
                    <td>{props.agama.toUpperCase()}</td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>Alamat</td>
                    <td>:</td>
                    <td>{props.alamat}</td>
                    <td></td>
                </tr>
            </table>

            <div className="flex items-center justify-end mt-4">
                <Link href={`${route('ppdb')}/${props.nik}/edit`} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ml-4">
                    Ubah
                </Link>
            </div>
        </Common>
    );
}
