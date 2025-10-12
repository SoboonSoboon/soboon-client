import { Carousel } from '@/components/Atoms/Carousel/Carousel';
import { ShoppingDetailHeader } from './components/ShoppingDetailHeader';
import { ShoppingDetailAside } from './components/ShoppingDetailAside';
import { ShoppingDetailContentFooter } from './components/ShoppingDetailContentFooter';
import { ShoppingDetailContent } from './components/ShoppingDetailContent';
import { ShoppingComment } from './components/ShoppingComment';

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
      <ShoppingDetailHeader />
      <div className="flex gap-10">
        <article className="w-[730px]">
          <Carousel carouselImages={carouselImages} className="mb-8" />
          <ShoppingDetailContent />
          <ShoppingDetailContentFooter />

          {/* 댓글 영역 */}
          <ShoppingComment />
        </article>

        <div className="sticky top-6 h-[95vh]">
          <ShoppingDetailAside />
        </div>
      </div>
    </section>
  );
}
