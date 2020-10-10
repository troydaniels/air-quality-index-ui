import HttpClient from './httpClient';

const { AQI_API_TOKEN } = process.env;
const httpClientAQI = new HttpClient('http://api.waqi.info');

const apiServices = {
  getStationsByName: (search) => {
    const url = `search/?keyword=${search}&token=${AQI_API_TOKEN}`;
    return httpClientAQI.get(url);
  },
  getStationFeedByUID: (uid) => {
    const url = `feed/@${uid}/?token=${AQI_API_TOKEN}`;
    return httpClientAQI.get(url);
  },
  getStationFeedByIPAddress: () => {
    const url = `feed/here/?token=${AQI_API_TOKEN}`;
    return httpClientAQI.get(url);
  },
};

export default apiServices;
