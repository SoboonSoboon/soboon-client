import { Carousel } from '@/components/Atoms/Carousel/Carousel';
import { DetailHeader } from '../../components/DetailHeader';
import { DetailContent } from '../../components/DetailContent';
import { DetailContentFooter } from '../../components/DetailContentFooter';
import { CommentSection } from '../../components/CommentSection';
import { DetailAside } from '../../components/DetailAside';

const carouselImages = [
  'https://www.dummyimage.com/700x600/FF6B6B/fff',
  'https://www.dummyimage.com/700x600/FFA500/fff',
  'https://www.dummyimage.com/700x600/FFFF00/fff',
  'https://www.dummyimage.com/700x600/00FF00/fff',
  'https://www.dummyimage.com/700x600/0000FF/fff',
];

export default function ShoppingDetailPage() {
  return (
    <section>
      <DetailHeader />
      <div className="flex gap-10">
        <article className="w-[730px]">
          <Carousel carouselImages={carouselImages} className="mb-8" />
          <DetailContent />
          <DetailContentFooter />

          {/* 댓글 영역 */}
          <CommentSection />
        </article>

        <div className="sticky top-6 h-[95vh]">
          <DetailAside />
        </div>
      </div>
    </section>
  );
}
