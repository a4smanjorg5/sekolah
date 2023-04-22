import React from 'react';
import ActionMessage from '@/Components/ActionMessage';
import Button from '@/Components/Button';
import SecondaryButton from '@/Components/SecondaryButton';
import FormSection from '@/Components/FormSection';
import { useForm } from '@inertiajs/inertia-react';

export default function HomepageForm({
    items, pages, routeName = 'tools', title, name,
    description = 'Susun halaman unggulan anda untuk ditampilkan ke beranda.',
}) {
    const { data, setData, post, processing, reset, recentlySuccessful, errors } = useForm({
        [name]: items,
    });

    const onSubmit = () => {
        post(route(routeName), {
            onSuccess: () => reset(),
            preserveScroll: !0,
        });
    };

    const addItem = () => {
        data[name].push(0);
        setData(name, data[name]);
    };

    const removeItem = (index) => {
        data[name].splice(index, 1);
        setData(name, data[name]);
    };

    const updateItem = (index, value) => {
        data[name][index] = value;
        setData(name, data[name]);
    };

    return (
        <FormSection
            submitted={onSubmit}
            actions={<>
                <ActionMessage on={recentlySuccessful} className="mr-3">
                    Terposting.
                </ActionMessage>

                <Button processing={processing}>
                    Posting
                </Button>
                {/*<SecondaryButton handleClick={() => reset()}>
                    Batal
                </SecondaryButton>*/}
            </>}
            title={title}
            description={description}
        >
            {data[name].length ? data[name].map((ci, k) => <div key={'ci' + k} className="col-span-6 sm:col-span-4">
                <select value={(ci || '')} onChange={({ target }) => updateItem(k, target.selectedOptions[0].value)} required>
                    <option value="">-- pilih halaman --</option>
                    {pages.map(p => <option value={p.id} key={name + p.id}>{p.judul}</option>)}
                </select>
                <SecondaryButton handleClick={() => removeItem(k)}>Hapus</SecondaryButton>
            </div>) : <div className="col-span-6 sm:col-span-4">belum ada tambahan halaman</div>}
            <div className="col-span-6 sm:col-span-4">
                <SecondaryButton handleClick={addItem}>Tambah Data</SecondaryButton>
            </div>
        </FormSection>
    );
}
