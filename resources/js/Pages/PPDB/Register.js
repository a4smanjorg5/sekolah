import React, { useState } from 'react';
import Button from '@/Components/Button';
import Checkbox from '@/Components/Checkbox';
import Common from '@/Layouts/Common';
import FrmInput from '@/Components/FrmInput';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Register(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nik: props.nik,
        nama: props.nama,
        jk: props.jk,
        t4_lahir: props.t4_lahir,
        tgl_lahir: props.tgl_lahir && props.tgl_lahir.split('T', 1)[0],
        agama: props.agama,
        alamat: props.alamat,
        nama_ayah: props.nama_ayah,
        ayah_masih_hidup: typeof props.ayah_masih_hidup == "undefined" ? !0 : (props.ayah_masih_hidup ? 1 : 0),
        telp_ayah: props.telp_ayah,
        nama_ibu: props.nama_ibu,
        ibu_masih_hidup: typeof props.ibu_masih_hidup == "undefined" ? !0 : (props.ibu_masih_hidup ? 1 : 0),
        telp_ibu: props.telp_ibu,
        nama_wali: props.nama_wali,
        telp_wali: props.telp_wali,
        alamat_wali: props.alamat_wali,
    }), [ wali, setWali ] = useState();

    var harini = new Date();
    harini = harini.toISOString().split("T", 1)[0];
    harini = dayjs(harini);

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

        post(route('ppdb'), {
            preserveState: !!props.nik,
        });
    };

    return (
        <Common>
            <Head title="PDPB" />

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

                {props.nik && (
                    <>
                        <FrmInput
                            name="nama"
                            label="Nama"
                            value={data.nama}
                            isFocused={!0}
                            handleChange={onHandleChange}
                            required
                        />

                        <div className="mt-4">
                            <Label forInput="jk" value="Jenis Kelamin" />

                            <select name="jk" onChange={onHandleChange} defaultValue={data.jk} required>
                                <option value="">-- Pilih Jenis Kelamin --</option>
                                <option value="l" >Laki-laki</option>
                                <option value="p">Perempuan</option>
                            </select>
                        </div>

                        <FrmInput
                            name="t4_lahir"
                            label="Tempat Lahir"
                            value={data.t4_lahir}
                            handleChange={onHandleChange}
                            required
                        />

                        <div className="mt-4">
                            <Label forInput="tgl_lahir" value="Tanggal Lahir" />

                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="id">
                                <DatePicker
                                    format="D MMM YYYY"
                                    defaultValue={data.tgl_lahir && dayjs(data.tgl_lahir)}
                                    maxDate={harini}
                                    onChange={d => setData('tgl_lahir', d.format('YYYY-MM-DD'))}
                                />
                            </LocalizationProvider>
                        </div>

                        <div className="mt-4">
                            <Label forInput="agama" value="Agama" />

                            <select name="agama" onChange={onHandleChange} defaultValue={data.agama} required>
                                <option value="">-- Pilih Agama --</option>
                                <option value="protestan">Protestan</option>
                                <option value="katolik">Katolik</option>
                            </select>
                        </div>

                        <FrmInput
                            name="alamat"
                            label="Alamat"
                            value={data.alamat}
                            handleChange={onHandleChange}
                            required
                        />

                        <FrmInput
                            name="nama_ayah"
                            label="Nama Ayah"
                            value={data.nama_ayah}
                            handleChange={onHandleChange}
                            required
                        />

                        <div className="mt-4">
                            <label className="flex items-center">
                                <Checkbox name="ayah_masih_hidup" value={data.ayah_masih_hidup} handleChange={onHandleChange} />

                                <span className="ml-2 text-sm text-gray-600">Ayah masih hidup</span>
                            </label>
                        </div>

                        {(data.ayah_masih_hidup || '') && (
                            <FrmInput
                                name="telp_ayah"
                                label="No.telp Ayah"
                                value={data.telp_ayah}
                                placeholder="08xxxxxxxxxx"
                                handleChange={onHandleChange}
                                required
                            />
                        )}

                        <FrmInput
                            name="nama_ibu"
                            label="Nama Ibu"
                            value={data.nama_ibu}
                            handleChange={onHandleChange}
                            required
                        />

                        <div className="mt-4">
                            <label className="flex items-center">
                                <Checkbox name="ibu_masih_hidup" value={data.ibu_masih_hidup} handleChange={onHandleChange} />

                                <span className="ml-2 text-sm text-gray-600">Ibu masih hidup</span>
                            </label>
                        </div>

                        {(data.ibu_masih_hidup || '') && (
                            <FrmInput
                                name="telp_ibu"
                                label="No.telp Ibu"
                                value={data.telp_ibu}
                                placeholder="08xxxxxxxxxx"
                                handleChange={onHandleChange}
                                required
                            />
                        )}

                        <FrmInput
                            name="alamat_wali"
                            label="Alamat Wali/Orangtua"
                            value={data.alamat_wali}
                            handleChange={onHandleChange}
                            required
                        />

                        {(data.ayah_masih_hidup || data.ibu_masih_hidup || '') && <div className="mt-4">
                            <label className="flex items-center">
                                <Checkbox value={wali} handleChange={onHandleChange} />

                                <span className="ml-2 text-sm text-gray-600">Bersama wali</span>
                            </label>
                        </div>}

                        {(!(data.ayah_masih_hidup || data.ibu_masih_hidup) || wali) && (
                            <>
                                <FrmInput
                                    name="nama_wali"
                                    label="Nama Wali"
                                    value={data.nama_wali}
                                    handleChange={onHandleChange}
                                    required
                                />

                                <FrmInput
                                    name="telp_wali"
                                    label="No.telp Wali"
                                    value={data.telp_wali}
                                    placeholder="08xxxxxxxxxx"
                                    handleChange={onHandleChange}
                                    required
                                />
                            </>
                        )}
                    </>
                )}

                <div className="flex items-center justify-end mt-4">
                    <Button className="ml-4" processing={processing}>
                        Lanjut
                    </Button>
                </div>
            </form>
        </Common>
    );
}
