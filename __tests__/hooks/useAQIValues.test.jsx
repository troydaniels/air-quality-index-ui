import { renderHook } from '@testing-library/react-hooks';
import useAQIValues from '../../src/hooks/useAQIValues';

describe('The useAQIValues hook', () => {
  it('should return correct values for an AQI of 150', () => {
    const { result } = renderHook(() => useAQIValues({ aqi: 150 }));
    expect(result.current).toEqual({
      legendStyle: 'bg-orange black',
      warningLevel: 'Unhealthy for Sensitive Groups',
      tooltip:
        'Members of sensitive groups may experience health effects. The general public is not likely to be affected.',
    });
  });
});
