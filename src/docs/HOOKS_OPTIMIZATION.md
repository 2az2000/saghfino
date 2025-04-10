# بهینه‌سازی در React با useCallback و useMemo

## فهرست مطالب

1. [مقدمه](#مقدمه)
2. [useCallback](#usecallback)
3. [useMemo](#usememo)
4. [مقایسه useCallback و useMemo](#مقایسه)
5. [نمونه‌های کاربردی](#نمونه‌های-کاربردی)
6. [بهترین شیوه‌ها](#بهترین-شیوه‌ها)

## مقدمه

در React، هر بار که کامپوننت دوباره رندر می‌شود، تمام توابع و مقادیر درون آن از نو ساخته می‌شوند. این می‌تواند در برنامه‌های بزرگ باعث کاهش عملکرد شود. برای حل این مشکل، React دو هوک مهم ارائه می‌دهد:

- `useCallback`: برای ذخیره‌سازی توابع
- `useMemo`: برای ذخیره‌سازی مقادیر

## useCallback

### تعریف

`useCallback` یک هوک React است که به ما کمک می‌کند تا یک نسخه ذخیره شده (memoized) از یک تابع را نگهداری کنیم. این تابع فقط زمانی دوباره ساخته می‌شود که یکی از وابستگی‌های آن تغییر کند.

### ساختار پایه

```javascript
const memoizedCallback = useCallback(
  () => {
    // تابع شما
  },
  [
    /* آرایه وابستگی‌ها */
  ]
);
```

### مثال ساده

```javascript
// بدون useCallback
const MyComponent = () => {
  const handleClick = () => {
    console.log("Clicked!");
  };

  return <button onClick={handleClick}>Click me</button>;
};

// با useCallback
const MyComponent = () => {
  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []); // آرایه خالی چون تابع به هیچ متغیری وابسته نیست

  return <button onClick={handleClick}>Click me</button>;
};
```

### مثال پیشرفته

```javascript
const UserProfile = ({ userId }) => {
  // این تابع فقط زمانی دوباره ساخته می‌شود که userId تغییر کند
  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [userId]);

  return (
    <div>
      <UserDataFetcher onFetch={fetchUserData} />
    </div>
  );
};
```

## useMemo

### تعریف

`useMemo` برای ذخیره‌سازی نتیجه محاسبات پیچیده استفاده می‌شود. این هوک از محاسبات غیرضروری در هر رندر جلوگیری می‌کند.

### ساختار پایه

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

### مثال ساده

```javascript
// بدون useMemo
const MyComponent = ({ numbers }) => {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return <div>Sum: {sum}</div>;
};

// با useMemo
const MyComponent = ({ numbers }) => {
  const sum = useMemo(() => {
    return numbers.reduce((acc, num) => acc + num, 0);
  }, [numbers]);

  return <div>Sum: {sum}</div>;
};
```

### مثال پیشرفته

```javascript
const ProductList = ({ products, filter }) => {
  // فیلتر کردن محصولات فقط زمانی انجام می‌شود که products یا filter تغییر کنند
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return product.name.toLowerCase().includes(filter.toLowerCase());
    });
  }, [products, filter]);

  return (
    <ul>
      {filteredProducts.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
};
```

## مقایسه useCallback و useMemo

### تفاوت‌های اصلی

1. **useCallback**:

   - برای ذخیره‌سازی توابع استفاده می‌شود
   - خود تابع را ذخیره می‌کند
   - مناسب برای prop drilling و event handlers

2. **useMemo**:
   - برای ذخیره‌سازی مقادیر استفاده می‌شود
   - نتیجه فراخوانی تابع را ذخیره می‌کند
   - مناسب برای محاسبات پیچیده

### مثال مقایسه‌ای

```javascript
const MyComponent = ({ data }) => {
  // ذخیره‌سازی تابع با useCallback
  const handleData = useCallback(() => {
    return data.filter((item) => item.active);
  }, [data]);

  // ذخیره‌سازی نتیجه با useMemo
  const filteredData = useMemo(() => {
    return data.filter((item) => item.active);
  }, [data]);

  return (
    <div>
      <ChildComponent onData={handleData} /> {/* تابع ارسال می‌شود */}
      <DataDisplay data={filteredData} /> {/* نتیجه ارسال می‌شود */}
    </div>
  );
};
```

## نمونه‌های کاربردی

### 1. مدیریت فرم‌ها

```javascript
const FormComponent = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await submitForm(formData);
      } catch (error) {
        console.error("Form submission error:", error);
      }
    },
    [formData]
  );

  const isFormValid = useMemo(() => {
    return formData.name.length > 0 && formData.email.includes("@");
  }, [formData.name, formData.email]);

  return (
    <form onSubmit={handleSubmit}>
      {/* فرم شما */}
      <button disabled={!isFormValid}>Submit</button>
    </form>
  );
};
```

### 2. جدول داده‌ها

```javascript
const DataTable = ({ data, sortBy }) => {
  const sortData = useCallback(
    (a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    },
    [sortBy]
  );

  const sortedData = useMemo(() => {
    return [...data].sort(sortData);
  }, [data, sortData]);

  return (
    <table>
      <tbody>
        {sortedData.map((item) => (
          <tr key={item.id}>
            <td>{item[sortBy]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
```

## بهترین شیوه‌ها

### 1. زمان استفاده از useCallback

- برای توابعی که به کامپوننت‌های فرزند پاس داده می‌شوند
- برای توابعی که در useEffect استفاده می‌شوند
- برای توابعی که محاسبات پیچیده انجام می‌دهند

```javascript
// مثال خوب
const handleSearch = useCallback(
  (query) => {
    // جستجو در لیست بزرگی از داده‌ها
  },
  [
    /* وابستگی‌های ضروری */
  ]
);

// مثال نامناسب - تابع ساده نیازی به useCallback ندارد
const handleClick = useCallback(() => {
  setCount(count + 1);
}, [count]);
```

### 2. زمان استفاده از useMemo

- برای محاسبات پیچیده و زمان‌بر
- برای جلوگیری از رندرهای غیرضروری در کامپوننت‌های فرزند
- برای داده‌هایی که نیاز به پردازش دارند

```javascript
// مثال خوب
const expensiveValue = useMemo(() => {
  return someExpensiveOperation(props.data);
}, [props.data]);

// مثال نامناسب - محاسبه ساده نیازی به useMemo ندارد
const simpleValue = useMemo(() => {
  return props.value * 2;
}, [props.value]);
```

### 3. نکات مهم

1. **استفاده بجا**:

   - از این هوک‌ها فقط در موارد ضروری استفاده کنید
   - استفاده بیش از حد می‌تواند باعث پیچیده کردن کد شود

2. **مدیریت وابستگی‌ها**:

   - همیشه وابستگی‌های صحیح را در آرایه وابستگی‌ها قرار دهید
   - از ESLint برای کنترل وابستگی‌ها استفاده کنید

3. **تست و دیباگ**:
   - اطمینان حاصل کنید که مقادیر ذخیره شده به درستی به‌روز می‌شوند
   - از ابزارهای React DevTools برای بررسی رندرها استفاده کنید

## نتیجه‌گیری

استفاده درست از `useCallback` و `useMemo` می‌تواند به بهبود عملکرد برنامه‌های React کمک کند. اما مهم است که:

1. فقط در موارد ضروری از آنها استفاده کنید
2. وابستگی‌ها را به درستی مدیریت کنید
3. تأثیر آنها بر عملکرد را اندازه‌گیری کنید
4. از پیچیده کردن بی‌مورد کد خودداری کنید
