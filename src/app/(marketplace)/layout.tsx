import { SideButtonSection } from '@/components';

export default function ShoppingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <SideButtonSection />
    </div>
  );
}
