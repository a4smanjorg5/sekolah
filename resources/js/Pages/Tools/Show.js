import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import HomepageForm from './HomepageForm';
import LogoSection from './LogoSection';
import Penerimaan from './Penerimaan';
import PageForm from './PageForm';
import PostForm from './PostForm';
import SectionBorder from '@/Components/SectionBorder';

export default function Show(props) {
    const onHandleChange = ({ target, data }) => {
        const send = data || {};
        if (target)
            switch (target.type) {
            case 'checkbox':
                send[target.name] = target.checked ? 1 : 0;
                break;
            case 'select-one':
                send[target.name] = target.selectedOptions[0].value;
                break;
            default:
                send[target.name] = target.value;
                break;
            }
        Inertia.post(route('tools'), send);
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            logo={props.logo}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Alat</h2>}
        >
            <Head title="Alat" />

            <div>
                <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                    <Penerimaan defaultValue={props.pb} handleChange={onHandleChange} />

                    <SectionBorder />

                    <LogoSection current={props.logo} changed={onHandleChange} />

                    <SectionBorder />

                    <PostForm />

                    <SectionBorder />

                    <PageForm mediaPage={props.mediaPage} />

                    <SectionBorder />

                    <HomepageForm
                        items={props.ci} pages={props.pages.filter(p => p.id_media != 0)}
                        name="carousel"
                        title="Carousel"
                    />

                    <SectionBorder />

                    <HomepageForm
                        items={props.featured} pages={props.pages}
                        name="featured"
                        title="Grid"
                    />
                </div>
            </div>
        </Authenticated>
    );
}
