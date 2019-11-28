/** @format */
import React, { useEffect, useState, useCallback } from 'react';
import validator from 'validator';
import classNames from 'classnames';
import { InputTag, TextField } from './partials';

const SimpleInput = ({
    formObj,
    setformValidationObj,
    name,
    placeholder,
    onChange,
    pattern,
    errorMessage = 'required field',
    required,
    autoFocus,
    type,
    readonly,
    validated,
    max,
    ns,
    children
}) => {
    const [isvalid, setisvalid] = useState();
    const [localValue, setlocalValue] = useState('');

    const setValidity = useCallback(value => {
        const valid = checkIsValid(value);
        setisvalid(valid);
        if (setformValidationObj) setformValidationObj({ name, valid });
    });

    useEffect(() => {
        const localval = formObj[name] === 0 ? '0' : formObj[name];
        setlocalValue(localval || '');
        setValidity(formObj[name]);
    }, [formObj, name, setValidity]);

    const handleChange = event => {
        let { value } = event.target;
        if (value && (type === 'money' || type === 'percent')) {
            value += '';
            value = value.replace(/\./g, '');
            value = value.replace(/,/g, '');
            value = value.replace(/€ /g, '');
            value = value.replace(/ €/g, '');
            value = value.replace(/ %/g, '');
        }

        const updated = { ...formObj };
        updated[event.target.name] = value;

        setlocalValue(value);
        setValidity(value);
        onChange(updated);
    };

    const checkIsValid = value => {
        const stringvalue = `${value}`;
        let output = false;
        if (
            stringvalue !== 'null' &&
            stringvalue !== '' &&
            stringvalue !== 'undefined'
        ) {
            let valid =
                !pattern || validator.matches(stringvalue, pattern, 'i');
            if ((type === 'money' || type === 'number') && max) {
                valid = valid && value <= max;
            }
            output = valid;
        } else output = !required;

        return output;
    };

    const validatedclass = classNames('animatedlabel', {
        'fade-in': localValue,
        'fade-out': !localValue,
        'text-success': validated && isvalid,
        'd-none': validated && !isvalid,
        'text-info': !validated
    });
    const placeholderclass = classNames('placeholderlabel', {
        'd-none': localValue
    });
    const errorclass = classNames('animatedlabel text-danger', {
        'd-none': !validated || isvalid,
        'fade-in': !isvalid
    });

    return (
        <div className="simpleinput">
            <div className="relative">
                <InputTag
                    type={type}
                    value={localValue}
                    name={name}
                    onChange={handleChange}
                    readonly={readonly}
                    autoFocus={autoFocus}
                />

                <TextField
                    children={children}
                    className={placeholderclass}
                    text={placeholder}
                    ns={ns}
                />
                <TextField
                    children={children}
                    className={validatedclass}
                    text={placeholder}
                    ns={ns}
                />
                <TextField
                    children={children}
                    className={errorclass}
                    text={errorMessage}
                    ns={ns}
                />
            </div>
        </div>
    );
};

SimpleInput.displayName = 'SimpleInput';

export default SimpleInput;
