import { ProfileSideBar } from './components';

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex w-full flex-col gap-6 md:flex-row md:gap-10">
          {/* 왼쪽 고정 프로필 */}
          <div className="w-full md:w-[340px] md:flex-shrink-0">
            <div className="md:sticky md:top-20">
              <ProfileSideBar />
            </div>
          </div>

          {/* 메인 콘텐츠 영역 */}
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
