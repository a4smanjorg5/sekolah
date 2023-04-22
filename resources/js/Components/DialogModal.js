import React from 'react';
import Modal from '@/Components/Modal';

export default function DialogModal({
    show = false,
    maxWidth = '2xl',
    onClose,
    title,
    footer,
    children,
}) {
    return (
        <Modal show={show} maxWidth={maxWidth} onClose={onClose}>
            <div className="px-6 py-4">
                <div className="text-lg">
                    {title}
                </div>

                <div className="mt-4">
                    {children}
                </div>
            </div>

            <div className="px-6 py-4 bg-gray-100 text-right">
                {footer}
            </div>
        </Modal>
    );
}
