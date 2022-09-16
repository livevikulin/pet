// component SelectField
import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
  label,
  value,
  name,
  onChange,
  defaultOption,
  options,
  error,
}) => {
  const handleChange = ({ target }) => {
    onChange({
      name: target.name,
      value: target.value,
    });
  };

  const getInputClasses = () => {
    return `form-select ${error ? "is-invalid" : ""}`;
  };

  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          name: options[optionName].name,
          value: options[optionName]._id,
        }))
      : options;

  return (
    <div key={value} className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className={getInputClasses()}
        value={value}
        onChange={handleChange}
      >
        <option key="default-option" value="" disabled>
          {defaultOption}
        </option>
        {options &&
          optionsArray.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  defaultOption: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default SelectField;
