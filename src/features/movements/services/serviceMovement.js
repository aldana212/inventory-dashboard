import AxiosClientRepository from "../../../shared/Http/AxiosHttp";

class serviceMovement extends AxiosClientRepository {
  constructor() {
    super();
  }

  async getMovement(url) {
    try {
      const response = await this.get(url);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createMovement(url, data) {
    try {
      const response = await this.post(url, data);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default serviceMovement
