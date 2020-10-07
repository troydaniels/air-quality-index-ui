import HttpClient from './httpClient';

const { AQI_API_TOKEN } = process.env;
const httpClientAQI = new HttpClient('http://api.waqi.info');

const apiServices = {
  getSearchByName: (search) => {
    const url = `search/?keyword=${search}&token=${AQI_API_TOKEN}`;
    return httpClientAQI.get(url);
  },
  getCityStationFeed: (name) => {
    const url = `feed/${name}/?token=${AQI_API_TOKEN}`;
    return httpClientAQI.get(url);
  },
};

export default apiServices;
