// VirtualizedSelect.js
import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { components } from 'react-select';

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
      <span className="text-black"  data-testid={`coin-name-${data.name}`}>
        {data.name} ({data.symbol?.toUpperCase()})
      </span>
    </div>
  );
};
const CustomControl = ({ children, ...props }) => {
  const { selectProps } = props;
 return <components.Control {...props} innerRef={props.innerRef} innerProps={{ ...props.innerProps, 'data-testid': selectProps.testId||'crypto-select' }}>
    {children}
  </components.Control>
};



const Dropdown = ({
  label,
  isAsync,
  options,
  loadOptions,
  onChange,
  placeholder,
  selectFirstOptionByDefault,
  testId
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
        testId={testId}
          placeholder={placeholder}
          cacheOptions
          defaultOptions={options}
          loadOptions={loadOptions}
          getOptionLabel={opt => opt.name}
          getOptionValue={opt => opt.id}
          onChange={onChange}
          components={{ Option: CustomOption,Control: CustomControl }}
        />
      ) : (
        <Select
          className="text-black"
          value={selectedOption}
          options={options}
          testId={testId}
          onChange={val => {
            setSelectedOption(val);
            onChange(val);
          }}
          components={{ Control: CustomControl}}
        />
      )}
    </div>
  );
};

export default Dropdown;
