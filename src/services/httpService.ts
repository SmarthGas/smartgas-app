// httpService.ts
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

class HttpService {
  private client: AxiosInstance;

  constructor() {
    const token = localStorage.getItem('token');
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL as string, // URL base da API
      timeout: 10000, // tempo limite em milissegundos (ajuste conforme necessário)
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '', // Adiciona o token de autenticação se existir
      },
    });

    // Interceptor para adicionar cabeçalhos ou tokens
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Exemplo de como adicionar um token de autenticação
        const token = localStorage.getItem('token'); // ou qualquer outro armazenamento seguro
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor de resposta para lidar com erros globalmente
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        console.error('Erro na requisição:', error);
        return Promise.reject(error);
      }
    );
  }

  // Método GET
  public get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.get(url, config);
  }

  // Método POST
  public post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.post(url, data, config);
  }

  // Método PUT
  public put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.put(url, data, config);
  }
  // Método PATCH

  public patch<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.patch(url, data, config);
  }

  // Método DELETE
  public delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.delete(url, config);
  }
}

export default HttpService;
