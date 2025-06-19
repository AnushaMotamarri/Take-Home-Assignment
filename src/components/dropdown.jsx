// VirtualizedSelect.js
import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
// const customSingleValue = ({ data }) => (
//   <div className="flex items-center gap-2 p-0 m-0"
//   style={{ margin: 0, padding: 0 }}>
//     <img src={data.image} alt={data.label} className="w-5 h-5" />
//     <span className='text-black'>
//       {data.name} ({data.symbol.toUpperCase()})
//     </span>
//   </div>
// );
const CustomOption = props => {
  const { data, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
    >
      <img src={data.image} alt={data.label} className="w-5 h-5" />
      <span className="text-black">
        {data.name} ({data.symbol.toUpperCase()})
      </span>
    </div>
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
          placeholder={placeholder}
          cacheOptions
          defaultOptions={options}
          loadOptions={loadOptions}
          getOptionLabel={opt => opt.name}
          getOptionValue={opt => opt.id}
          onChange={onChange}
          components={{ Option: CustomOption }}
        />
      ) : (
        <Select
          className="text-black"
          value={selectedOption}
          options={options}
          onChange={val => {
            setSelectedOption(val);
            onChange(val);
          }}
        />
      )}
    </div>
  );
};

export default Dropdown;
