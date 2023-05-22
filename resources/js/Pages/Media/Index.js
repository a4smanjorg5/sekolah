import React from 'react';
import Guest from '@/Layouts/Guest';
import BlankSection from '@/Components/BlankSection';
import Galeri from '@/Components/Galeri';
import { Head, Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default function Index(props) {
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Galeri {props.ig ? <a href={'https://www.instagram.com/' + props.ig.username} target="ig" className="text-gray-700 underline">
                    {props.ig.name}
                </a> : 'SunriseKids'}
            </h2>}
        >
            <Head title="Galeri" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <BlankSection>
                        <Galeri page={props.mediaPage} />
                    </BlankSection>
                </div>
            </div>
        </Guest>
    );
}
