const URL_REGEX = /(https?:\/\/[^\s]+)/g;

export const convertUrlsToLinks = (text: string): string => {
  return text.replace(URL_REGEX, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });
};

export const containsUrls = (text: string): boolean => {
  return URL_REGEX.test(text);
};

export const extractUrls = (text: string): string[] => {
  const urls = text.match(URL_REGEX) || [];
  return urls;
};

export const splitTextByUrls = (
  text: string,
): { type: 'text' | 'url'; content: string }[] => {
  const parts: { type: 'text' | 'url'; content: string }[] = [];
  let lastIndex = 0;

  const matches = Array.from(text.matchAll(URL_REGEX));

  matches.forEach((match) => {
    if (match.index !== undefined) {
      // URL 이전의 텍스트 추가
      if (match.index > lastIndex) {
        const textContent = text.slice(lastIndex, match.index).trim();
        if (textContent) {
          parts.push({ type: 'text', content: textContent });
        }
      }

      // URL 추가
      parts.push({ type: 'url', content: match[0] });
      lastIndex = match.index + match[0].length;
    }
  });

  // 마지막 텍스트 추가
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex).trim();
    if (remainingText) {
      parts.push({ type: 'text', content: remainingText });
    }
  }

  return parts;
};
