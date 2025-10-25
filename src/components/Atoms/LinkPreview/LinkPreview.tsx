'use client';

import { convertUrlsToLinks, containsUrls } from '@/utils';

interface LinkPreviewProps {
  text: string;
}

export const LinkPreview = ({ text }: LinkPreviewProps) => {
  if (!text || !containsUrls(text)) {
    return null;
  }

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: convertUrlsToLinks(text),
        }}
      />
    </div>
  );
};
