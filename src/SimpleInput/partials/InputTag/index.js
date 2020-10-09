/** @format */
import React from "react";
import NumberFormat from "react-number-format";

const InputTag = ({
  type,
  value,
  name,
  onChange,
  readonly,
  autoFocus,
  currency,
}) => {
  const onNumericValueChange = (e) => {
    if (e.target.value !== value) {
      onChange(e);
    }
  };
  let suffix = ` ${currency}`;

  switch (type) {
    case "money":
      suffix = ` ${currency}`;
      return (
        <NumberFormat
          value={value}
          className="form-control"
          decimalSeparator=","
          thousandSeparator="."
          suffix={suffix}
          name={name}
          readOnly={readonly}
          onChange={onChange}
          autoFocus={autoFocus}
        />
      );
    case "number":
      suffix = ``;
      return (
        <NumberFormat
          placeholder=""
          value={value}
          className="form-control"
          decimalSeparator=","
          thousandSeparator="."
          suffix={suffix}
          name={name}
          readOnly={readonly}
          onChange={onNumericValueChange}
          autoFocus={autoFocus}
        />
      );
    case "percent":
    case "percent1":
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
          autoFocus={autoFocus}
        />
      );
    case "date":
      return (
        <NumberFormat
          value={value}
          name={name}
          className="form-control"
          // placeholder="31/01/2015"
          format="##/##/####"
          mask="_"
          readOnly={readonly}
          onChange={onChange}
          autoFocus={autoFocus}
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
          autoFocus={autoFocus}
        />
      );
  }
};

InputTag.displayName = "InputTag";

export default InputTag;
