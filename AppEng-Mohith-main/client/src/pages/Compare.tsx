import { CompareTable } from '@/features/compare/components/CompareTable';
import { AppLayout } from '@/layouts';

export default function Compare() {
  return (
    <AppLayout showSidebar showAnnouncement>
      <div
        data-testid="compare-page"
        className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
      >
        <CompareTable />
      </div>
    </AppLayout>
  );
}
