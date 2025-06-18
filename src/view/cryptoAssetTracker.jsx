import React from 'react';
import Dropdown from '../components/dropdown';
import { useCoinsInfo } from '../hooks/useCoinsInfo';
import CryptoChartView from './cryptoChartView';
import { timeRangeDropdownOptions } from './enums';

function CryptoAssetTracker() {
  const {
    topCoins,
    loading,
    error,
    debouncedLoadOptions,
    handleCoinSelection,
    chartResponse,
    isChartLoading,
    selectedCoinInfo,
    onTimeRangeChange,
  } = useCoinsInfo();

  return (
    <div>
      <h2 className="text-xl p-[10px]">
        <b>Crypto Performance Viewer</b>
      </h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <Dropdown
            isAsync
            options={topCoins}
            placeholder="Choose a crypto asset"
            loadOptions={debouncedLoadOptions}
            onChange={handleCoinSelection}
            label={'Select Asset'}
          />
          <Dropdown
            options={timeRangeDropdownOptions}
            label={'Select Time Range'}
            onChange={onTimeRangeChange}
          />
          <Dropdown
            isAsync
            options={topCoins}
            placeholder="Choose a crypto asset"
            loadOptions={debouncedLoadOptions}
            onChange={handleCoinSelection}
            label={'Compare With'}
          />
        </div>
      )}

      {chartResponse && (
        <CryptoChartView
          isLoading={isChartLoading}
          selectedCoinInfo={selectedCoinInfo}
          chartResponse={chartResponse}
        />
      )}
    </div>
  );
}

export default CryptoAssetTracker;
