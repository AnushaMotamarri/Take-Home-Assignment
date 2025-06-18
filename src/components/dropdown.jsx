// VirtualizedSelect.js
import React from 'react';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';

const CustomOption = props => {
  const { data, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
    >
      <img src={data.image} alt={data.label} className="w-5 h-5" />
      <span>
        {data.name} ({data.symbol.toUpperCase()})
      </span>
    </div>
  );
};

const Dropdown = ({ label, isAsync, options, loadOptions, onChange }) => {
  return (
    <div className="w-[300px] p-[10px]">
      {label && (
        <label>
          <b>{label}:</b>
        </label>
      )}
      {isAsync ? (
        <AsyncSelect
          cacheOptions
          defaultOptions={options}
          loadOptions={loadOptions}
          getOptionLabel={opt => opt.name}
          getOptionValue={opt => opt.id}
          onChange={onChange}
          components={{ Option: CustomOption }}
        />
      ) : (
        <Select options={options} onChange={onChange} />
      )}
    </div>
  );
};

export default Dropdown;
