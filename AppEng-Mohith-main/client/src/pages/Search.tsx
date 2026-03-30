import { AppLayout } from '@/layouts';
import { SearchContainer } from '@/features/search';

interface SearchProps {
  params: Record<string, string>;
}

export default function Search({ params }: SearchProps) {
  return (
    <AppLayout showSidebar showAnnouncement>
      <div data-testid="search-page">
        <SearchContainer params={params} />
      </div>
    </AppLayout>
  );
}
