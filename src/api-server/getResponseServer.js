export default class GetResponseServer {
  getOptions(token = '', method = 'GET', data) {
    let headers = {'Content-Type': 'application/json;charset=utf-8'};
    if (token) {
      headers.Authorization = `Token ${token}`
    }
    let options = {
      method: `${method}`,
      headers,
    };
    if (method === 'POST' || method === 'PUT') {
      options.body = JSON.stringify(data)
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
