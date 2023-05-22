import React, { useRef, useState } from 'react';
import ActionMessage from '@/Components/ActionMessage';
import Button from '@/Components/Button';
import FormSection from '@/Components/FormSection';
import Input from '@/Components/Input';
import InputError from '@/Components/InputError';
import Label from '@/Components/Label';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/inertia-react';

export default function TopicForm({ categories }) {
    const { data, setData, post, processing, reset, recentlySuccessful, errors } = useForm({
        name: '',
        category_id: '',
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
        post(route('forum.topics.store'), {
            errorBag: 'addTopic',
            onSuccess: () => reset(),
        });
    };

    return (
        <FormSection submitted={onSubmit} title="Topik"
            description="Menambah topik"
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

            <div className="col-span-6 sm:col-span-4">
                <Label value="Kategori" />
                <select name="category_id" value={data.category_id} className="w-full" onChange={onHandleChange} required>
                    <option value="">-- pilih kategori --</option>
                    {categories.map(c => <option key={'c'+c.id} value={c.id}>{c.name}</option>)}
                </select>
                <InputError message={errors.category_id} className="mt-2" />
            </div>
        </FormSection>
    );
}
