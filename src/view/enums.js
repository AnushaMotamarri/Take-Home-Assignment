const timeRangeDropdownOptions = [
  {
    value: 'week', // actual value returned on selection
    label: 'Last 7 Days', // visible label in dropdown
    name: 'Last 7 Days', // used by getOptionLabel (fallback)
  },
  {
    value: 'month', // actual value returned on selection
    label: 'Last 1 Month', // visible label in dropdown
    name: 'Last 1 Month',
  },
  {
    value: 'year', // actual value returned on selection
    label: 'Last 1 Year', // visible label in dropdown
    name: 'Last 1 Year',
  },
];

const valueToDaysMap = {
  week: 7,
  month: 30,
  year: 360,
};
export { timeRangeDropdownOptions, valueToDaysMap };
