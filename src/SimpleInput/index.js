/** @format */
import React, { useEffect, useState, useCallback } from 'react';
import validator from 'validator';
import classNames from 'classnames';
import { InputTag, TextField } from './partials';

const SimpleInput = ({
    formObj,
    name,
    placeholder,
    onChange,
    onValidationChange,
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

    useEffect(() => {
        const localval = formObj[name] === 0 ? '0' : formObj[name];
        setlocalValue(localval || '');
        const valid = checkIsValid(formObj[name]);
        setisvalid(valid);

        let item = {
            name: name,
            valid: { valid, error: !valid ? errorMessage : null }
        };

        onValidationChange && onValidationChange(item);
    }, [formObj]);

    useEffect(
        () => () => {
            // console.log('unmount');
            let item = {
                name: name,
                valid: null
            };
            onValidationChange && onValidationChange(item);
        },
        []
    );

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
        const valid = checkIsValid(value);

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
