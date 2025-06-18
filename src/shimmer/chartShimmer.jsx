const ChartShimmer = () => {
  return (
    <div className="w-full h-[300px] p-4 border border-gray-200 rounded-md bg-white animate-pulse flex flex-col justify-between">
      {/* Y-axis lines */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-full h-1 relative">
          <div className="absolute left-0 w-full h-[1px] bg-gray-200" />
          <div
            className="absolute h-2 w-10 rounded-full bg-gray-300"
            style={{
              top: '-4px',
              left: `${10 + i * 15}%`,
            }}
          ></div>
        </div>
      ))}

      {/* X-axis labels */}
      <div className="flex justify-between mt-4">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="w-6 h-3 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  );
};

export default ChartShimmer;
