import { CategoryContainer } from '@/features/category';
import { AppLayout } from '@/layouts';

interface CategoryProps {
  categoryId: number;
}

export default function Category({ categoryId }: CategoryProps) {
  return (
    <AppLayout showSidebar showAnnouncement>
      <CategoryContainer categoryId={categoryId} />
    </AppLayout>
  );
}
