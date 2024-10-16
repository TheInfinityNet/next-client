import { useAccessToken, useRefreshToken } from "@/hooks/use-token-store";
import { Axios, AxiosRequestConfig, AxiosResponse } from "axios";

const client = new Axios({
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
        return Promise.reject(error);
      }
    }
    throw new Error("Unauthorized");
  },
  (error) => {
    return Promise.reject(error);
  },
  {
    runWhen: (config) => !config.headers["No-Auth"],
  },
);

export const apiClient = {
  post<TResponse = any, RRequest = any>(
    url: string,
    data: RRequest,
    config?: AxiosRequestConfig<RRequest>,
  ): Promise<AxiosResponse<TResponse, RRequest>> {
    return client.post<TResponse, AxiosResponse<TResponse>, RRequest>(
      url,
      data,
      config,
    );
  },
};

export default client;
