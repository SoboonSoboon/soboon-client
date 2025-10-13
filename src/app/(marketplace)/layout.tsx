import { IntroSection } from './components/IntroSection';

export default function ShoppingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <IntroSection />
      {children}
    </div>
  );
}
