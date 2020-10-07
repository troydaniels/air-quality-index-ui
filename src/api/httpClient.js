import axios from 'axios';

export default class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get = (url, config) => {
    const requestUrl = `${this.baseUrl}/${url}`;
    return axios.get(requestUrl, { ...config });
  };

  post = (url, payload = null, config) => {
    const requestUrl = `${this.baseUrl}/${url}`;
    return axios.post(
      requestUrl,
      payload === null ? null : JSON.stringify(payload),
      { ...config }
    );
  };
}
