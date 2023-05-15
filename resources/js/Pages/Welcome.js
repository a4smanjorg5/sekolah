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
            theme={props.theme}
            info={props.info}
            canEntry={props.canEntry}
            canLogin={props.canLogin}
            canRegister={props.canRegister}
            header={<h2 className="font-semibold text-xl leading-tight">Selamat Datang di Sekolah SunriseKids</h2>}
        >
            <Head title="Selamat Datang" />

            {(props.carousel.length || props.featured.length) ? (
                <div className="py-12">
                    {(props.carousel.length || '') && <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <Slide>
                            {props.carousel.map(({ id, media: { media_url, thumbnail_url }, judul, paragraf }) => <div
                                key={'ci' + id} className="bg-cover bg-center relative h-36 sm:h-96"
                                style={{ backgroundImage: "url(" + (thumbnail_url || media_url) + ")" }}
                            >
                                <div className="bg-white/60 rounded-sm p-2 absolute bottom-2 left-16 w-1/3 sm:bottom-16 sm:rounded-md sm:p-6 sm:w-2/5">
                                    <Link href={route('pages.show', {page: id})} className="line-clamp-1 font-semibold text-lg sm:text-xl">{judul}</Link>
                                    <div className="line-clamp-3">{paragraf.split(/\r\n|\n\r|[\n\r]/)[0]}</div>
                                </div>
                            </div>)}
                        </Slide>
                    </div>}
                    {(props.featured.length || '') && <div className="max-w-7xl mx-auto sm:px-6 sm:grid sm:grid-cols-3 sm:gap-6 lg:px-8">
                        {props.featured.map((p, i) => <div key={p.id} className={'shadow overflow-hidden sm:rounded-md ' + (i == 0 ? 'sm:col-span-3' : 'mt-8 sm:mt-auto')}>
                            <div className="px-4 py-5 md:flex bg-white/80 sm:p-6">
                                {i == 0 && p.media && <div
                                    style={{ backgroundImage: "url(" + (p.media.thumbnail_url || p.media.media_url) + ")" }}
                                    className="bg-cover bg-center w-40 md:w-80 mr-8 aspect-[3/4]"
                                ></div>}
                                <div>
                                    <Link href={route('pages.show', p.id)} className="line-clamp-1 font-semibold text-lg sm:text-xl">{p.judul}</Link>
                                    <p {...(i > 0 ? { className: 'line-clamp-4 sm:line-clamp-7' } : {})}>{p.paragraf}</p>
                                </div>
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
