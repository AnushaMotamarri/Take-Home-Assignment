function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

function transformChartData(data) {
  return data.prices.map(([timestamp, price], index) => {
    const date = new Date(timestamp).toISOString().split('T')[0]; // YYYY-MM-DD

    return {
      time: date,
      price: price,
      marketCap: data.market_caps[index]?.[1],
      volume: data.total_volumes[index]?.[1],
    };
  });
}

export { debounce, transformChartData };
