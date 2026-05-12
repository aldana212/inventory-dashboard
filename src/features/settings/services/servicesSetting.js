/* eslint-disable no-useless-catch */
import AxiosClientRepository from "../../../config/AxiosHttp";

class servicesSetting extends AxiosClientRepository {
  constructor() {
    super();
  }

  async updatePassword(url, data) {
    try {
      const response = await this.patch(url, data);
      return response;
    } catch (error) {
      throw error
    }
  }
}

export default servicesSetting;
