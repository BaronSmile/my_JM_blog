export default class GetResponseServer {
  getOptions(token = '', method = 'GET', data) {
    let headers = {};
    if (token) {
      headers = {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      };
    } else {
      headers = {
        'Content-Type': 'application/json;charset=utf-8',
      };
    }
    let options = {};
    if (method === 'POST' || method === 'PUT') {
      options = {
        method: `${method}`,
        headers,
        body: JSON.stringify(data),
      };
    } else {
      options = {
        method: `${method}`,
        headers,
      };
    }
    return options;
  }

  async getResponse(url, options = {}) {
    const res = await fetch(url, options);

    if (!res.ok && res.status !== 422) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }
}