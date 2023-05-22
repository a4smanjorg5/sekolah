import React from 'react';

export default function SectionBorder({ theme = 'gray' }) {
    return (
        <div className="hidden sm:block">
            <div className="py-8">
                <div className={`border-t border-${theme}-200`}></div>
            </div>
        </div>
    );
}
