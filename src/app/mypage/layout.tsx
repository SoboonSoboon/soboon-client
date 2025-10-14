import { ProfileSideBar } from './components/ProfileSideBar';

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pt-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex gap-10">
          {/* 왼쪽 고정 프로필 */}
          <div className="w-[429px] flex-shrink-0">
            <ProfileSideBar />
          </div>

          {/* 오른쪽 동적 콘텐츠 */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
