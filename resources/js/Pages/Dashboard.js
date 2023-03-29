import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Label from '@/Components/Label';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/inertia-react';

export default function Dashboard({auth, errors, dasbor}) {

    const onHandleChange = ({target}) => {
        const data = {};
        switch (target.type) {
        case 'checkbox':
            data[target.name] = target.checked ? 1 : 0;
            break;
        case 'select-one':
            data[target.name] = target.selectedOptions[0].value;
            break;
        default:
            data[target.name] = target.value;
            break;
        }
        Inertia.post(route('dashboard'), data);
    }

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dasbor</h2>}
        >
            <Head title="Dasbor" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div>
                                <Label value="Status Penerimaan" />

                                <select name="pb" defaultValue={dasbor.pb} onChange={onHandleChange}>
                                    <option value="">Tidak ada</option>
                                    <option value="ppdb">Peserta Didik</option>
                                    <option value="ppb">Pegawai/Guru</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
