import React, { useRef, useState } from 'react';
import ActionMessage from '@/Components/ActionMessage';
import Button from '@/Components/Button';
import FormSection from '@/Components/FormSection';
import Input from '@/Components/Input';
import InputError from '@/Components/InputError';
import Label from '@/Components/Label';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/inertia-react';

export default function InfoForm({ addr, npsn, marquee, }) {
    const { data, setData, post, processing, reset, recentlySuccessful, errors } = useForm({
        addrLabel: addr.label,
        addrUrl: addr.url,
        npsn, marquee,
    }), iconEl = useRef(), [iconPreview, setIconPreview] = useState();

    const onHandleChange = ({ target }) => {
        setData(target.name, target.value);
    };

    const onSubmit = () => {
        post(route('tools'), {
            preserveScroll: !0,
        });
    };

    return (
        <FormSection submitted={onSubmit} title="Informasi Tambahan"
            description="Memperbarui informasi tambahan pada identitas situs ini"
            actions={<>
                <ActionMessage on={recentlySuccessful} className="mr-3">
                    Diperbarui.
                </ActionMessage>

                <Button processing={processing}>
                    Perbarui
                </Button>
            </>}
        >
            <div className="col-span-6 sm:col-span-4">
                <Label value="NPSN" />
                <Input
                    id="npsn" type="text" name="npsn"
                    className="mt-1 block w-full"
                    length="60" value={data.npsn} autoComplete="off"
                    handleChange={onHandleChange} required
                />
                <InputError message={errors.npsn} className="mt-2" />
            </div>

            <div className="col-span-6 sm:col-span-4">
                <Label value="Pesan Teks Bergerak" />
                <Input
                    id="marquee" type="text" name="marquee"
                    className="mt-1 block w-full"
                    length="60" value={data.marquee} autoComplete="off"
                    handleChange={onHandleChange}
                />
                <InputError message={errors.marquee} className="mt-2" />
            </div>

            <div className="col-span-6 sm:col-span-4">
                <Label value="Label Jalan" />
                <Input
                    id="addrLabel" type="text" name="addrLabel"
                    className="mt-1 block w-full"
                    length="60" value={data.addrLabel} autoComplete="off"
                    handleChange={onHandleChange} required
                />
                <InputError message={errors.addrLabel} className="mt-2" />
            </div>

            <div className="col-span-6 sm:col-span-4">
                <Label value="Url Jalan" />
                <Input
                    id="addrUrl" type="text" name="addrUrl"
                    className="mt-1 block w-full"
                    length="60" value={data.addrUrl} autoComplete="off"
                    handleChange={onHandleChange} required
                />
                <InputError message={errors.addrUrl} className="mt-2" />
            </div>
        </FormSection>
    );
}
