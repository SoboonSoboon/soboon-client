import { ProfileSideBar } from './components';

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen pt-8">
      <div className="mx-auto h-full max-w-[1200px]">
        <div className="flex h-full w-full gap-10">
          {/* 왼쪽 고정 프로필 */}
          <div className="w-[340px] flex-shrink-0">
            <ProfileSideBar />
          </div>

          {/* 오른쪽 동적 콘텐츠 */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
