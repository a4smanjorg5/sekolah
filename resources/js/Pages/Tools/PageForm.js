import React, { useRef, useState } from 'react';
import ActionMessage from '@/Components/ActionMessage';
import BrowseDialog from '@/Components/BrowseDialog';
import Button from '@/Components/Button';
import FormSection from '@/Components/FormSection';
import Galeri from '@/Components/Galeri';
import Input from '@/Components/Input';
import InputError from '@/Components/InputError';
import Label from '@/Components/Label';
import SecondaryButton from '@/Components/SecondaryButton';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';

export default function PageForm({ mediaPage }) {
    const { data, setData, post, processing, reset, recentlySuccessful, errors } = useForm({
        judul: '',
        id_media: 0,
        paragraf: '',
    }), [mediaPreview, setMediaPreview] = useState(null),
      trying = useRef(0);

    const onSubmit = () => {
        post(route('pages.store'), {
            errorBag: 'publishPage',
            onSuccess: () => { setMediaPreview(null); reset() },
            preserveScroll: !0,
        });
    };

    const listMedia = ({target}) => {
        const targetState = target.disabled;
        mediaPage || Inertia.reload({
            onStart: () => { target.disabled = !0 },
            onFinish: () => {
                target.disabled = targetState;
                if (trying.current < 3) {
                    trying.current++;
                    target.click();
                } else trying.current = 0;
            },
            only: ['mediaPage'],
        });
    }

    const updateMediaPreview = (media) => {
        setMediaPreview(media && media.preview);
        setData('id_media', (media || 0) && media.id);
    };

    const onHandleChange = ({ target }) => {
        setData(target.name, target.value);
    };

    return (
        <FormSection submitted={onSubmit} title="Buat Halaman"
            description="Membuat suatu halaman ke situs."
            actions={<>
                <ActionMessage on={recentlySuccessful} className="mr-3">
                    Terposting.
                </ActionMessage>

                <Button processing={processing}>
                    Posting
                </Button>
            </>}
        >
            <div className="col-span-6 sm:col-span-4">
                <Label for="judul" value="Judul" />
                <Input
                    id="judul" type="text" name="judul"
                    className="mt-1 block w-full"
                    length="60" value={data.judul} autoComplete="off"
                    handleChange={onHandleChange} required
                />
                <InputError message={errors.judul} className="mt-2" />
            </div>

            <div className="col-span-6 sm:col-span-4">
                <Label for="media" value="Media" />

                <div className="mt-2" style={{ display: mediaPreview ? "block" : "none" }}>
                    <span className="block w-20 h-20"
                          style={{ backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundImage: "url(" + mediaPreview + ")" }}>
                    </span>
                </div>

                <BrowseDialog page={mediaPage} reactNode={Galeri} selected={updateMediaPreview}>
                    <SecondaryButton className="mt-2 mr-2" handleClick={listMedia} type="button">
                        Pilih Media
                    </SecondaryButton>
                </BrowseDialog>

                <InputError message={errors.id_media} className="mt-2" />
            </div>

            <div className="col-span-6 sm:col-span-4">
                <Label for="paragraf" value="Paragraf" />
                <textarea
                    id="paragraf" name="paragraf"
                    className="mt-1 block w-full"
                    value={data.paragraf} autoComplete="off"
                    onChange={onHandleChange}
                    required={!data.id_media}
                />
                <InputError message={errors.paragraf} className="mt-2" />
            </div>
        </FormSection>
    );
}
