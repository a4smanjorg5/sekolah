import React, { useRef } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import CommonSection from '@/Components/CommonSection';
import Label from '@/Components/Label';
import SecondaryButton from '@/Components/SecondaryButton';

export default function LogoSection({current, changed}) {
    const image = useRef(), reader = new FileReader;
    reader.addEventListener('load', () => {
        changed({data: { logo: reader.result }})
    });

    const handleChange = ({ target }) => {
        if (target.files[0]) 
            reader.readAsDataURL(target.files[0]);
    };

    return (
        <>
            <div className="col-span-6 sm:col-span-4">
                <Label value="Logo Situs" />
                <input type="file" className="hidden"
                    accept="image/*"
                    ref={image}
                    onChange={handleChange}
                />

                <ApplicationLogo src={current} />

                <SecondaryButton className="mt-2 mr-2" type="button" handleClick={() => image.current.click()}>
                    Pilih Logo Baru
                </SecondaryButton>

                {current && <SecondaryButton className="mt-2" type="button" handleClick={() => changed({data: { logo: '' }})}>
                    Hapus
                </SecondaryButton>}
            </div>
        </>
    );
}
