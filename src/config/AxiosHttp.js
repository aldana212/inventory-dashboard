import axios from "axios";
import { env } from "./env";

export class AxiosClientRepository {
  constructor() {
    this.instance = axios.create({
      baseURL: env.API_URL,
      timeout: 10000,
    });

    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  _initializeRequestInterceptor() {
    this.instance.interceptors.request.use(
      (config) => {
        // Puedes agregar token aquí
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  _initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response) {
          const message = error.response.data?.message || "Server error";

          const status = error.response.status;

          // 🔥 devuelves un error limpio
          return Promise.reject({
            message,
            status,
          });
        }

        // error de red o timeout
        return Promise.reject({
          message: "Network error",
          status: 0,
        });
      },
    );
  }

  get(url, config = {}) {
    return this.instance.get(url, config);
  }
  post(url, data, config = {}) {
    return this.instance.post(url, data, config);
  }

  postFile(url, formData, config = {}) {
    return this.instance.post(url, formData, {
      ...config,
      headers: {
        ...config.headers,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  put(url, data, config = {}) {
    return this.instance.put(url, data, config);
  }

  patch(url, data, config = {}) {
    return this.instance.patch(url, data, config);
  }

  putFile(url, formData, config = {}) {
    return this.instance.put(url, formData, {
      ...config,
      headers: {
        ...config.headers,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  delete(url, config = {}) {
    return this.instance.delete(url, config);
  }
}

export default AxiosClientRepository;
