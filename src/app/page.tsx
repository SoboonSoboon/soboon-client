import { IntroSection } from '@/components/intro/IntroSection';
import { IntroScroll } from '@/components/intro/IntroScroll';
import { IntroCarousel } from '@/components/intro/IntroCarousel';
import { IntroAccordion } from '@/components/intro/IntroAccordion';

export default function Home() {
  return (
    <section>
      <IntroSection />
      <IntroScroll />
      <IntroCarousel />
      <IntroAccordion />
    </section>
  );
}
