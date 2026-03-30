import type { ProductOut } from '@/api-sdk';
import { ErrorState, PageSkeleton, useToast } from '@/design-system/ui/molecules';
import { useAuth } from '@/providers/AuthProvider';
import { useCart } from '@/providers/CartProvider';
import { navigate } from '@/utils/navigate';
import { CategoryHeroBanner } from '../components/CategoryHeroBanner';
import { ContactSupportBanner } from '../components/ContactSupportBanner';
import { FeaturedProductsSection } from '../components/FeaturedProductsSection';
import { SubCategoryGrid } from '../components/SubCategoryGrid';
import { useCategoryQuery } from '../hooks/useCategoryQuery';
import { useCategoryProductsQuery } from '../hooks/useCategoryProductsQuery';

export function CategoryContainer({ categoryId }: { categoryId: number }) {
  const categoryQuery = useCategoryQuery(categoryId);
  const categoryProductsQuery = useCategoryProductsQuery(categoryId);
  const { addItem } = useCart();
  const { isAuthenticated, isGuest } = useAuth();
  const { showToast } = useToast();

  if (categoryQuery.isLoading) {
    return <PageSkeleton />;
  }

  if (categoryQuery.isError) {
    return (
      <div className="px-6 py-6 lg:px-8">
        <ErrorState
          fullPage
          title="Failed to load category"
          onRetry={() => categoryQuery.refetch()}
        />
      </div>
    );
  }

  const categoryName = categoryQuery.data?.name ?? 'Electronics';
  const subcategories = (categoryQuery.data?.subcategories ?? []).map(subcategory => ({
    id: subcategory.id,
    name: subcategory.name,
    itemCount: 0,
    imageUrl: subcategory.image_url,
  }));

  const products = categoryProductsQuery.data?.items ?? [];

  const handleAddToCart = (product: ProductOut) => {
    if (!isAuthenticated || isGuest) {
      showToast({
        message: 'Please sign in to add items to your cart.',
        type: 'info',
        action: {
          label: 'Sign In',
          onClick: () => navigate('/sign-in'),
        },
      });
      return;
    }

    void addItem(product.id, 1);
    showToast({ message: 'Added to cart', type: 'success' });
  };

  return (
    <div data-testid="category-page" className="space-y-6 px-6 py-6 lg:px-8">
      <CategoryHeroBanner categoryName={categoryName} productCount={products.length || undefined} />

      <SubCategoryGrid
        subcategories={subcategories}
        categoryName={categoryName}
        onSubcategoryClick={subcategoryId => navigate(`/plp?subcategory_id=${subcategoryId}`)}
      />

      <FeaturedProductsSection
        products={products}
        isLoading={categoryProductsQuery.isLoading}
        categoryName={categoryName}
        onProductClick={product => navigate(`/pdp/${product.id}`)}
        onAddToCart={handleAddToCart}
      />

      <ContactSupportBanner />
    </div>
  );
}
