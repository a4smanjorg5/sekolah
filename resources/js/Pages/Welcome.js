import React from 'react';
import Guest from '@/Layouts/Guest';
import { Head } from '@inertiajs/inertia-react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

export default function Welcome(props) {
    return (
        <Guest
            auth={props.auth}
            canEntry={props.canEntry}
            canLogin={props.canLogin}
            canRegister={props.canRegister}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Selamat Datang di Sekolah SunriseKids</h2>}
        >
            <Head title="Selamat Datang" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <Slide>
                                <div>
                                    <span>Slide 1</span>
                                </div>
                                <div>
                                    <span>Slide 2</span>
                                </div>
                                <div>
                                    <span>Slide 3</span>
                                </div>
                            </Slide>
                        </div>
                    </div>
                </div>
            </div>
        </Guest>
    );
}
