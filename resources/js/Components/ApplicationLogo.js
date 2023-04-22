import React from 'react';

export default function ApplicationLogo({ src, className }) {
    return (
        src ? <img src={src} className={className} /> : <div>LOGO</div>
    );
}
