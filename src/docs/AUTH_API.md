# مستندات API های احراز هویت

## نقاط پایانی (Endpoints)

### 1. ورود کاربر (Login)

```http
POST http://localhost:3004/users
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### پاسخ موفق

```json
{
  "user": {
    "id": 1,
    "name": "نام کاربر",
    "email": "user@example.com",
    "phone": "09123456789"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### کدهای خطا

- `401`: نام کاربری یا رمز عبور اشتباه
- `403`: حساب کاربری مسدود شده
- `500`: خطای سرور

### 2. ثبت‌نام کاربر (Register)

```http
POST http://localhost:3004/users/register
Content-Type: application/json

{
  "name": "نام کاربر",
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "phone": "09123456789"
}
```

#### پاسخ موفق

```json
{
  "user": {
    "id": 1,
    "name": "نام کاربر",
    "email": "user@example.com",
    "phone": "09123456789"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### کدهای خطا

- `400`: داده‌های نامعتبر
- `409`: ایمیل تکراری
- `500`: خطای سرور

### 3. تازه‌سازی توکن (Refresh Token)

```http
POST http://localhost:3004/auth/refresh
Authorization: Bearer <token>
Content-Type: application/json
```

#### پاسخ موفق

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### کدهای خطا

- `401`: توکن نامعتبر
- `403`: توکن منقضی شده
- `500`: خطای سرور

### 4. اعتبارسنجی توکن (Validate Token)

```http
GET http://localhost:3004/users
Authorization: Bearer <token>
Content-Type: application/json
```

#### پاسخ موفق

```json
{
  "user": {
    "id": 1,
    "name": "نام کاربر",
    "email": "user@example.com",
    "phone": "09123456789"
  }
}
```

#### کدهای خطا

- `401`: توکن نامعتبر
- `403`: توکن منقضی شده
- `500`: خطای سرور

## نحوه استفاده در کد

### 1. تنظیمات اولیه

```javascript
const API_BASE_URL = "http://localhost:3004";
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};
```

### 2. توابع کمکی

```javascript
// افزودن هدر Authorization
const addAuthHeader = (headers, token) => ({
  ...headers,
  Authorization: `Bearer ${token}`,
});

// بررسی پاسخ و مدیریت خطا
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new AuthError(errorData.message || "خطا در عملیات", response.status);
  }
  return response.json();
};
```

### 3. پیاده‌سازی درخواست‌ها

#### ورود کاربر

```javascript
const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(credentials),
    });
    return await handleResponse(response);
  } catch (error) {
    throw new AuthError("خطا در ورود به سیستم", 500);
  }
};
```

#### ثبت‌نام کاربر

```javascript
const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(userData),
    });
    return await handleResponse(response);
  } catch (error) {
    throw new AuthError("خطا در ثبت‌نام", 500);
  }
};
```

#### تازه‌سازی توکن

```javascript
const refreshToken = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: addAuthHeader(DEFAULT_HEADERS, token),
    });
    return await handleResponse(response);
  } catch (error) {
    throw new AuthError("خطا در تازه‌سازی توکن", 401);
  }
};
```

## نکات امنیتی

### 1. مدیریت توکن

- استفاده از JWT برای توکن‌ها
- ذخیره‌سازی امن در کوکی‌ها
- تازه‌سازی خودکار توکن‌های منقضی شده

### 2. اعتبارسنجی درخواست‌ها

- بررسی هدرهای امنیتی
- اعتبارسنجی داده‌های ورودی
- محدودیت تعداد درخواست‌ها

### 3. امنیت انتقال داده

- استفاده از HTTPS
- رمزنگاری داده‌های حساس
- محافظت در برابر حملات متداول

## مثال‌های کاربردی

### 1. ورود کاربر

```javascript
try {
  const credentials = {
    email: "user@example.com",
    password: "password123",
  };
  const response = await loginUser(credentials);
  handleLoginSuccess(response);
} catch (error) {
  handleLoginError(error);
}
```

### 2. ثبت‌نام کاربر

```javascript
try {
  const userData = {
    name: "نام کاربر",
    email: "user@example.com",
    password: "password123",
    phone: "09123456789",
  };
  const response = await registerUser(userData);
  handleRegisterSuccess(response);
} catch (error) {
  handleRegisterError(error);
}
```

### 3. تازه‌سازی خودکار توکن

```javascript
try {
  const token = getCookie("accessToken");
  if (isTokenExpired(token)) {
    const newToken = await refreshToken(token);
    updateToken(newToken);
  }
} catch (error) {
  handleTokenRefreshError(error);
}
```

## توصیه‌های پیاده‌سازی

### 1. مدیریت خطا

- استفاده از try/catch در تمام درخواست‌ها
- پیام‌های خطای مناسب برای کاربر
- لاگ کردن خطاها برای دیباگ

### 2. امنیت

- استفاده از HTTPS
- اعتبارسنجی تمام ورودی‌ها
- محدودیت تعداد درخواست‌ها

### 3. کارایی

- کش کردن پاسخ‌ها
- مدیریت بهینه درخواست‌ها
- استفاده از تکنیک‌های بهینه‌سازی
