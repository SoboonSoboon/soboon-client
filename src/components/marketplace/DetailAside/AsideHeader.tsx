import { ProfileImg } from '@/components';

export const AsideHeader = ({
  title,
  profileImageUrl,
  userName,
}: {
  title: string;
  profileImageUrl: string;
  userName: string;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-memomentKkukkkuk line-clamp-2 text-2xl">{title}</h2>
      <div className="flex items-center gap-2">
        <ProfileImg profileImageUrl={profileImageUrl} size={24} />
        <span className="text-text-sub2">{userName}</span>
      </div>
    </div>
  );
};
