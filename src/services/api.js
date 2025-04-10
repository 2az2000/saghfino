export const registerUser = async (userData) => {
    const response = await fetch("http://localhost:3004/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return response;
  };
  // بررسی یکتا بودن نام کاربری
export const checkUsernameUnique = async (username) => {
  const response = await fetch(`http://localhost:3004/users?name=${username}`);
  const users = await response.json();
  return users.length === 0; // اگر کاربری با این نام وجود نداشته باشد، true برمی‌گرداند
};

// بررسی یکتا بودن ایمیل
export const checkEmailUnique = async (email) => {
  const response = await fetch(`http://localhost:3004/users?email=${email}`);
  const users = await response.json();
  return users.length === 0; // اگر کاربری با این ایمیل وجود نداشته باشد، true برمی‌گرداند
};