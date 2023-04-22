import React, { useState } from 'react';
import Button from '@/Components/Button';
import Common from '@/Layouts/Common';
import DialogModal from '@/Components/DialogModal';
import FrmInput from '@/Components/FrmInput';
import SecondaryButton from '@/Components/SecondaryButton';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Show(props) {
    const { data, setData, post, processing, reset, errors } = useForm({
        id: props.nis,
        nik: props.nik,
    }), [makeIt, setMakeIt] = useState(false);

    const closeDialog = () => setMakeIt(!1);

    const submitted = () => {
        post(route('students.store'), {
            onSuccess: () => closeDialog(),
        });
    };

    return (
        <Common logo={props.logo}>
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
                {props.resmi && <>
                    <tr className='text-blue-700'>
                        <td></td>
                        <td>NIS</td>
                        <td>:</td>
                        <td>{props.resmi.id}</td>
                        <td></td>
                    </tr>
                    <tr className='text-blue-700'>
                        <td></td>
                        <td>Tahun Daftar</td>
                        <td>:</td>
                        <td>{props.resmi.tahun}</td>
                        <td></td>
                    </tr>
                    <tr className='text-blue-700'>
                        <td></td>
                        <td>Semester</td>
                        <td>:</td>
                        <td>{props.resmi.semester}</td>
                        <td></td>
                    </tr>
                </>}
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
                <Link href={`${route('ppdb' + (props.auth.user ? '.create' : ''))}/${props.nik}/edit`} className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ml-4">
                    Ubah
                </Link>

                {(props.nis || '') && <>
                    <SecondaryButton className="ml-2" handleClick={() => {setMakeIt(!0)}}>
                        Resmikan
                    </SecondaryButton>

                    <DialogModal show={makeIt}
                        onClose={closeDialog}
                        footer={<>
                            <Button processing={processing}>Kirim</Button>
                            <SecondaryButton className="ml-2" handleClick={closeDialog}>Batal</SecondaryButton>
                        </>}
                        title={'Resmikan Menjadi Peserta Didik'}
                    >
                        <ValidationErrors errors={errors} />

                        <form className="mt-4" onSubmit={e => { e.preventDefault(); submitted() }}>
                            <FrmInput
                                name="id"
                                label="NIS"
                                type="number"
                                value={data.id}
                                isFocused={!0}
                                handleChange={({ target }) => setData(target.name, target.value)}
                                required
                            />

                        </form>
                    </DialogModal>
                </>}
            </div>
        </Common>
    );
}
