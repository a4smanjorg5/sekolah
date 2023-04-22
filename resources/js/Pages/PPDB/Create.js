import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Button from '@/Components/Button';
import Checkbox from '@/Components/Checkbox';
import BlankSection from '@/Components/BlankSection';
import FrmInput from '@/Components/FrmInput';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Create({ page, ...props }) {
    const { data, setData, post, processing, errors, reset } = useForm(),
        [ wali, setWali ] = useState();

    const onHandleChange = ({target}) => {
        if (target.name) {
            switch (target.type) {
            case 'checkbox':
                setData(target.name, target.checked ? 1 : 0);
                break;
            case 'select-one':
                setData(target.name, target.selectedOptions[0].value);
                break;
            default:
                setData(target.name, target.value);
                break;
            }
        } else
            setWali(target.checked);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('ppdb.create'), {
            preserveState: !!props.nik,
        });
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={errors}
            logo={props.logo}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Penerimaan Peserta Didik Baru
            </h2>}
        >
            <Head title="PDPB" />

            <div className="py-12">
                <div className="max-w-7xl w-fit mx-auto sm:px-6 lg:px-8" align="center">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg" align="left">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <ValidationErrors errors={props.nik ? errors : props.errors} />

                            <form onSubmit={submit}>
                                <FrmInput
                                    name="nik"
                                    label="NIK"
                                    value={data.nik}
                                    length="16"
                                    isFocused={!props.nik}
                                    handleChange={onHandleChange}
                                    readOnly={props.nik}
                                    required
                                />

                                <div className="flex items-center justify-end mt-4">
                                    <Button className="ml-4" processing={processing}>
                                        Tambah
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <table width="100%" style={{ borderCollapse: 'separate' }}>
                                <thead>
                                    <tr>
                                        <td>No.</td>
                                        <td>Nama</td>
                                        <td>NIK</td>
                                        {(page.data.length || '') && <td>aksi</td>}
                                    </tr>
                                </thead>
                                <tbody>{page.data.length ? (<>
                                    {page.data.map((s, i) =>
                                        <tr>
                                            <td>{(page.current_page - 1) * page.per_page + i + 1}</td>
                                            <td>{s.nama}</td>
                                            <td>{s.nik}</td>
                                            <td><div className='flex space-x-4'>
                                                <Link href={route('ppdb.edit', {ppdb:s.nik})}>Ubah</Link>
                                                <Link href={route('ppdb.destroy', {ppdb:s.nik})} as="button" method="delete">Hapus</Link>
                                            </div></td>
                                        </tr>
                                    )}
                                </>) : (
                                    <tr>
                                        <td colSpan="3">Belum ada calon peserta didik yang terdaftar</td>
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
