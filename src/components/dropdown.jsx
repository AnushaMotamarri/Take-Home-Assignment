import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { components } from 'react-select';

const customSingleValue = ({ data }) => (
  <div className="flex items-center gap-2 p-0 m-0" style={{ margin: 0, padding: 0 }}>
    <img src={data.image} alt={data.label} className="w-5 h-5" />
    <span className="text-text-color">
      {data.name} ({data.symbol.toUpperCase()})
    </span>
  </div>
);
const CustomOption = props => {
  const { data, innerRef, innerProps, isFocused } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={`flex items-center gap-2 px-3 py-2 hover:bg-[var(--color-dropdown-hover)] ${isFocused ? 'bg-[var(--color-dropdown-hover)]' : 'bg-background '}`}
    >
      {data.image && <img src={data.image} alt={data.label} className="w-5 h-5" />}
      <span className=" text-text-color" data-testid={`coin-name-${data.name}`}>
        {data.name} {data.symbol && `(${data.symbol?.toUpperCase()})`}
      </span>
    </div>
  );
};
const customStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: 'var(--color-background)',
    color: 'var(--color-text-color)',
    cursor: 'pointer',
    borderRadius: '0.375rem',

    border: state.isFocused ? '1px solid var(--primary-color)' : '1px solid #ccc',
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'var(--primary-color)',
    },
  }),

  singleValue: base => ({
    ...base,
    color: 'var(--color-text-color)',
    marginTop: 0,
    marginBottom: 0,
  }),
  input: base => ({
    ...base,
    margin: 0,
    padding: 0,
    color: 'var(--color-text-color)',
  }),
  valueContainer: base => ({
    ...base,
    display: 'flex',
    height: '28px',
    padding: '0 6px',
    overflow: 'auto',
    flexWrap: 'nowrap',
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected
      ? 'var(--primary-color)'
      : isFocused
        ? 'var(--color-dropdown-hover)'
        : 'var(--color-background)',
    color: 'var(--color-text-color)',
    cursor: 'pointer',
    padding: '10px 12px',
  }),
  menu: base => ({
    ...base,
    backgroundColor: 'var(--color-background)',
    color: 'var(--color-text-color)',
    zIndex: 20,
  }),
  placeholder: base => ({
    ...base,
    color: 'gray',
    fontSize: '13px',
  }),
};

const CustomControl = ({ children, ...props }) => {
  const { selectProps } = props;

  return (
    <components.Control
      {...props}
      innerRef={props.innerRef}
      innerProps={{ ...props.innerProps, 'data-testid': selectProps.testId || 'crypto-select' }}
    >
      {children}
    </components.Control>
  );
};

const Dropdown = ({
  label,
  isAsync,
  options,
  loadOptions,
  onChange,
  placeholder,
  selectFirstOptionByDefault,
  testId,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (selectFirstOptionByDefault) {
      const defaultOption = options[0]; // select BTC by default
      setSelectedOption(defaultOption);
      onChange?.(defaultOption); // trigger callback
    }
  }, []);
  return (
    <div className="w-[300px] p-[10px]">
      {label && <label className="font-semibold">{label}</label>}
      {isAsync ? (
        <AsyncSelect
          styles={customStyles}
          testId={testId}
          placeholder={placeholder}
          cacheOptions
          defaultOptions={options}
          loadOptions={loadOptions}
          getOptionLabel={opt => opt.name}
          getOptionValue={opt => opt.id}
          onChange={onChange}
          components={{
            Option: CustomOption,
            Control: CustomControl,
            SingleValue: customSingleValue,
          }}
        />
      ) : (
        <Select
          styles={customStyles}
          className="text-black"
          value={selectedOption}
          options={options}
          testId={testId}
          onChange={val => {
            setSelectedOption(val);
            onChange(val);
          }}
          components={{ Option: CustomOption, Control: CustomControl }}
        />
      )}
    </div>
  );
};

export default Dropdown;
