import AxiosClientRepository from "../../../config/AxiosHttp";

class servicesDashboard extends AxiosClientRepository {
  constructor() {
    super();
  }

  async getStats(url) {
    try {
      const response = await this.get(url);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async getStatsBar(url) {
    try {
      const response = await this.get(url);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default servicesDashboard;
