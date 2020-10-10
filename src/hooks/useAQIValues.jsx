import { useEffect, useState } from 'react';

const useAQIValues = (station) => {
  const [aqiValues, setAQIValues] = useState({});

  useEffect(() => {
    if (station?.aqi) {
      const { aqi } = station;
      const newAQIValues = {};
      if (aqi <= 50) {
        newAQIValues.legendStyle = 'bg-green';
        newAQIValues.warningLevel = 'Good';
      } else if (aqi > 50 && aqi <= 100) {
        newAQIValues.legendStyle = 'bg-yellow black';
        newAQIValues.warningLevel = 'Moderate';
      } else if (aqi > 100 && aqi <= 150) {
        newAQIValues.legendStyle = 'bg-orange black';
        newAQIValues.warningLevel = 'Unhealthy for Sensitive Groups';
      } else if (aqi > 150 && aqi <= 200) {
        newAQIValues.legendStyle = 'bg-red';
        newAQIValues.warningLevel = 'Unhealthy';
      } else if (aqi > 200 && aqi <= 300) {
        newAQIValues.legendStyle = 'bg-purple';
        newAQIValues.warningLevel = 'Very Unhealthy';
      } else if (aqi > 300) {
        newAQIValues.legendStyle = 'bg-black';
        newAQIValues.warningLevel = 'Hazardous';
      }

      setAQIValues(newAQIValues);
    }
  }, [station?.aqi]);

  return aqiValues;
};

export default useAQIValues;
