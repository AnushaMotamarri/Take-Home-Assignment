import React from 'react';
import Dropdown from '../components/dropdown';
import { useCoinsInfo } from '../hooks/useCoinsInfo';

function Home() {
  const { topCoins, loading, error, debouncedLoadOptions } = useCoinsInfo();

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Dropdown
          options={topCoins}
          placeholder="Choose a crypto asset"
          loadOptions={debouncedLoadOptions}
        />
      )}
    </div>
  );
}

export default Home;
