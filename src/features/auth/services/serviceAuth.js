/* eslint-disable no-useless-catch */
import AxiosClientRepository from "../../../config/AxiosHttp";

class serviceAuth extends AxiosClientRepository {
  constructor() {
    super();
  }

  async login(url, data) {
    try {
      const response = await this.post(url, data);
      return response;
    } catch (error) {
      throw error
    }
  }

  async changePassword(url, data) {
    try {
      const response = await this.patch(url, data);
      return response;
    } catch (error) {
      throw error
    }
  }
}

export default serviceAuth;
