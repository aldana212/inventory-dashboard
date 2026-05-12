/* eslint-disable no-useless-catch */
import AxiosClientRepository from "../../../shared/Http/AxiosHttp";

class servicesUser extends AxiosClientRepository {
  constructor() {
    super();
  }

  async getUsers(url) {
    try {
      const response = await this.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createUser(url, data) {
    try {
      const response = await this.post(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(url, data) {
    try {
      const response = await this.put(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateUserStatus(url, data) {
    try {
      const response = await this.patch(url, data);
      return response;
    } catch (error) {
      throw error
    }
  }

  async deleteUser(url, data) {
    try {
      const response = await this.delete(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default servicesUser;
