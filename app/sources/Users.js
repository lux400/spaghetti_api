import { RESTDataSource } from 'apollo-datasource-rest';

export default class UsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:1337/api/';
  }

  async getUsers() {
    return this.get('users');
  }
}
