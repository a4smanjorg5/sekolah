import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Common from '@/Layouts/Common';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Register({ logo, auth, select }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: (select && select.name) || '',
        email: (select && select.email) || '',
        password: '',
        password_confirmation: '',
        major: (select && select.major) || '',
        univ: (select && select.univ) || '',
        nuptk: (select && select.nuptk) || '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        if (select) {
            put(route('users.update', select.id));
        } else {
            post(route(auth.user ? 'users.store' : 'register'));
        }
    };

    return (
        <Common logo={logo}>
            <Head title="Daftar" />

            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
                <div>
                    <Label forInput="name" value="Nama" />

                    <Input
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="email" value="Email" />

                    <Input
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="password" value="Sandi" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required={!select}
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="password_confirmation" value="Konfirmasi Sandi" />

                    <Input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required={!select}
                    />
                </div>

                <div>
                    <Label forInput="major" value="Jurusan" />

                    <Input
                        type="text"
                        name="major"
                        value={data.major}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                    />
                </div>

                <div>
                    <Label forInput="univ" value="Universitas" />

                    <Input
                        type="text"
                        name="univ"
                        value={data.univ}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                    />
                </div>

                <div>
                    <Label forInput="nuptk" value="NUPTK" />

                    <Input
                        type="text"
                        name="nuptk"
                        value={data.nuptk}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    {!auth.user && <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
                        Sudah mendaftar?
                    </Link>}

                    <Button className="ml-4" processing={processing}>
                        Daftar
                    </Button>
                </div>
            </form>
        </Common>
    );
}
