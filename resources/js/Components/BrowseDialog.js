import React, { useState } from 'react';
import DialogModal from '@/Components/DialogModal';
import Galeri from '@/Components/Galeri';
import SecondaryButton from '@/Components/SecondaryButton';

export default function BrowseDialog({
    reactNode: SelectComponent,
    page, selected,
    title = 'Pilih Item',
    description = 'Silahkan anda pilih item berikut.',
    children,
}) {
    const [selecting, setSelecting] = useState(null);

    const closeDialog = () => { setSelecting(null); selected(null) };

    const startSelect = async () => {
        const data = page && typeof page.then == 'function'
            ? await page : page;
        if (data) setSelecting(data);
    };

    return (
        <>
            <span onClick={startSelect}>
                {children}
            </span>

            <DialogModal show={(selecting ? true : false)}
                onClose={closeDialog}
                footer={<SecondaryButton handleClick={closeDialog}>Batal</SecondaryButton>}
                title={title}
            >
                {description}

                <div className="mt-4">
                    <SelectComponent selected={item => { closeDialog(); selected(item) }} page={selecting} />
                </div>
            </DialogModal>
        </>
    );
}
