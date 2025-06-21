import { FixedSizeList as List } from 'react-window';
import React from 'react';
const Row = ({ index, style, data }) => {
  const { tokens, tableConfigs } = data;
  const token = tokens[index];

  return (
    <div style={style} className="flex p-2 border-b border-gray-200">
      {tableConfigs?.map((config, idx) => (
        <div className="w-1/3" key={`row-${idx}`}>
          {config.cellRenderer ? config.cellRenderer(token) : token[config.accessor]}
        </div>
      ))}
    </div>
  );
};

const Table = ({ tokens, tableConfigs }) => {
  return (
    <div className=" overflow-hidden h-[500px]">
      <div className="flex bg-table-header p-2 font-bold">
        {tableConfigs.map((config, idx) => {
          return (
            <div className="w-1/3" key={`header-${idx}`}>
              {config.label}
            </div>
          );
        })}
      </div>
      <List
        height={450}
        itemCount={tokens.length}
        itemSize={40}
        itemData={{ tokens, tableConfigs }}
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
};

export default Table;
