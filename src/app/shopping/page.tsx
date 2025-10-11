import { SideButtonSection } from '@/components';
import { FilterSection } from './components/FilterSection';
import { IntroSection } from './components/IntroSection';
import { ShoppingListSection } from './components/ShoppingListSection';

export default function ShoppingPage() {
  return (
    <section>
      <IntroSection />
      <FilterSection />
      <ShoppingListSection />
      <SideButtonSection />
    </section>
  );
}
