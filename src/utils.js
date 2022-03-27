const USER_ID = "userId";
const USER_NAME = "name";
const FILE_ID = "fileId";
const FILE_INDEX = "index";
const ENCODETASK_ID = "encodeTaskId";

// 將 userId 存到 localStorage
export const setAuthToken = (userId, name) => {
  localStorage.setItem(USER_ID, userId);
  localStorage.setItem(USER_NAME, name);
};

export const setFile = (fileId) => {
  localStorage.setItem(FILE_ID, fileId);
}

export const setFileIndex = (fileIndex) => {
  localStorage.setItem(FILE_INDEX, fileIndex);
}

export const setEncodeTaskId = (encodeTaslId) => {
  localStorage.setItem(ENCODETASK_ID, encodeTaslId);
}

// 從 localStorage 讀取 token
export const getAuthToken = () => {
  return localStorage.getItem(USER_ID);
};

export const getUsername = () => {
    return localStorage.getItem(USER_NAME);
  };

export const getFileId = () => {
  return localStorage.getItem(FILE_ID);
}

export const getFileIndex = () => {
  return localStorage.getItem(FILE_INDEX);
}

export const getEncodeTaskId = () => {
  return localStorage.getItem(ENCODETASK_ID);
}