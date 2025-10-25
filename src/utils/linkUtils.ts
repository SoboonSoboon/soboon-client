const URL_REGEX = /(https?:\/\/[^\s]+)/g;

export const convertUrlsToLinks = (text: string): string => {
  return text.replace(URL_REGEX, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });
};

export const containsUrls = (text: string): boolean => {
  return URL_REGEX.test(text);
};
