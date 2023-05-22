import React, { useState } from 'react';

export default function BlankSection({ className, theme = 'gray', id, children }) {
    return (
        <div className={`bg-${theme}-50 overflow-hidden shadow-sm sm:rounded-lg`}>
            <div className={`p-6 bg-${theme}-50 border-b border-${theme}-200 ` + (className || '')} id={id}>{children}</div>
        </div>
    );
}
