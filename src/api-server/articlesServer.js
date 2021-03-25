import GetResponseServer from './getResponseServer';

export default class ArticlesServer extends GetResponseServer {
  baseUrl = `https://conduit.productionready.io/api/articles`;

  async getArticles(pages = 1, token = '') {
    const options = this.getOptions(token);

    return await this.getResponse(`${this.baseUrl}?offset=${pages * 20 - 20}`, options);
  }

  async getArticle(slug, token = '') {
    const options = this.getOptions(token, 'GET');

    return await this.getResponse(`${this.baseUrl}/${slug}`, options);
  }

  async createArticle(data, token) {
    const options = this.getOptions(token, 'POST', data);

    return await this.getResponse(`${this.baseUrl}`, options);
  }

  async updateArticle(data, slug, token) {
    const options = this.getOptions(token, 'PUT', data);

    return await this.getResponse(`${this.baseUrl}/${slug}`, options);
  }

  async deleteArticle(slug, token) {
    const options = this.getOptions(token, 'DELETE');

    return await this.getResponse(`${this.baseUrl}/${slug}`, options);
  }

  async favoriteArticle(slug, token, favorite) {
    const actionMethod = favorite ? 'DELETE' : 'POST';
    const options = this.getOptions(token, actionMethod);

    return await this.getResponse(`${this.baseUrl}/${slug}/favorite`, options);
  }
}
