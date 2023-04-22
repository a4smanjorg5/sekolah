import React, { useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { createPortal } from 'react-dom';

export default function Modal({
    show = false,
    maxWidth = '2xl',
    onClose,
    children,
}) {
    const maxWidthClass = {
        'sm': 'sm:max-w-sm',
        'md': 'sm:max-w-md',
        'lg': 'sm:max-w-lg',
        'xl': 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth];

    useEffect(() => {
        document.body.style.overflow = show ? 'hidden' : null;

        const closeOnEscape = (e) => {
            if (e.key === 'Escape' && show) {
                console.warn(e.key);
                close()
            }
        };

        document.addEventListener('keydown', closeOnEscape)

        return () => {
            document.removeEventListener('keydown', closeOnEscape)
        };
    }, [show]);

    const close = () => {
        if (typeof onClose == 'function')
            onClose();
    }

    return createPortal(
        <Transition
            show={show}
            leave="duration-200"
            className="fixed top-0 inset-x-0 px-4 pt-6 sm:px-0 sm:flex sm:items-top sm:justify-center"
        >
            <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="fixed inset-0 transform transition-all"
                onClick={close}
            >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </Transition.Child>

            <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                className={'bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full ' + maxWidthClass}
            >
                {children}
            </Transition.Child>
        </Transition>
    , document.body);
}
