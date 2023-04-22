import React from 'react';
import CommonSection from '@/Components/CommonSection';

export default function Penerimaan({defaultValue, handleChange}) {
    return (
        <CommonSection title="Status Penerimaan" description="Memperbarui status penerimaan">
            <div className="col-span-6 sm:col-span-4">
                <select name="pb" defaultValue={defaultValue} onChange={handleChange}>
                    <option value="">Tidak ada</option>
                    <option value="ppdb">Peserta Didik</option>
                    <option value="ppb">Pegawai/Guru</option>
                </select>
            </div>
        </CommonSection>
    );
}
