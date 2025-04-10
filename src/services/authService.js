/**
 * آدرس پایه API برای سرویس‌های احراز هویت
 */
const API_BASE_URL = "http://localhost:3004";

/**
 * کلاس خطای سفارشی برای مدیریت خطاهای احراز هویت
 * این کلاس برای ارائه اطلاعات دقیق‌تر در مورد خطاهای رخ داده در فرآیند احراز هویت استفاده می‌شود
 */
class AuthError extends Error {
  /**
   * @param {string} message - پیام خطا
   * @param {number} statusCode - کد وضعیت HTTP
   */
  constructor(message, statusCode) {
    super(message);
    this.name = "AuthError";
    this.statusCode = statusCode;
  }
}

/**
 ** کلاس سرویس احراز هویت
 ** این کلاس شامل متدهای استاتیک برای مدیریت عملیات‌های مرتبط با احراز هویت است
 */
class AuthService {
  /**
   * اعتبارسنجی توکن کاربر
   * این متد توکن را به سرور ارسال کرده و اعتبار آن را بررسی می‌کند
   *
   * @param {string} token - توکن JWT کاربر
   * @returns {Promise<Object>} نتیجه اعتبارسنجی به همراه داده‌های کاربر
   * @throws {AuthError} در صورت بروز خطا در اعتبارسنجی
   */
  static async validateToken(token) {
    try {
      // ارسال درخواست به سرور برای اعتبارسنجی توکن
      const response = await fetch(`${API_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // بررسی وضعیت پاسخ و مدیریت خطاها
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new AuthError(
          errorData.message || "Token validation failed",
          response.status
        );
      }

      // پردازش پاسخ موفق
      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      // مدیریت خطاهای مختلف
      if (error instanceof AuthError) {
        throw error;
      }

      // مدیریت خطاهای شبکه
      if (error.name === "TypeError" && error.message === "Failed to fetch") {
        throw new AuthError(
          "Network error: Unable to connect to the server",
          503
        );
      }

      // مدیریت سایر خطاهای غیرمنتظره
      throw new AuthError("An unexpected error occurred", 500);
    }
  }

  /**
   * تازه‌سازی توکن کاربر
   * این متد برای دریافت توکن جدید در صورت منقضی شدن توکن فعلی استفاده می‌شود
   *
   * @param {string} token - توکن منقضی شده
   * @returns {Promise<Object>} توکن جدید در صورت موفقیت
   * @throws {AuthError} در صورت بروز خطا در تازه‌سازی توکن
   */
  static async refreshToken(token) {
    try {
      // ارسال درخواست برای تازه‌سازی توکن
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // بررسی وضعیت پاسخ
      if (!response.ok) {
        throw new AuthError("Token refresh failed", response.status);
      }

      // پردازش پاسخ موفق و استخراج توکن جدید
      const data = await response.json();
      return {
        success: true,
        data: data.token,
      };
    } catch (error) {
      // در صورت هر گونه خطا، خطای 401 (Unauthorized) برمی‌گردانیم
      throw new AuthError("Token refresh failed", 401);
    }
  }
}

export default AuthService;
export { AuthError };
