import { SharingListSection } from './components/SharingListSection';
import { FilterSection } from './components/FilterSection';
import { SideButtonSection } from '@/components';

export default function SharingPage() {
  return (
    <section className="flex gap-10">
      <aside className="w-[200px]">
        <FilterSection />
      </aside>
      <div className="flex-1">
        <SharingListSection />
      </div>
      <SideButtonSection />
    </section>
  );
}
