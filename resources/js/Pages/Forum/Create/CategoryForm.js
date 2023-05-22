import React, { useRef, useState } from 'react';
import ActionMessage from '@/Components/ActionMessage';
import Button from '@/Components/Button';
import FormSection from '@/Components/FormSection';
import Input from '@/Components/Input';
import InputError from '@/Components/InputError';
import Label from '@/Components/Label';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/inertia-react';

export default function CategoryForm() {
    const { data, setData, post, processing, reset, recentlySuccessful, errors } = useForm({
        name: '',
    });

    const onHandleChange = ({ target }) => {
        switch (target.type) {
        case 'select-one':
            setData(target.name, target.selectedOptions[0].value);
            break;
        default:
            setData(target.name, target.value);
            break;
        }
    };

    const onSubmit = () => {
        post(route('forum.categories.store'), {
            errorBag: 'addCategory',
            onSuccess: () => reset(),
        });
    };

    return (
        <FormSection submitted={onSubmit} title="Kategori"
            description="Menambah kategori"
            actions={<>
                <ActionMessage on={recentlySuccessful} className="mr-3">
                    Terajukan.
                </ActionMessage>

                <Button processing={processing}>
                    Ajukan
                </Button>
            </>}
        >
            <div className="col-span-6 sm:col-span-4">
                <Label value="Nama" />
                <Input
                    id="name" type="text" name="name"
                    className="mt-1 block w-full"
                    length="60" value={data.name} autoComplete="off"
                    handleChange={onHandleChange}
                    required
                />
                <InputError message={errors.name} className="mt-2" />
            </div>
        </FormSection>
    );
}
