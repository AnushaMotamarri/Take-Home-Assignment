import React from 'react';
import CryptoChart from '../components/chart';
import ChartShimmer from '../shimmer/chartShimmer';

function CryptoNameRenderer({ selectedCoinInfo, chartData }) {
  if (!selectedCoinInfo?.name) return null;

  const initial = chartData?.[0]?.price;
  const latest = chartData?.[chartData.length - 1]?.price;

  let percentChange = null;
  if (initial && latest) {
    const change = ((latest - initial) / initial) * 100;
    const symbol = change >= 0 ? '▲' : '▼';
    const color = change >= 0 ? 'text-green-600' : 'text-red-500';
    percentChange = (
      <span className={`${color}`}>
        ({symbol} {Math.abs(change).toFixed(2)}%)
      </span>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <img src={selectedCoinInfo.image} alt={selectedCoinInfo.label} className="w-5 h-5" />
      <span className="font-semibold">
        {selectedCoinInfo.name} ({selectedCoinInfo.symbol.toUpperCase()})
      </span>
      {percentChange}
    </div>
  );
}

function CryptoChartView({
  chart1Response,
  selectedCoinInfo1 = {},
  chart2Response = {},
  selectedCoinInfo2 = {},
  isLoading,
  selectedMetric = {},
  selectedTimeRange = {},
}) {
  return (
    <div className="border border-dashed border-[#ccc] rounded-sm p-[20px] m-2.5 w-full box-border shadow-lg ">
      <div className="flex flex-col gap-2.5">
        <h2 className="text-lg font-semibold ">
          {selectedMetric.name} Over {selectedTimeRange.name}
        </h2>
        <div className="flex gap-1 ">
          <CryptoNameRenderer selectedCoinInfo={selectedCoinInfo1} chartData={chart1Response} />
          {selectedCoinInfo2.name && (
            <>
              {' '}
              <span>Vs</span>
              <CryptoNameRenderer selectedCoinInfo={selectedCoinInfo2} chartData={chart2Response} />
            </>
          )}
        </div>
        {isLoading ? (
          <ChartShimmer />
        ) : (
          <CryptoChart
            chartData1={chart1Response}
            asset1Label={selectedCoinInfo1.name}
            chartData2={chart2Response}
            asset2Label={selectedCoinInfo2.name}
            selectedMetric={selectedMetric}
            selectedTimeRange={selectedTimeRange}
          />
        )}
      </div>
    </div>
  );
}

export default CryptoChartView;
