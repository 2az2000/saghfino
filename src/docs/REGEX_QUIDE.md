# راهنمای جامع Regular Expressions (Regex) در JavaScript

## فهرست مطالب
1. [مقدمه](#مقدمه)
2. [مفاهیم پایه](#مفاهیم-پایه)
3. [متدهای اصلی](#متدهای-اصلی)
4. [الگوهای پرکاربرد](#الگوهای-پرکاربرد)
5. [مثال‌های کاربردی](#مثال‌های-کاربردی)
6. [نکات پیشرفته](#نکات-پیشرفته)

## مقدمه
Regular Expressions یا Regex، ابزاری قدرتمند برای جستجو، تطبیق و دستکاری رشته‌ها است. در JavaScript، Regex به طور گسترده برای اعتبارسنجی فرم‌ها، پردازش متن و جستجوی الگوها استفاده می‌شود.

## مفاهیم پایه

### 1. ساخت یک Regex
در JavaScript دو روش برای ساخت Regex وجود دارد:

```javascript
// روش 1: استفاده از اسلش‌ها
const regex1 = /pattern/;

// روش 2: استفاده از سازنده RegExp
const regex2 = new RegExp('pattern');
```

### 2. کاراکترهای خاص
- `.` : هر کاراکتر به جز خط جدید
- `^` : ابتدای رشته
- `$` : انتهای رشته
- `*` : صفر یا بیشتر تکرار
- `+` : یک یا بیشتر تکرار
- `?` : صفر یا یک تکرار
- `\` : escape کردن کاراکترهای خاص

### 3. کلاس‌های کاراکتری
```javascript
\d  // اعداد (0-9)
\D  // غیر اعداد
\w  // کاراکترهای کلمه (a-z, A-Z, 0-9, _)
\W  // غیر کاراکترهای کلمه
\s  // فضای خالی (space, tab, newline)
\S  // غیر فضای خالی
```

## متدهای اصلی

### 1. test()
برای بررسی وجود الگو در رشته:
```javascript
const text = "Hello, 123";
const hasNumber = /\d+/.test(text);  // true
```

### 2. match()
برای یافتن تمام تطابق‌ها:
```javascript
const text = "The year is 2024";
const matches = text.match(/\d+/);  // ["2024"]
```

### 3. exec()
برای یافتن تطابق‌ها با جزئیات بیشتر:
```javascript
const regex = /(\w+)\s(\d+)/;
const result = regex.exec("Year 2024");
// result[0]: "Year 2024"
// result[1]: "Year"
// result[2]: "2024"
```

## الگوهای پرکاربرد

### 1. اعتبارسنجی ایمیل
```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
emailRegex.test("user@example.com");  // true
```

### 2. اعتبارسنجی شماره تلفن ایران
```javascript
const phoneRegex = /^(\+98|0)?9\d{9}$/;
phoneRegex.test("09123456789");  // true
```

### 3. اعتبارسنجی کد ملی
```javascript
const nationalIdRegex = /^\d{10}$/;
nationalIdRegex.test("1234567890");  // true
```

## مثال‌های کاربردی

### 1. استخراج اعداد از متن
```javascript
const text = "قیمت محصول 1500000 تومان است";
const numbers = text.match(/\d+/g);  // ["1500000"]
```

### 2. تغییر فرمت تاریخ
```javascript
const date = "2024-02-15";
const persianDate = date.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1");
// نتیجه: "15/02/2024"
```

### 3. اعتبارسنجی رمز عبور
```javascript
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
// حداقل 8 کاراکتر، شامل حروف بزرگ، کوچک و اعداد
```

### 4. جداسازی کلمات
```javascript
const text = "Hello,World!How are you?";
const words = text.split(/[,!?]/);  // ["Hello", "World", "How are you", ""]
```

### 5. استخراج عدد از نام فایل (مثال پروژه)
```javascript
const filename = "home8.png";
const match = filename.match(/home(\d+)/);
if (match) {
    const number = parseInt(match[1]);  // 8
}
```

## نکات پیشرفته

### 1. گروه‌بندی و ارجاع
```javascript
// گروه‌بندی با ()
const regex = /(\w+)\s(\w+)/;
const text = "John Doe";
const match = text.match(regex);
// match[1]: "John"
// match[2]: "Doe"
```

### 2. Lookahead و Lookbehind
```javascript
// Positive lookahead
/\w+(?=\d)/  // کلمه قبل از عدد

// Negative lookahead
/\w+(?!\d)/  // کلمه که بعدش عدد نباشد

// Positive lookbehind (ES2018+)
/(?<=\d)\w+/  // کلمه بعد از عدد

// Negative lookbehind (ES2018+)
/(?<!\d)\w+/  // کلمه که قبلش عدد نباشد
```

### 3. پرچم‌های Regex
```javascript
/pattern/g   // Global - یافتن همه تطابق‌ها
/pattern/i   // Case-insensitive - عدم حساسیت به بزرگی و کوچکی حروف
/pattern/m   // Multiline - فعال کردن ^ و $ برای هر خط
/pattern/s   // Dotall - . همه کاراکترها از جمله خط جدید را تطبیق می‌دهد
/pattern/u   // Unicode - فعال کردن پشتیبانی از یونیکد
/pattern/y   // Sticky - جستجو از موقعیت دقیق
```

### 4. بهینه‌سازی کارایی
1. از `^` و `$` برای محدود کردن جستجو استفاده کنید
2. از الگوهای حریصانه (`.*`) کمتر استفاده کنید
3. گروه‌های غیر capture کننده `(?:...)` را در نظر بگیرید
4. Regex‌های پیچیده را پیش‌کامپایل کنید

## نکات امنیتی
1. از Regex برای اعتبارسنجی HTML استفاده نکنید
2. مراقب حملات ReDoS باشید
3. ورودی‌های کاربر را محدود کنید
4. از الگوهای بسیار پیچیده اجتناب کنید

## منابع بیشتر
1. [MDN Web Docs - RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
2. [RegExr - آزمایش آنلاین Regex](https://regexr.com/)
3. [regex101 - تست و دیباگ Regex](https://regex101.com/)

## نتیجه‌گیری
Regex ابزاری قدرتمند است که با استفاده صحیح می‌تواند بسیاری از عملیات پردازش متن را ساده کند. با این حال، استفاده نادرست می‌تواند منجر به مشکلات کارایی و امنیتی شود. همیشه Regex‌های خود را به خوبی تست کنید و از الگوهای مناسب برای هر مورد استفاده کنید.