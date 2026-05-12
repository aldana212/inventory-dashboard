import AxiosClientRepository from "../../../config/AxiosHttp";

class serviceCategory extends AxiosClientRepository {
  constructor() {
    super();
  }

  async getCategories(url) {
    try {
      const response = await this.get(url);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createCategories(url, data) {
    try {
      const response = await this.post(url, data);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateCategories(url, data) {
    try {
      const response = await this.put(url, data);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCategoriesStatus(url, data) {
    try {
      const response = await this.patch(url, data);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteCategories(url, data) {
    try {
      const response = await this.delete(url, data);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default serviceCategory;
