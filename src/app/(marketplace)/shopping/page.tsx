import { SideButtonSection } from '@/components';
import { FilterSection } from './components/FilterSection';
import { ShoppingListSection } from './components/ShoppingListSection';

export default function ShoppingPage() {
  return (
    <section>
      <FilterSection />
      <ShoppingListSection />
      <SideButtonSection />
    </section>
  );
}
