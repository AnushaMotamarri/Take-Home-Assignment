export const getCache = key => {
  const item = localStorage.getItem(key);
  if (!item) return null;

  try {
    const parsed = JSON.parse(item);
    const now = new Date().getTime();
    if (now - parsed.timestamp > 3600000) return null;

    return parsed.data;
  } catch {
    return null;
  }
};

export const setCache = (key, data) => {
  localStorage.setItem(key, JSON.stringify({ data, timestamp: new Date().getTime() }));
};
