import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function CryptoChart({ chartData }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="border border-[#ccc] bg-gray-50 p-[10px] rounded-xl">
          <p>{label}</p>
          {/* <p style={{ color: '#ffc658' }}>Market Cap: ${formatLargeNumber(payload[2].value)}</p> */}
          {/* <p style={{ color: '#82ca9d' }}>Volume: {formatLargeNumber(payload[1].value)}</p> */}
          <p style={{ color: '#8884d8' }}>Price: ${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis
            tickFormatter={value => Intl.NumberFormat('en', { notation: 'compact' }).format(value)}
          />
          <Tooltip content={<CustomTooltip />} />

          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} name="Price" />
          <Line type="monotone" dataKey="volume" stroke="#82ca9d" strokeWidth={2} name="Volume" />
          <Line
            type="monotone"
            dataKey="marketCap"
            stroke="#ffc658"
            strokeWidth={2}
            name="Market Cap"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
