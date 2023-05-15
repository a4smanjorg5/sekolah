import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Button from '@/Components/Button';
import Checkbox from '@/Components/Checkbox';
import Common from '@/Layouts/Common';
import BlankSection from '@/Components/BlankSection';
import FrmInput from '@/Components/FrmInput';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function(props) {
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
        kerja_ayah: props.kerja_ayah,
        hasil_ayah: props.hasil_ayah,
        nama_ibu: props.nama_ibu,
        ibu_masih_hidup: typeof props.ibu_masih_hidup == "undefined" ? !0 : (props.ibu_masih_hidup ? 1 : 0),
        telp_ibu: props.telp_ibu,
        kerja_ibu: props.kerja_ibu,
        hasil_ibu: props.hasil_ibu,
        nama_wali: props.nama_wali,
        telp_wali: props.telp_wali,
        kerja_wali: props.kerja_wali,
        hasil_wali: props.hasil_wali,
        alamat_wali: props.alamat_wali,
    }), [ wali, setWali ] = useState(),
        [ ayahKerja, setAyahKerja ] = useState(1),
        [ ibuKerja, setIbuKerja ] = useState(1);

    var harini = new Date();
    harini = harini.toISOString().split("T", 1)[0];
    harini = dayjs(harini);

    const onHandleChange = ({target}) => {
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
    };

    const unsetData = (k) => { data[k] = null };

    const submit = (e) => {
        e.preventDefault();

        if (!data.ayah_masih_hidup || wali) {
            ['telp_ayah', 'kerja_ayah', 'hasil_ayah'].forEach(unsetData);
        } else if (!ayahKerja || wali) {
            ['kerja_ayah', 'hasil_ayah'].forEach(unsetData);
        }
        if (!data.ibu_masih_hidup || wali) {
            ['telp_ibu', 'kerja_ibu', 'hasil_ibu'].forEach(unsetData);
        } else if (!ibuKerja || wali) {
            ['kerja_ibu', 'hasil_ibu'].forEach(unsetData);
        }
        if ((data.ayah_masih_hidup || data.ibu_masih_hidup) && !wali) {
            ['nama_wali', 'telp_wali', 'kerja_wali', 'hasil_wali'].forEach(unsetData);
        }

        post(route('ppdb' + (props.auth.user ? '.store' : '')), {
            preserveState: !!props.nik,
        });
    };

    const Layout = props.auth.user ? Register : Common;

    return (
        <Layout
            auth={props.auth}
            logo={props.logo}
            theme={props.theme}
        >
            <Head title="PPDB" />

            <ValidationErrors errors={props.nik ? errors : props.errors} />

            <form onSubmit={submit}>
                <FrmInput
                    name="nik"
                    label="NIK Peserta Didik"
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

                        {(data.ayah_masih_hidup || data.ibu_masih_hidup || '') && <div className="mt-4">
                            <label className="flex items-center">

                                <Checkbox value={wali} handleChange={({target}) => setWali(target.checked)} />
                                <span className="ml-2 text-sm text-gray-600">Bersama wali</span>
                            </label>
                        </div>}

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
                            <>
                                <FrmInput
                                    name="nik_ayah"
                                    label="NIK Ayah"
                                    value={data.nik_ayah}
                                    handleChange={onHandleChange}
                                    required
                                />

                                <div className="mt-4">
                                    <Label forInput="agama_ayah" value="Agama Ayah" />

                                    <select name="agama_ayah" onChange={onHandleChange} defaultValue={data.agama_ayah} required>
                                        <option value="">-- Pilih Agama --</option>
                                        <option value="protestan">Protestan</option>
                                        <option value="katolik">Katolik</option>
                                        <option value="islam">Islam</option>
                                        <option value="buddha">Buddha</option>
                                        <option value="hindu">Hindu</option>
                                    </select>
                                </div>

                                <FrmInput
                                    name="telp_ayah"
                                    label="No.telp Ayah"
                                    value={data.telp_ayah}
                                    placeholder="08xxxxxxxxxx"
                                    handleChange={onHandleChange}
                                    required
                                />

                                {!wali && <>
                                    {(data.ibu_masih_hidup || '') && <div className="mt-4">
                                        <label className="flex items-center">
                                            <Checkbox value={!ayahKerja} handleChange={({target}) => {
                                                setAyahKerja(!target.checked);
                                                if (target.checked) setIbuKerja(1);
                                            }} />

                                            <span className="ml-2 text-sm text-gray-600">Ayah Tidak Kerja</span>
                                        </label>
                                    </div>}

                                    {(ayahKerja || !data.ibu_masih_hidup) && <>
                                        <FrmInput
                                            name="kerja_ayah"
                                            label="Pekerjaan Ayah"
                                            value={data.kerja_ayah}
                                            handleChange={onHandleChange}
                                            required
                                        />
        
                                        <FrmInput
                                            name="hasil_ayah"
                                            type="number"
                                            label="Penghasilan Ayah"
                                            value={data.hasil_ayah}
                                            handleChange={onHandleChange}
                                            required
                                        />
                                    </>}
                                </>}
                            </>
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
                            <>
                                <FrmInput
                                    name="nik_ibu"
                                    label="NIK Ibu"
                                    value={data.nik_ibu}
                                    handleChange={onHandleChange}
                                    required
                                />

                                <div className="mt-4">
                                    <Label forInput="agama_ibu" value="Agama Ibu" />

                                    <select name="agama_ibu" onChange={onHandleChange} defaultValue={data.agama_ibu} required>
                                        <option value="">-- Pilih Agama --</option>
                                        <option value="protestan">Protestan</option>
                                        <option value="katolik">Katolik</option>
                                        <option value="islam">Islam</option>
                                        <option value="buddha">Buddha</option>
                                        <option value="hindu">Hindu</option>
                                    </select>
                                </div>

                                <FrmInput
                                    name="telp_ibu"
                                    label="No.telp Ibu"
                                    value={data.telp_ibu}
                                    placeholder="08xxxxxxxxxx"
                                    handleChange={onHandleChange}
                                    required
                                />

                                {!wali && <>
                                    {(data.ibu_masih_hidup || '') && <div className="mt-4">
                                        <label className="flex items-center">
                                            <Checkbox value={!ibuKerja} handleChange={({target}) => {
                                                setIbuKerja(!target.checked);
                                                if (target.checked) setAyahKerja(1);
                                            }} />

                                            <span className="ml-2 text-sm text-gray-600">Ibu Tidak Kerja</span>
                                        </label>
                                    </div>}

                                    {(ibuKerja || !data.ayah_masih_hidup) && <>
                                        <FrmInput
                                            name="kerja_ibu"
                                            label="Pekerjaan Ibu"
                                            value={data.kerja_ibu}
                                            handleChange={onHandleChange}
                                            required
                                        />
        
                                        <FrmInput
                                            name="hasil_ibu"
                                            type="number"
                                            label="Penghasilan Ibu"
                                            value={data.hasil_ibu}
                                            handleChange={onHandleChange}
                                            required
                                        />
                                    </>}
                                </>}
                            </>
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

                                <Checkbox value={wali} handleChange={({target}) => setWali(target.checked)} />
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
                                    name="nik_wali"
                                    label="NIK Wali"
                                    value={data.nik_wali}
                                    handleChange={onHandleChange}
                                    required
                                />

                                <div className="mt-4">
                                    <Label forInput="agama_wali" value="Agama Wali" />

                                    <select name="agama_wali" onChange={onHandleChange} defaultValue={data.agama_wali} required>
                                        <option value="">-- Pilih Agama --</option>
                                        <option value="protestan">Protestan</option>
                                        <option value="katolik">Katolik</option>
                                        <option value="islam">Islam</option>
                                        <option value="buddha">Buddha</option>
                                        <option value="hindu">Hindu</option>
                                    </select>
                                </div>

                                <FrmInput
                                    name="telp_wali"
                                    label="No.telp Wali"
                                    value={data.telp_wali}
                                    placeholder="08xxxxxxxxxx"
                                    handleChange={onHandleChange}
                                    required
                                />

                                <FrmInput
                                    name="kerja_wali"
                                    label="Pekerjaan Wali"
                                    value={data.kerja_wali}
                                    handleChange={onHandleChange}
                                    required
                                />

                                <FrmInput
                                    name="hasil_wali"
                                    type="number"
                                    label="Penghasilan Wali"
                                    value={data.hasil_wali}
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
        </Layout>
    );
}

function Register({ auth, logo, theme, children }) {
    return (
        <Authenticated
            auth={auth}
            logo={logo}
            theme={theme}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Penerimaan Peserta Didik Baru
            </h2>}
        >
            <BlankSection>{children}</BlankSection>
        </Authenticated>
    );
}
