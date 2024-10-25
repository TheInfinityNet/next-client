import { useAccessToken, useRefreshToken } from "@/hooks/use-token-store";
import axios, { AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  async (config) => {
    const accessToken = useAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      return config;
    }
    const refreshToken = useRefreshToken();
    if (refreshToken) {
      try {
        const response = await client.post("/auth/refresh", {
          refreshToken,
        });
        const { accessToken } = response.data;
        config.headers["Authorization"] = `Bearer ${accessToken}`;
        return config;
      } catch (error) {
        console.error("Failed to refresh token", error);
        return config;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
  {
    runWhen: (config) => !config.headers["No-Auth"],
  },
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (isAxiosError(error)) {
      if (error.code === "ERR_NETWORK") {
        throw {
          type: "NetworkError",
          message: "Failed to connect to the server",
        };
      }
      throw error.response?.data;
    }
    throw {
      type: "UnknownError",
      message: "An unknown error occurred",
    };
  },
);

export const apiClient = {
  post: <TResponse = any, RRequest = any>(
    url: string,
    data: RRequest,
    config?: AxiosRequestConfig<RRequest>,
  ): Promise<AxiosResponse<TResponse, RRequest>> => {
    return client.post<TResponse, AxiosResponse<TResponse>, RRequest>(
      url,
      data,
      config,
    );
  },

  get: <TResponse = unknown, TQueryParams = unknown>(
    url: string,
    query?: TQueryParams,
    config?: AxiosRequestConfig<TQueryParams>,
  ): Promise<AxiosResponse<TResponse, TQueryParams>> => {
    return client.get<TResponse, AxiosResponse<TResponse, TQueryParams>>(url, {
      params: query,
      ...config,
    });
  },
};

export default client;
