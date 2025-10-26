'use client';

import { containsUrls, extractUrls, splitTextByUrls } from '@/utils';
import { ExternalLink } from 'lucide-react';

interface LinkRendererProps {
  text: string;
}

export const LinkRenderer = ({ text }: LinkRendererProps) => {
  if (!text) {
    return null;
  }

  if (!containsUrls(text)) {
    return <div className="p-2 text-gray-700">{text}</div>;
  }

  const urls = extractUrls(text);
  const textParts = splitTextByUrls(text);

  return (
    <div className="space-y-2">
      {textParts.map((part, index) => {
        if (part.type === 'url') {
          return (
            <div
              key={index}
              className="border-gray-10 hover:bg-gray-5 cursor-pointer rounded-lg border bg-white p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <ExternalLink className="size-4 text-gray-500" />
                <a
                  href={part.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary flex-1 text-sm break-all"
                >
                  {part.content}
                </a>
              </div>
            </div>
          );
        } else {
          return (
            <div key={index} className="p-2 text-gray-700">
              {part.content}
            </div>
          );
        }
      })}
    </div>
  );
};
