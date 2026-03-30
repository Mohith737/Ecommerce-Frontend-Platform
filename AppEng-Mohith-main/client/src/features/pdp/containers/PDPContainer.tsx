import { useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { addToCart, getDemoProducts, type ReviewOut } from '@/api-sdk';
import { ErrorState, PageSkeleton, useToast } from '@/design-system/ui/molecules';
import { AppLayout } from '@/layouts';
import { useAuth } from '@/providers/AuthProvider';
import { navigate } from '@/utils/navigate';
import { CompareBar } from '../components/CompareBar';
import { ProductActions } from '../components/ProductActions';
import { ProductImageGallery } from '../components/ProductImageGallery';
import { StockStatusBar } from '../components/StockStatusBar';
import { useProductQuery } from '../hooks/useProductQuery';
import { useProductReviewsQuery } from '../hooks/useProductReviewsQuery';
import { RecentlyViewed } from '../RecentlyViewed';
import { ReviewsSection } from '../ReviewsSection';
import { getStockStatus } from '../utils/stockStatus';

export function PDPContainer({ productId }: { productId: number }) {
  const { isAuthenticated, isGuest } = useAuth();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const productQuery = useProductQuery(productId);
  const reviewsQuery = useProductReviewsQuery(productId);
  const demoProductsQuery = useQuery({
    queryKey: ['pdp-demo-products'],
    queryFn: () => getDemoProducts(),
    staleTime: 1000 * 60 * 2,
  });

  const product = productQuery.data;

  const reviews: ReviewOut[] = useMemo(() => reviewsQuery.data ?? [], [reviewsQuery.data]);
  const average = useMemo(
    () =>
      reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0,
    [reviews]
  );

  if (productQuery.isLoading) {
    return <PageSkeleton />;
  }

  if (productQuery.isError || !product) {
    return (
      <ErrorState fullPage title="Failed to load product" onRetry={() => productQuery.refetch()} />
    );
  }

  const stockStatus = getStockStatus(product.stock);

  const handleAddToCart = async (quantity: number) => {
    if (!isAuthenticated || isGuest) {
      showToast({
        message: 'Please sign in to add items to your cart.',
        type: 'info',
        action: { label: 'Sign In', onClick: () => navigate('/sign-in') },
      });
      return;
    }

    try {
      await addToCart({ product_id: product.id, quantity });
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
      showToast({ message: 'Added to cart', type: 'success' });
    } catch (error) {
      showToast({
        message: error instanceof Error ? error.message : 'Failed to add product to cart.',
        type: 'error',
      });
    }
  };

  return (
    <AppLayout showSidebar showAnnouncement>
      <div
        data-testid="pdp-page"
        style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px' }}
      >
        <StockStatusBar stockStatus={stockStatus} />

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 40, flexWrap: 'wrap' }}>
          <div style={{ width: 420, minWidth: 300, flex: '0 0 auto' }}>
            <ProductImageGallery
              images={[product.image_url]}
              stockStatus={stockStatus}
              productName={product.name}
            />
          </div>

          <div style={{ minWidth: 320, flex: 1 }}>
            <ProductActions
              product={product}
              stockStatus={stockStatus}
              onAddToCart={handleAddToCart}
              onBuyNow={quantity => {
                void handleAddToCart(quantity);
                navigate('/cart');
              }}
              onShowMaxCompareMessage={() =>
                showToast({ message: 'Maximum 3 products for comparison', type: 'info' })
              }
            />
          </div>
        </div>

        <div style={{ marginTop: 28 }}>
          <ReviewsSection reviews={reviews} averageRating={average} />
        </div>
        <div style={{ marginTop: 24 }}>
          <RecentlyViewed products={demoProductsQuery.data ?? []} />
        </div>
      </div>
      <CompareBar />
    </AppLayout>
  );
}
