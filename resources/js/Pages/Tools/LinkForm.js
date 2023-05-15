import React, { useRef, useState } from 'react';
import ActionMessage from '@/Components/ActionMessage';
import Button from '@/Components/Button';
import FormSection from '@/Components/FormSection';
import Input from '@/Components/Input';
import InputError from '@/Components/InputError';
import Label from '@/Components/Label';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/inertia-react';

export default function LinkForm() {
    const { data, setData, post, processing, reset, recentlySuccessful, errors } = useForm({
        label: '',
        href: '',
    }), iconEl = useRef(), [iconPreview, setIconPreview] = useState();

    const selectNewIcon = () => {
        iconEl.current.click();
    };

    const updateIconPreview = () => {
        const icon = iconEl.current.files[0];
        if (icon) {
            if (iconPreview)
                URL.revokeObjectURL(iconPreview);
            setIconPreview(URL.createObjectURL(icon));
            setData('icon', icon);
        }
    };

    const onHandleChange = ({ target }) => {
        setData(target.name, target.value);
    };

    const onSubmit = () => {
        post(route('links'), {
            errorBag: 'addLink',
            onSuccess: () => {
                if (iconPreview) {
                    URL.revokeObjectURL(iconPreview);
                    setIconPreview(null);
                }
                reset();
            },
            preserveScroll: !0,
        });
    };

    return (
        <FormSection submitted={onSubmit} title="Tambah Tautan"
            description="Menambah tautan untuk informasi tambahan pada identitas situs ini"
            actions={<>
                <ActionMessage on={recentlySuccessful} className="mr-3">
                    Tertaut.
                </ActionMessage>

                <Button processing={processing}>
                    Tambah
                </Button>
            </>}
        >
            <div className="col-span-6 sm:col-span-4">
                <Label value="Label" />
                <Input
                    id="label" type="text" name="label"
                    className="mt-1 block w-full"
                    length="60" value={data.label} autoComplete="off"
                    handleChange={onHandleChange} required
                />
                <InputError message={errors.label} className="mt-2" />
            </div>

            <div className="col-span-6 sm:col-span-4">
                <input type="file" className="hidden"
                            accept="image/svg+xml"
                            ref={iconEl}
                            onChange={updateIconPreview} />

                <Label value="Ikon" />

                <div className="mt-2" style={{ display: iconPreview ? "block" : "none" }}>
                    <span className="block w-20 h-20 bg-contain bg-no-repeat bg-center"
                          style={{ backgroundImage: "url(" + iconPreview + ")" }}>
                    </span>
                </div>

                <SecondaryButton className="mt-2 mr-2" type="button" handleClick={selectNewIcon}>
                    Pilih Icon Baru
                </SecondaryButton>

                <InputError message={errors.icon} className="mt-2" />
            </div>

            <div className="col-span-6 sm:col-span-4">
                <Label value="Url" />
                <Input
                    id="href" type="text" name="href"
                    className="mt-1 block w-full"
                    length="60" value={data.href} autoComplete="off"
                    handleChange={onHandleChange} required
                />
                <InputError message={errors.href} className="mt-2" />
            </div>
        </FormSection>
    );
}
