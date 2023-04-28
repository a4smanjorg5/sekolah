import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import HomepageForm from './HomepageForm';
import SiteConfig from './SiteConfig';
import PageForm from './PageForm';
import PostForm from './PostForm';
import SectionBorder from '@/Components/SectionBorder';

export default function Show({ pb, logo, ...props }) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            logo={logo}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Alat</h2>}
        >
            <Head title="Alat" />

            <div>
                <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                    <SiteConfig {...({ pb, logo, })} />

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
