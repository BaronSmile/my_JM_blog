import GetResponseServer from "./getResponseServer";

export default class UserServer extends GetResponseServer {
  baseUrl = `https://conduit.productionready.io/api/`;

  async registerUser(data) {
    const options = this.getOptions('', 'POST', data);

    return await this.getResponse(`${this.baseUrl}users`, options)
  }

  async logInUser(data) {
    const options = this.getOptions('', 'POST', data);

    return await this.getResponse(`${this.baseUrl}users/login`, options);
  }

  async getCurrentUser(token) {
    const options = this.getOptions(token, 'GET');

    return await this.getResponse(`${this.baseUrl}user`, options);
  }

  async updateUser(data, token) {
    const options = this.getOptions(token, 'PUT', data);

    return await this.getResponse(`${this.baseUrl}user`, options);
  }
}