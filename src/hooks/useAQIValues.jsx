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
        newAQIValues.tooltip =
          'Air quality is considered satisfactory, and air pollution poses little or no risk';
      } else if (aqi > 50 && aqi <= 100) {
        newAQIValues.legendStyle = 'bg-yellow black';
        newAQIValues.warningLevel = 'Moderate';
        newAQIValues.tooltip =
          'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.';
      } else if (aqi > 100 && aqi <= 150) {
        newAQIValues.legendStyle = 'bg-orange black';
        newAQIValues.warningLevel = 'Unhealthy for Sensitive Groups';
        newAQIValues.tooltip =
          'Members of sensitive groups may experience health effects. The general public is not likely to be affected.';
      } else if (aqi > 150 && aqi <= 200) {
        newAQIValues.legendStyle = 'bg-red';
        newAQIValues.warningLevel = 'Unhealthy';
        newAQIValues.tooltip =
          'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.';
      } else if (aqi > 200 && aqi <= 300) {
        newAQIValues.legendStyle = 'bg-purple';
        newAQIValues.warningLevel = 'Very Unhealthy';
        newAQIValues.tooltip =
          'Health warnings of emergency conditions. The entire population is more likely to be affected.';
      } else if (aqi > 300) {
        newAQIValues.legendStyle = 'bg-black';
        newAQIValues.warningLevel = 'Hazardous';
        newAQIValues.tooltop =
          'Health alert: everyone may experience more serious health effects.';
      }

      setAQIValues(newAQIValues);
    }
  }, [station?.aqi]);

  return aqiValues;
};

export default useAQIValues;
