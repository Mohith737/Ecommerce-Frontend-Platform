import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCart, type CartItemOut, type OrderOut, type WishlistItemOut } from '@/api-sdk';
import { CardSkeletonGrid, ErrorState } from '@/design-system/ui/molecules';
import { AppLayout } from '@/layouts';
import { useAuth } from '@/providers/AuthProvider';
import { useCart } from '@/providers/CartProvider';
import { navigate } from '@/utils/navigate';
import { OrdersPage } from '../components/OrdersPage';
import { ProfileSidebar } from '../components/ProfileSidebar';
import { WishlistPage } from '../components/WishlistPage';
import { useOrdersQuery } from '../hooks/useOrdersQuery';
import { useRemoveFromWishlistMutation } from '../hooks/useRemoveFromWishlistMutation';
import { useWishlistQuery } from '../hooks/useWishlistQuery';

type Tab = 'profile' | 'wishlist' | 'orders' | 'recently-viewed' | 'addresses' | 'password';

function getActiveTab(hash: string): Tab {
  if (hash.startsWith('#/profile/wishlist')) return 'wishlist';
  if (hash.startsWith('#/profile/orders')) return 'orders';
  return 'profile';
}

export function ProfileContainer() {
  const { user, isAuthenticated, signOut } = useAuth();
  const { addItem } = useCart();

  const activeTab = getActiveTab(window.location.hash);

  const wishlistQuery = useWishlistQuery(isAuthenticated);
  const ordersQuery = useOrdersQuery(isAuthenticated);
  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(),
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 2,
  });
  const removeWishlistMutation = useRemoveFromWishlistMutation();

  const wishlistItems = useMemo(
    () => (wishlistQuery.data ?? []) as WishlistItemOut[],
    [wishlistQuery.data]
  );
  const orders = useMemo(() => (ordersQuery.data ?? []) as OrderOut[], [ordersQuery.data]);
  const cartItems = useMemo(() => (cartQuery.data ?? []) as CartItemOut[], [cartQuery.data]);
  const profileMetrics = useMemo(
    () => [
      { label: 'Total Orders', value: String(orders.length) },
      { label: 'Wishlist Items', value: String(wishlistItems.length) },
      {
        label: 'Cart Quantity',
        value: String(cartItems.reduce((sum, item) => sum + item.quantity, 0)),
      },
      {
        label: 'Total Spent',
        value: `$${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}`,
      },
    ],
    [orders, wishlistItems.length, cartItems]
  );

  if (!isAuthenticated || !user) {
    navigate('/sign-in');
    return null;
  }

  return (
    <AppLayout showSidebar showAnnouncement>
      <div
        data-testid="profile-page"
        className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col items-start gap-6 md:flex-row">
          <ProfileSidebar
            activeTab={activeTab}
            user={{ fullName: user.full_name, email: user.email }}
            onSignOut={() => {
              signOut();
              navigate('/sign-in');
            }}
          />

          <main className="min-w-0 flex-1">
            {activeTab === 'profile' ? (
              <section className="rounded-xl border border-[var(--color-border)] bg-white p-4">
                <h2 className="text-2xl font-bold">My Profile</h2>
                <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  {profileMetrics.map(metric => (
                    <div
                      key={metric.label}
                      className="rounded-lg border border-[var(--color-border)] bg-[var(--color-gray-50)] p-3"
                    >
                      <p className="text-xs font-semibold text-[var(--color-text-muted)]">
                        {metric.label}
                      </p>
                      <p className="mt-1 text-xl font-bold text-[var(--color-text-primary)]">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <InfoRow label="Full Name" value={user.full_name} />
                  <InfoRow label="Email" value={user.email} />
                  <InfoRow label="Phone" value={user.phone || '—'} />
                  <InfoRow label="City" value={user.city || '—'} />
                </div>
              </section>
            ) : null}

            {activeTab === 'wishlist' ? (
              wishlistQuery.isLoading ? (
                <CardSkeletonGrid count={4} />
              ) : (
                <WishlistPage
                  items={wishlistItems}
                  isLoading={wishlistQuery.isLoading}
                  onRemove={productId => removeWishlistMutation.mutate(productId)}
                  onAddToCart={product => {
                    void addItem(product.id, 1);
                  }}
                />
              )
            ) : null}

            {activeTab === 'orders' ? (
              ordersQuery.isError ? (
                <ErrorState onRetry={() => ordersQuery.refetch()} />
              ) : ordersQuery.isLoading ? (
                <CardSkeletonGrid count={4} />
              ) : (
                <OrdersPage
                  orders={orders}
                  isLoading={ordersQuery.isLoading}
                  onTrackOrder={orderId => navigate(`/order-tracking?orderId=${orderId}`)}
                />
              )
            ) : null}
          </main>
        </div>
      </div>
    </AppLayout>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[var(--color-border)] p-3">
      <p className="text-xs font-semibold text-[var(--color-text-muted)]">{label}</p>
      <p className="text-sm text-[var(--color-text-primary)]">{value}</p>
    </div>
  );
}
