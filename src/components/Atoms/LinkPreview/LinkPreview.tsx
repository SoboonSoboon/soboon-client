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
    <div className="text-primary border-gray-10 hover:bg-gray-5 cursor-pointer rounded-lg border bg-white p-3">
      <div
        dangerouslySetInnerHTML={{
          __html: convertUrlsToLinks(text),
        }}
      />
    </div>
  );
};
