import React, { useState } from 'react';

export default function BlankSection({ className, children }) {
    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className={'p-6 bg-white border-b border-gray-200' + (className || '')}>{children}</div>
                </div>
            </div>
        </div>
    );
}
