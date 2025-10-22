import { getReceivedReview } from '@/apis/mypage/getReview';
import { ProfileSideBar } from './components';

export default async function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const reviews = await getReceivedReview();
  return (
    <div className="h-screen pt-8">
      <div className="mx-auto h-full max-w-[1200px]">
        <div className="flex h-full w-full gap-10">
          {/* 왼쪽 고정 프로필 */}
          <div className="w-[340px] flex-shrink-0">
            <ProfileSideBar reviewData={reviews.data} />
          </div>

          {/* 오른쪽 동적 콘텐츠 */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
