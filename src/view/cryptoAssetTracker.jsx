import React from 'react';
import Dropdown from '../components/dropdown';
import { useCoinsInfo } from '../hooks/useCoinsInfo';
import CryptoChartView from './cryptoChartView';
import { metricsDropdownOptions, timeRangeDropdownOptions } from './enums';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
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
    handleCompareCoinSelection,
    compareChartResponse,
    isCompareChartLoading,
    selectedCompareCoinInfo,
    onMetricChange,
    selectedMetricInfo,
    selectedTimeRange,
  } = useCoinsInfo();

  return (
    <div>
      <h2 className="text-xl p-[10px] text-text-color">
        <b>Crypto Performance Viewer</b>
      </h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <div className="flex gap-6">
            <Dropdown
              isAsync
              options={topCoins}
              placeholder="Type in your Asset"
              loadOptions={debouncedLoadOptions}
              onChange={handleCoinSelection}
              label={'Asset'}
            />
            <Dropdown
              isAsync
              options={topCoins}
              placeholder="Type in your Asset"
              loadOptions={debouncedLoadOptions}
              onChange={handleCompareCoinSelection}
              label={'Compare With'}
            />
          </div>
          <div className="flex gap-6">
            <Dropdown
              options={timeRangeDropdownOptions}
              label={'Time Range'}
              onChange={onTimeRangeChange}
              selectFirstOptionByDefault
            />
            <Dropdown
              options={metricsDropdownOptions}
              label={'Performance Metric'}
              onChange={onMetricChange}
              selectFirstOptionByDefault
            />
          </div>
        </div>
      )}

      {chartResponse && (
        <CryptoChartView
          isLoading={isChartLoading || isCompareChartLoading}
          selectedCoinInfo1={selectedCoinInfo}
          chart1Response={chartResponse}
          selectedCoinInfo2={selectedCompareCoinInfo}
          chart2Response={compareChartResponse}
          selectedMetric={selectedMetricInfo}
          selectedTimeRange={selectedTimeRange}
        />
      )}
    </div>
  );
}

export default CryptoAssetTracker;
