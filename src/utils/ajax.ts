import axios from "axios";
import type {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

/* 服务器返回数据的的类型，根据接口文档确定 */
export interface Result<T = any> {
  code: number;
  message: string;
  data: T;
}

const ajax: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 0,
});

/* 请求拦截器 */
ajax.interceptors.request.use(
  (config: AxiosRequestConfig & { headers: any }) => {
    return config;
  },
  (error: AxiosError) => {
    console.error(error.message);
    return Promise.reject(error);
  }
);

/* 响应拦截器 */
ajax.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message } = response.data;

    // 根据自定义错误码判断请求是否成功
    if (code === 200) {
      // 将组件用的数据返回
      return response.data;
    } else {
      // 处理业务错误。
      console.error(message);
      return Promise.reject(new Error(message));
    }
  },
  (error: AxiosError) => {
    // 处理 HTTP 网络错误
    let message = "";
    // HTTP 状态码
    const status = error.response?.status;
    switch (status) {
      case 401:
        message = "token 失效，请重新登录";
        // 这里可以触发退出的 action
        break;
      case 403:
        message = "拒绝访问";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器故障";
        break;
      default:
        message = "网络连接故障";
    }

    console.error(message);
    return Promise.reject(error);
  }
);

/* 导出 axios 实例 */
export default ajax;
