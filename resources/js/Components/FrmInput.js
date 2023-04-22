import React from 'react';
import Input from '@/Components/Input';
import Label from '@/Components/Label';

export default function FrmInput({
    type = 'text',
    label,
    name,
    idInput,
    value,
    placeholder,
    length,
    readOnly,
    required,
    isFocused,
    handleChange,
}) {
    return (
        <div className="mt-4">
            <Label forInput={idInput||name} value={label} />

            <Input
                type={type}
                name={name}
                length={length}
                id={idInput}
                value={(value || '')}
                placeholder={placeholder}
                className="mt-1 block w-full"
                handleChange={handleChange}
                isFocused={isFocused}
                readOnly={readOnly}
                required={required}
            />
        </div>
    );
}
