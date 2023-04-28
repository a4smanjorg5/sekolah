import React from 'react';
import Guest from '@/Layouts/Guest';
import { Head } from '@inertiajs/inertia-react';

export default function Show(props) {
    return (
        <Guest
            auth={props.auth}
            bgStyle={props.bgStyle}
            canEntry={props.canEntry}
            canLogin={props.canLogin}
            canRegister={props.canRegister}
            logo={props.logo}
            tel={props.tel}
            addr={props.addr}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Foto SunriseKids</h2>}
        >
            <Head title="Foto" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            sedang dibangun...
                        </div>
                    </div>
                </div>
            </div>
        </Guest>
    );
}
