import React from 'react';

export default function InputError({ message }) {
    return (
        <div style={{ display: message ? "block" : "none" }}>
            <p className="text-sm text-red-600">
                {message}
            </p>
        </div>
    );
}
