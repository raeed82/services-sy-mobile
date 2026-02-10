import axios, { AxiosInstance } from 'axios';

// عناوين الخوادم
const PRIMARY_API = 'https://3000-igqiqsxl8dynj9paim065-e382b976.manus-asia.computer'; // Manus
const FALLBACK_API = 'http://95.169.192.233'; // السيرفر الخارجي

interface ApiClientConfig {
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
}

class ApiClient {
  private primaryClient: AxiosInstance;
  private fallbackClient: AxiosInstance;
  private currentApi: string = PRIMARY_API;
  private isUsingFallback: boolean = false;
  private config: ApiClientConfig;

  constructor(config: ApiClientConfig = {}) {
    this.config = {
      timeout: config.timeout || 10000,
      retryAttempts: config.retryAttempts || 3,
      retryDelay: config.retryDelay || 1000,
    };

    // إنشاء عميل Manus الأساسي
    this.primaryClient = axios.create({
      baseURL: PRIMARY_API,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // إنشاء عميل السيرفر الخارجي
    this.fallbackClient = axios.create({
      baseURL: FALLBACK_API,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // إضافة interceptors للتعامل مع الأخطاء
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Interceptor للعميل الأساسي
    this.primaryClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.warn('❌ فشل الاتصال بـ Manus، جاري الاتصال بالسيرفر الخارجي...');
        this.isUsingFallback = true;
        this.currentApi = FALLBACK_API;
        throw error;
      }
    );
  }

  /**
   * إرسال طلب مع نظام Fallback
   */
  async request<T = any>(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    url: string,
    data?: any,
    config?: any
  ): Promise<T> {
    let lastError: any;

    // محاولة الاتصال بـ Manus أولاً
    try {
      console.log(`📡 محاولة الاتصال بـ Manus: ${PRIMARY_API}${url}`);
      const response = await this.primaryClient[method](url, data, config);
      
      // إذا كنا كنا نستخدم Fallback وعاد الاتصال، عد إلى Manus
      if (this.isUsingFallback) {
        console.log('✅ عاد الاتصال بـ Manus');
        this.isUsingFallback = false;
        this.currentApi = PRIMARY_API;
      }
      
      return response.data;
    } catch (error) {
      lastError = error;
      console.warn('⚠️ فشل الاتصال بـ Manus');
    }

    // محاولة الاتصال بالسيرفر الخارجي
    try {
      console.log(`📡 محاولة الاتصال بالسيرفر الخارجي: ${FALLBACK_API}${url}`);
      const response = await this.fallbackClient[method](url, data, config);
      
      this.isUsingFallback = true;
      this.currentApi = FALLBACK_API;
      console.log('✅ تم الاتصال بالسيرفر الخارجي بنجاح');
      
      return response.data;
    } catch (error) {
      console.error('❌ فشل الاتصال بالسيرفر الخارجي أيضاً');
      throw new Error('فشل الاتصال بكلا الخادمين. تحقق من اتصالك بالإنترنت.');
    }
  }

  /**
   * طلب GET
   */
  get<T = any>(url: string, config?: any): Promise<T> {
    return this.request<T>('get', url, undefined, config);
  }

  /**
   * طلب POST
   */
  post<T = any>(url: string, data?: any, config?: any): Promise<T> {
    return this.request<T>('post', url, data, config);
  }

  /**
   * طلب PUT
   */
  put<T = any>(url: string, data?: any, config?: any): Promise<T> {
    return this.request<T>('put', url, data, config);
  }

  /**
   * طلب DELETE
   */
  delete<T = any>(url: string, config?: any): Promise<T> {
    return this.request<T>('delete', url, undefined, config);
  }

  /**
   * طلب PATCH
   */
  patch<T = any>(url: string, data?: any, config?: any): Promise<T> {
    return this.request<T>('patch', url, data, config);
  }

  /**
   * الحصول على الخادم الحالي
   */
  getCurrentApi(): string {
    return this.currentApi;
  }

  /**
   * التحقق من استخدام Fallback
   */
  isUsingFallbackServer(): boolean {
    return this.isUsingFallback;
  }

  /**
   * الحصول على حالة الاتصال
   */
  getConnectionStatus(): {
    current: string;
    primary: string;
    fallback: string;
    isUsingFallback: boolean;
  } {
    return {
      current: this.currentApi,
      primary: PRIMARY_API,
      fallback: FALLBACK_API,
      isUsingFallback: this.isUsingFallback,
    };
  }
}

// إنشاء instance واحد من ApiClient
export const apiClient = new ApiClient();

export default apiClient;
