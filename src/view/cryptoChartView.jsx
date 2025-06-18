import React from 'react';
import CryptoChart from '../components/chart';
import ChartShimmer from '../shimmer/chartShimmer';
function CryptoChartView({ chartResponse, selectedCoinInfo, isLoading }) {
  return (
    <div>
      <div className="flex gap-1 px-[20px]">
        <img src={selectedCoinInfo.image} alt={selectedCoinInfo.label} className="w-5 h-5" />
        <span>
          {selectedCoinInfo.name} ({selectedCoinInfo.symbol.toUpperCase()})
        </span>
        <div></div>
      </div>
      <div className="border border-[#ccc] rounded-sm p-[20px] m-[20px] w-[1000px]">
        {isLoading ? (
          <ChartShimmer />
        ) : (
          <div>
            <CryptoChart chartData={chartResponse} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CryptoChartView;
