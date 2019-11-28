/** @format */
import React from 'react';
import NumberFormat from 'react-number-format';

const InputTag = ({ type, value, name, onChange, readonly, autoFocus }) => {
    const onNumericValueChange = e => {
        if (e.target.value !== value) {
            onChange(e);
        }
    };

    switch (type) {
        case 'money':
            return (
                <NumberFormat
                    value={value}
                    className="form-control"
                    decimalSeparator=","
                    thousandSeparator="."
                    suffix=" €"
                    name={name}
                    readOnly={readonly}
                    onChange={onChange}
                    autoFocus={autoFocus}
                />
            );
        case 'number':
            return (
                <NumberFormat
                    placeholder=""
                    value={value}
                    className="form-control"
                    decimalSeparator=","
                    thousandSeparator="."
                    suffix=" €"
                    name={name}
                    readOnly={readonly}
                    onChange={onNumericValueChange}
                />
            );
        case 'percent':
            return (
                <NumberFormat
                    value={value}
                    className="form-control"
                    decimalSeparator=","
                    thousandSeparator="."
                    suffix=" %"
                    readOnly={readonly}
                    name={name}
                    onChange={onNumericValueChange}
                />
            );
        case 'date':
            return (
                <NumberFormat
                    value={value}
                    className="form-control"
                    placeholder="31/01/2015"
                    format="##/##/####"
                    mask="_"
                    readOnly={readonly}
                    onChange={onChange}
                />
            );
        default:
            return (
                <input
                    type={type}
                    value={value}
                    name={name}
                    onChange={onChange}
                    className="form-control"
                    readOnly={readonly}
                    placeholder=""
                />
            );
    }
};

InputTag.displayName = 'InputTag';

export default InputTag;
