import React from 'react';
import ActionMessage from '@/Components/ActionMessage';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import SecondaryButton from '@/Components/SecondaryButton';
import FormSection from '@/Components/FormSection';
import { useForm } from '@inertiajs/inertia-react';

export default function TelsForm({ tels }) {
    const { data, setData, post, processing, reset, recentlySuccessful, errors } = useForm({
        tels,
    }), PARAM_NAME = 'tels';

    const onSubmit = () => {
        post(route('tools'), {
            onSuccess: () => reset(),
            preserveScroll: !0,
        });
    };

    const addItem = () => {
        data.tels.push('');
        setData(PARAM_NAME, data.tels);
    };

    const removeItem = (index) => {
        data.tels.splice(index, 1);
        setData(PARAM_NAME, data.tels);
    };

    const updateItem = (index, value) => {
        data.tels[index] = value;
        setData(PARAM_NAME, data.tels);
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
            </>}
            title={'Nomor Telepon'}
            description={'Memperbarui no. telepon untuk dihubungi'}
        >
            {data.tels.length ? data.tels.map((telp, k) => <div key={'telp' + k} className="col-span-6 sm:col-span-4">
                <input
                    type="tel"
                    value={telp}
                    pattern="(08|\u{2b})[1-9][0-9]{5,11}"
                    onChange={({ target }) => updateItem(k, target.value)}
                    className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    required
                />
                <SecondaryButton handleClick={() => removeItem(k)}>Hapus</SecondaryButton>
            </div>) : <div className="col-span-6 sm:col-span-4">belum ada nomor telp</div>}
            <div className="col-span-6 sm:col-span-4">
                <SecondaryButton handleClick={addItem}>Tambah Data</SecondaryButton>
            </div>
        </FormSection>
    );
}
