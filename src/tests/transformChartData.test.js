
import { transformChartData } from '../utils/common_utils';

describe('transformChartData', () => {
  it('transforms raw chart data correctly', () => {
    const raw = {
      prices: [
        [1718505600000, 65000],
        [1718592000000, 65200],
      ],
    };

    const result = transformChartData(raw);

    expect(result[0]).toHaveProperty('price', 65000);
    expect(result[0]).toHaveProperty('time');
  });
});
