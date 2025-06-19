import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function CryptoChart({
  chartData1,
  chartData2 = null, // optional
  asset1Label,
  asset2Label = '',
  selectedMetric,
}) {
  console.log(chartData1, chartData2, selectedMetric);
  // Merge chart data safely
  const mergedData = useMemo(() => {
    return chartData1?.map((entry, i) => ({
      time: entry.time,
      asset1Price: entry[selectedMetric?.value],
      // asset1Volume: entry.volume,
      // asset1MarketCap: entry.marketCap,
      asset2Price: chartData2?.[i]?.[selectedMetric?.value],
      // asset2Volume: chartData2?.[i]?.volume,
      // asset2MarketCap: chartData2?.[i]?.marketCap,
    }));
  }, [asset1Label, asset2Label, selectedMetric]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const first = mergedData?.[0];

      const getPercentChange = (initial, current) => {
        if (!initial || !current) return '';
        const change = ((current - initial) / initial) * 100;
        const symbol = change >= 0 ? '▲' : '▼';
        const color = change >= 0 ? 'green' : 'red';
        return (
          <span style={{ color }}>
            ({symbol} {Math.abs(change).toFixed(2)}%)
          </span>
        );
      };

      return (
        <div className="border border-[#ccc] bg-background p-[10px] rounded-xl">
          <p className="font-semibold">{label}</p>
          {payload.map((p, idx) => {
            const initial = first?.[p.dataKey];
            const current = p.value;
            return (
              <p key={idx} style={{ color: p.stroke }}>
                {p.name}: ${Number(current).toLocaleString('en', { maximumFractionDigits: 2 })}{' '}
                {getPercentChange(initial, current)}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={mergedData}>
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis
            tickFormatter={value => Intl.NumberFormat('en', { notation: 'compact' }).format(value)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {/* Always show asset 1 */}
          <Line
            type="monotone"
            dataKey="asset1Price"
            stroke="#8884d8"
            strokeWidth={2}
            name={`${asset1Label} ${selectedMetric?.name}`}
          />

          {/* Conditionally show asset 2 */}
          {chartData2 && (
            <Line
              type="monotone"
              dataKey="asset2Price"
              stroke="#FE8DA1"
              strokeWidth={2}
              name={`${asset2Label} ${selectedMetric?.name}`}
            />
          )}

          {/* Optional: add volume & market cap lines here */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
