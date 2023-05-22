import React, { useState } from 'react';
import Guest from '@/Layouts/Guest';
import ActionMessage from '@/Components/ActionMessage';
import BlankSection from '@/Components/BlankSection';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Create(props) {
    const { data, setData, post, processing, reset, recentlySuccessful, errors } = useForm({
        title: '',
        topic_id: '',
        body: '',
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

    const submitted = () => {
        post(route('forum.threads.store'));
    };

    return (
        <Guest
            auth={props.auth}
            bgStyle={props.bgStyle}
            canEntry={props.canEntry}
            canLogin={props.canLogin}
            canRegister={props.canRegister}
            logo={props.logo}
            theme={props.theme}
            info={props.info}
            header={<h2 className={`font-semibold text-xl text-${props.theme}-800 leading-tight`}>
                Ajukan Pembahasan Baru
            </h2>}
        >
            <Head title="Pengajuan Pembahasan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <BlankSection theme={props.theme}>
                        <ValidationErrors errors={errors} />

                        <form className="w-full" onSubmit={e => { e.preventDefault(); submitted() }}>
                            <table className="w-full">
                                <tr>
                                    <td>Judul</td>
                                    <td>:</td>
                                    <td><Input name="title" value={data.title} className="w-full" handleChange={onHandleChange} required /></td>
                                </tr>
                                <tr>
                                    <td>Kategori</td>
                                    <td>:</td>
                                    <td><select name="topic_id" value={data.topic_id} className="w-full" onChange={onHandleChange} required>
                                        <option value="">-- pilih kategori --</option>
                                        {props.categories.map(c => <option key={'c'+c.id} value={c.id}>{c.name}</option>)}
                                    </select></td>
                                </tr>
                                <tr><td colSpan="3">
                                    <Label>Bahasan</Label>
                                    <textarea name="body" className="w-full" rows="4" onChange={onHandleChange} required></textarea>
                                </td></tr>
                                <tr><td colSpan="3" align="right">
                                    <ActionMessage on={recentlySuccessful} className="mr-3">
                                        Terajukan.
                                    </ActionMessage>
                                    <Button processing={processing}>Ajukan</Button>
                                </td></tr>
                            </table>
                        </form>
                    </BlankSection>
                </div>
            </div>
        </Guest>
    );
}
