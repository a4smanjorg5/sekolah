import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhotoAlbum from "react-photo-album";

export default function Galeri({ selected, page }) {
    const [photos, setPhotos] = useState();

    useEffect(() => {
        // const { data: mediaPage } = await axios.get('/api/ig/media');
        const mediaPage = page;

        Promise.all(mediaPage.data.map(({
            id: media_id, media_url, media_type, thumbnail_url, caption, permalink
        }) => new Promise((resolve, reject) => {
            const img = new Image();
            img.addEventListener('load', () => {
                resolve({
                    src: img.src, width: img.naturalWidth, height: img.naturalHeight,
                    alt: caption, media_id, permalink,
                });
            });
            img.addEventListener('error', reject);
            img.src = media_type == 'VIDEO' ? thumbnail_url : media_url;
        }))).then(setPhotos);
    }, []);

    const customRender = ({
        photo: { media_id, permalink },
        imageProps: { alt, style, ...restImageProps },
    }) => {
        const onSelect = (e) => {
            if (typeof selected == 'function') {
                e.preventDefault(); selected({
                    preview: restImageProps.src,
                    id: media_id,
                }, permalink);
            }
        };

        return (
            <a href={permalink} style={style} onClick={onSelect} target="ig_post">
                <img alt={alt} {...restImageProps} width="100%" />
            </a>
        );
    };

    return (photos ? <PhotoAlbum layout="rows" renderPhoto={customRender} photos={photos} /> : <div>sedang memuat galeri...</div>);
}
