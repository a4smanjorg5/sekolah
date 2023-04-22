import React from 'react';
import BlankSection from '@/Components/BlankSection';
import Guest from '@/Layouts/Guest';
import { Head, Link } from '@inertiajs/inertia-react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

export default function Welcome(props) {
    return (
        <Guest
            auth={props.auth}
            bgStyle={props.bgStyle}
            logo={props.logo}
            canEntry={props.canEntry}
            canLogin={props.canLogin}
            canRegister={props.canRegister}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Selamat Datang di Sekolah SunriseKids</h2>}
        >
            <Head title="Selamat Datang" />

            {(props.carousel.length || props.featured.length) ? (
                <div className="py-12">
                    {(props.carousel.length || '') && <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <Slide>
                            {props.carousel.map(({ id, media: { media_url, thumbnail_url }, judul, paragraf }) => <div
                                key={'ci' + id} className="bg-cover bg-center h-36 sm:h-96"
                                style={{ backgroundImage: "url(" + (thumbnail_url || media_url) + ")" }}
                            >
                            </div>)}
                        </Slide>
                    </div>}
                    {(props.featured.length || '') && <div className="max-w-7xl mx-auto sm:px-6 sm:grid sm:grid-cols-3 sm:gap-6 lg:px-8">
                        {props.featured.map((p, i) => <div key={p.id} className={'shadow overflow-hidden sm:rounded-md ' + (i == 0 ? 'sm:col-span-3' : 'mt-8 sm:mt-auto')}>
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <Link href={route('pages.show', p.id)} className="block font-semibold text-xl text-gray-800 leading-tight">{p.judul}</Link>
                                <p>{p.paragraf}</p>
                            </div>
                        </div>)}
                    </div>}
                </div>
            ) : (
                <BlankSection>
                    Situs sedang dalam konstruksi...
                </BlankSection>
            )}
        </Guest>
    );
}
