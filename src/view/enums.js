const timeRangeDropdownOptions = [
  {
    value: 'week',
    label: 'Last 7 Days',
    name: 'Last 7 Days',
  },
  {
    value: 'month',
    label: 'Last 1 Month',
    name: 'Last 1 Month',
  },
  {
    value: 'year',
    label: 'Last 1 Year',
    name: 'Last 1 Year',
  },
];

const metricsDropdownOptions = [
  {
    value: 'price',
    label: 'Price',
    name: 'Price',
  },
  {
    value: 'marketCap',
    label: 'Market Cap',
    name: 'Market Cap',
  },
  {
    value: 'volume',
    label: 'Volume',
    name: 'Volume',
  },
];

const valueToDaysMap = {
  week: 7,
  month: 30,
  year: 365,
};

const walletColumnConfigs = [
  {
    label: 'Name',
    accessor: 'name',
    cellRenderer: row => {
      return `${row.name} (${row.symbol})`;
    },
  },

  {
    label: 'Value (USD)',
    accessor: 'usdPrice',
  },
  {
    label: 'Balance',
    accessor: 'readableBalance',
  },
  {
    label: 'Balance (USD)',
    accessor: 'usdValue',
  },
];
export { timeRangeDropdownOptions, valueToDaysMap, metricsDropdownOptions, walletColumnConfigs };
