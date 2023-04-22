import React from 'react';
import { Transition } from '@headlessui/react';

export default function ActionMessage({ on, children }) {
    return (
        <div>
            <Transition show={on} leave="transition ease-in duration-1000" leaveFrom="opacity-100" leaveTo="opacity-0" className="text-sm text-gray-600">
                {children}
            </Transition>
        </div>
    );
}
