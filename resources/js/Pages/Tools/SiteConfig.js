import React from 'react';
import CommonSection from '@/Components/CommonSection';
import Label from '@/Components/Label';
import LogoSection from './LogoSection';
import { Inertia } from '@inertiajs/inertia';

const colors = [
    'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange',
    'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky',
    'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
];

export default function SiteConfig(config) {
    const handleChange = ({ target, data }) => {
        const send = data || {};
        if (target)
            switch (target.type) {
            case 'checkbox':
                send[target.name] = target.checked ? 1 : 0;
                break;
            case 'select-one':
                send[target.name] = target.selectedOptions[0].value;
                break;
            default:
                send[target.name] = target.value;
                break;
            }
        Inertia.post(route('tools'), send);
    }

    return (
        <CommonSection title="Konfigurasi Situs" description="Mengubah status penerimaan, logo dan konfigurasi lainnya">
            <div className="col-span-6 sm:col-span-4">
                <Label for="pb" value="Status Penerimaan" />
                <select name="pb" defaultValue={config.pb} onChange={handleChange}>
                    <option value="">Tidak ada</option>
                    <option value="ppdb">Peserta Didik</option>
                    <option value="ppb">Pegawai/Guru</option>
                </select>
            </div>

            <LogoSection current={config.logo} changed={handleChange} />

            <div className="col-span-6 sm:col-span-4">
                <Label value="Warna Tema" />
                <select name="theme" defaultValue={config.theme} onChange={handleChange}>
                    {colors.map(c =>
                        <option value={c} className={`bg-${c}-200 text-${c}-700`}>{c[0].toUpperCase() + c.substr(1)}</option>
                    )}
                </select>
            </div>
        </CommonSection>
    );
}
