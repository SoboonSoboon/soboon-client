import { Carousel } from '@/components/Atoms/Carousel/Carousel';
import {
  DetailHeader,
  DetailContent,
  DetailContentFooter,
  CommentSection,
  DetailAside,
} from '@/app/(marketplace)/components';

const carouselImages = [
  'https://www.dummyimage.com/700x600/FF6B6B/fff',
  'https://www.dummyimage.com/700x600/FFA500/fff',
  'https://www.dummyimage.com/700x600/FFFF00/fff',
  'https://www.dummyimage.com/700x600/00FF00/fff',
  'https://www.dummyimage.com/700x600/0000FF/fff',
];

export default function ShoppingDetailPage() {
  const mockData = {
    description: '상품에 대한 자세한 설명입니다.',
    createdAt: '2024-01-15T10:30:00Z',
    title: '함께 장보기 모임',
    detail_address: '서울특별시 강남구 테헤란로 123',
    current_member: 3,
    total_member: 5,
  };
  return (
    <section>
      <DetailHeader />
      <div className="flex gap-10">
        <article className="w-[730px]">
          <Carousel carouselImages={carouselImages} className="mb-8" />
          <DetailContent description={mockData.description} />
          <DetailContentFooter createdAt={mockData.createdAt} />

          {/* 댓글 영역 */}
          <CommentSection />
        </article>

        <div className="sticky top-6 h-[95vh]">
          <DetailAside
            title={mockData.title}
            detail_address={mockData.detail_address}
            current_member={mockData.current_member}
            total_member={mockData.total_member}
          />
        </div>
      </div>
    </section>
  );
}
