import { convertUrlsToLinks } from '@/utils';

export const DetailContent = ({ description }: { description: string }) => {
  return (
    <div className="flex w-full flex-col break-words">
      <div
        dangerouslySetInnerHTML={{
          __html: convertUrlsToLinks(description),
        }}
      />
    </div>
  );
};
