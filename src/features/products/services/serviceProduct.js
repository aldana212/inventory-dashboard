/* eslint-disable no-useless-catch */
import AxiosClientRepository from "../../../config/AxiosHttp";

class serviceProduct extends AxiosClientRepository {
  constructor() {
    super();
  }

  async getProducts(url) {
    try {
      const response = await this.get(url);
      return response;
    } catch (error) {
      throw error
    }
  }

  async getProductMovements(url) {
    try {
      const response = await this.get(url);
      return response;
    } catch (error) {
      throw error
    }
  }

  async createProducts(url, data) {
    try {
      const response = await this.postFile(url, data);
      return response;
    } catch (error) {
      throw error
    }
  }
  
  async updateProducts(url, data) {
    try {
      const response = await this.putFile(url, data);
      return response;
    } catch (error) {
      throw error
    }
  }
  
  async updateProductStatus(url, data) {
    try {
      const response = await this.patch(url, data);
      return response;
    } catch (error) {
      throw error
    }
  }
}

export default serviceProduct;
