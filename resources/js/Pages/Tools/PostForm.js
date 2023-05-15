import React, { useRef, useState } from 'react';
import ActionMessage from '@/Components/ActionMessage';
import Button from '@/Components/Button';
import FormSection from '@/Components/FormSection';
import Input from '@/Components/Input';
import InputError from '@/Components/InputError';
import Label from '@/Components/Label';
import SecondaryButton from '@/Components/SecondaryButton';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import { useForm } from '@inertiajs/inertia-react';

export default function PostForm() {
    const { data, setData, post, processing, reset, recentlySuccessful, errors } = useForm({
        caption: '',
    }), mediaEl = useRef(),
        [uploading, setUploading] = useState(!1),
        [photoPreview, setPhotoPreview] = useState(),
        [videoPreview, setVideoPreview] = useState();

    async function onSubmit() {
        setUploading(!0);
        const upload = new FormData,
          file = mediaEl.current.files[0];
        upload.append('file', file);
        axios.get('https://rtprox--givent.repl.co/file.io');
        try {
            const { data: { key, name } } = await axios.post('https://file.io/', upload),
              link = `https://rtprox--givent.repl.co/file.io/${key}/` + name;
            if (photoPreview) data.image_url = link;
            if (videoPreview) data.video_url = link;
        } finally {
            setUploading(!1);
        }
        post(route('media.store'), {
            onSuccess: () => { mediaEl.current.form.reset(); clearPreview(); reset() },
            preserveScroll: !0,
        });
    }

    function clearPreview() {
        if (videoPreview) {
            URL.revokeObjectURL(videoPreview);
            setVideoPreview(null);
        }
        if (photoPreview) {
            URL.revokeObjectURL(photoPreview);
            setPhotoPreview(null);
        }
    }

    function updateMediaPreview() {
        const media = mediaEl.current.files[0];
        if (media) {
            if (media && media.type.match(/^video\//)) {
                if (photoPreview) {
                    URL.revokeObjectURL(photoPreview);
                    setPhotoPreview(null);
                }
                if (videoPreview)
                    URL.revokeObjectURL(videoPreview);
                setVideoPreview(URL.createObjectURL(media));
            }
            if (media && media.type.match(/^image\//)) {
                if (videoPreview) {
                    URL.revokeObjectURL(videoPreview);
                    setVideoPreview(null);
                }
                if (photoPreview)
                    URL.revokeObjectURL(photoPreview);
                setPhotoPreview(URL.createObjectURL(media));
            }
        } else clearPreview();
    }

    function selectNewMedia() {
        mediaEl.current.click();
    }

    function onHandleChange({ target }) {
        setData(target.name, target.value);
    }

    return (
        <FormSection submitted={onSubmit} title="Posting Media"
            description="Memposting suatu media ke publik."
            actions={<>
                <ActionMessage on={recentlySuccessful} className="mr-3">
                    Terposting.
                </ActionMessage>

                <Button processing={uploading || processing}>
                    Posting
                </Button>
            </>}
        >
            <div className="col-span-6 sm:col-span-4">
                <input type="file" className="hidden"
                            accept="image/*,video/mp4"
                            ref={mediaEl}
                            onChange={updateMediaPreview} />

                <Label for="media" value="Media" />

                <div className="mt-2" style={{ display: videoPreview ? "block" : "none" }}>
                    <video src={videoPreview} className="h-24 w-auto" />
                </div>

                <div className="mt-2" style={{ display: photoPreview ? "block" : "none" }}>
                    <span className="block w-20 h-20"
                          style={{ backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundImage: "url(" + photoPreview + ")" }}>
                    </span>
                </div>

                <SecondaryButton className="mt-2 mr-2" type="button" handleClick={selectNewMedia}>
                    Pilih Media Baru
                </SecondaryButton>

                <InputError message={errors.photo} className="mt-2" />
            </div>

            <div className="col-span-6 sm:col-span-4">
                <Label for="caption" value="Keterangan" />
                <Input id="caption" type="text" name="caption" className="mt-1 block w-full" value={data.caption} autocomplete="off" handleChange={onHandleChange} />
                <InputError message={errors.caption} className="mt-2" />
            </div>
        </FormSection>
    );
}
