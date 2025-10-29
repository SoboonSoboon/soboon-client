import { ProfileImg } from '@/components';
import { HashTag } from '@/app/(main)/shopping/components/HashTag';

export const AsideHeader = ({
  title,
  profileImageUrl,
  userName,
  tags,
}: {
  title: string;
  profileImageUrl: string;
  userName: string;
  tags?: string[];
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-memomentKkukkkuk line-clamp-2 text-2xl">{title}</h2>
      <div className="flex items-center gap-2">
        <ProfileImg profileImageUrl={profileImageUrl} size={24} />
        <span className="text-text-sub2">{userName}</span>
      </div>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <HashTag tags={tags} className="hover:underline" />
        </div>
      )}
    </div>
  );
};
