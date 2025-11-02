import { ProfileImg } from '@/components/Atoms';
import { HashTag } from '@/app/(main)/shopping/components/HashTag';
import { timeFormatter } from '@/utils';

export const AsideHeader = ({
  title,
  profileImageUrl,
  userName,
  createdAt,
  tags,
}: {
  title: string;
  profileImageUrl: string;
  userName: string;
  createdAt: string;
  tags?: string[];
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-memomentKkukkkuk line-clamp-2 text-2xl">{title}</h2>
      <div className="flex items-center gap-2">
        <ProfileImg profileImageUrl={profileImageUrl} size={24} />
        <span className="text-text-sub2">{userName}</span>
        <span className="text-text-sub2">・</span>
        <span className="text-text-sub2">{timeFormatter(createdAt)}</span>
      </div>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <HashTag tags={tags} className="hover:underline" />
        </div>
      )}
    </div>
  );
};
