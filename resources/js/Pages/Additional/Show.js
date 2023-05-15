import React from 'react';
import Button from '@/Components/Button';
import Authenticated from '@/Layouts/Authenticated';
import Guest from '@/Layouts/Guest';
import { Head, useForm } from '@inertiajs/inertia-react';

export default function Show(props) {
    const { data, setData, put, processing } = useForm({
        judul: props.current.judul,
        paragraf: props.current.paragraf || '',
    }), media = props.current.media;

    const handleChange = ({ target }) => {
        setData(target.name, target.value);
    };

    const Layout = props.auth.user ? Authenticated : Guest;
    return (
        <Layout
            auth={props.auth}
            bgStyle={props.bgStyle}
            canEntry={props.canEntry}
            canLogin={props.canLogin}
            canRegister={props.canRegister}
            logo={props.logo}
            info={props.info}
            theme={props.theme}
            footer={props.footer}
            header={props.auth.user ? (<form
                className="flex justify-between space-x-4"
                onSubmit={(e) => { e.preventDefault(); put(route('pages.update', {page: props.current.id})) }}
            >
                <input
                    name="judul"
                    value={data.judul}
                    className="border font-semibold text-xl text-gray-800 leading-tight w-full"
                    onChange={handleChange}
                />
                <Button processing={processing}>Posting</Button>
            </form>) : (<h2 className="font-semibold text-xl text-gray-800 leading-tight w-full">{data.judul}</h2>)}
        >
            <Head title="Halaman Tambahan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {media && <center><img className="block" src={(media.thumbnail_url || media.media_url)} /></center>}
                            {props.auth.user ? (<textarea
                                name="paragraf"
                                value={data.paragraf}
                                className="w-full h-auto"
                                style={{minHeight: '6rem'}}
                                onChange={handleChange}
                            />) : (
                                data.paragraf && data.paragraf.split(/\r\n|\n\r|[\n\r]/).map(
                                    p => <p>{p}</p>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
