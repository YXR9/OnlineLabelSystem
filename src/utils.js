const USER_ID = "userId";
const USER_NAME = "name";
const FILE_ID = "fileId";
const FILE_INDEX = "index";
const ENCODETASK_ID = "encodeTaskId";
const FILE_NAME = "fileName";
const COLLECTOR = "collector";
const SOURCE_TARGET = "sourceTarget";
const HEAD_COUNTS = "headCounts";
const COLLECT_DATE = "collectDate";
const COLLECT_METHOD = "collectMethod";
const CONTEXT = "context";

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

export const setFileName = (fileName) => {
  localStorage.setItem(FILE_NAME, fileName);
}

export const setCollector = (collector) => {
  localStorage.setItem(COLLECTOR, collector);
}

export const setSourceTarget = (sourceTarget) => {
  localStorage.setItem(SOURCE_TARGET, sourceTarget);
}

export const setHeadCounts = (headCounts) => {
  localStorage.setItem(HEAD_COUNTS, headCounts);
}

export const setCollectDate = (collectDate) => {
  localStorage.setItem(COLLECT_DATE, collectDate);
}

export const setCollectMethod = (collectMethod) => {
  localStorage.setItem(COLLECT_METHOD, collectMethod);
}

export const setContext = (context) => {
  localStorage.setItem(CONTEXT, context);
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

export const getFileName = () => {
  return localStorage.getItem(FILE_NAME);
}

export const getCollector = () => {
  return localStorage.getItem(COLLECTOR);
}

export const getSourceTarget = () => {
  return localStorage.getItem(SOURCE_TARGET);
}

export const getHeadCounts = () => {
  return localStorage.getItem(HEAD_COUNTS);
}

export const getCollectDate = () => {
  return localStorage.getItem(COLLECT_DATE);
}

export const getCollectMethod = () => {
  return localStorage.getItem(COLLECT_METHOD);
}

export const getContext = () => {
  return localStorage.getItem(CONTEXT);
}