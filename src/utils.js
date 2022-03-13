const USER_ID = "userId";
const USER_NAME = "name";

// 將 userId 存到 localStorage
export const setAuthToken = (userId, name) => {
  localStorage.setItem(USER_ID, userId);
  localStorage.setItem(USER_NAME, name);
};

// 從 localStorage 讀取 token
export const getAuthToken = () => {
  return localStorage.getItem(USER_ID);
};

export const getUsername = () => {
    return localStorage.getItem(USER_NAME);
  };