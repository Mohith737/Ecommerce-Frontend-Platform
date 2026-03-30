import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react';
import { Spinner } from '@/design-system/ui/atoms';
import { PageSkeleton } from '@/design-system/ui/molecules';
import { useAuth } from '@/providers/AuthProvider';
import { navigate } from '@/utils/navigate';
import { ErrorBoundary } from './ErrorBoundary';

const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })));
const SignInPage = lazy(() => import('@/pages/SignInPage').then(m => ({ default: m.SignInPage })));
const SignUpPage = lazy(() => import('@/pages/SignUpPage').then(m => ({ default: m.SignUpPage })));
const PLPPage = lazy(() => import('@/pages/PLPPage').then(m => ({ default: m.PLPPage })));
const PDPPage = lazy(() => import('@/pages/PDPPage').then(m => ({ default: m.PDPPage })));
const CheckoutPage = lazy(() =>
  import('@/pages/CheckoutPage').then(m => ({ default: m.CheckoutPage }))
);
const ProfilePage = lazy(() =>
  import('@/pages/ProfilePage').then(m => ({ default: m.ProfilePage }))
);
const OrderSuccessPage = lazy(() =>
  import('@/pages/OrderSuccessPage').then(m => ({ default: m.OrderSuccessPage }))
);
const OrderTrackingPage = lazy(() => import('@/pages/OrderTracking'));
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage }))
);
const Search = lazy(() => import('@/pages/Search'));
const Category = lazy(() => import('@/pages/Category'));
const Compare = lazy(() => import('@/pages/Compare'));
const Cart = lazy(() => import('@/pages/Cart'));

function parseHash(hash: string): { route: string; params: Record<string, string> } {
  const path = hash.replace(/^#\/?/, '') || 'home';
  const pdpMatch = path.match(/^pdp\/(\d+)/);
  if (pdpMatch) return { route: 'pdp', params: { id: pdpMatch[1] } };

  const categoryMatch = path.match(/^category\/(\d+)/);
  if (categoryMatch) return { route: 'category', params: { id: categoryMatch[1] } };

  const [routePath, qs] = path.split('?');
  const params = Object.fromEntries(new URLSearchParams(qs ?? ''));
  return { route: routePath, params };
}

function FullScreenSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner size={48} />
    </div>
  );
}

export function HashRouter() {
  const [hash, setHash] = useState(window.location.hash || '#/home');
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    const handler = () => setHash(window.location.hash || '#/home');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [hash]);

  const { route, params } = parseHash(hash);

  if (isLoading) return <FullScreenSpinner />;

  const guardedRoutes = [
    'checkout',
    'profile',
    'profile/wishlist',
    'profile/orders',
    'order-success',
    'order-tracking',
  ];
  if (guardedRoutes.includes(route) && !isAuthenticated) {
    navigate('/sign-in');
    return null;
  }

  const renderWithBoundary = (node: ReactNode) => (
    <ErrorBoundary resetKey={hash}>{node}</ErrorBoundary>
  );

  switch (route) {
    case '':
    case 'home':
      return renderWithBoundary(
        <Suspense fallback={<PageSkeleton />}>
          <HomePage />
        </Suspense>
      );
    case 'sign-in':
      return renderWithBoundary(
        <Suspense fallback={<PageSkeleton />}>
          <SignInPage />
        </Suspense>
      );
    case 'sign-up':
      return renderWithBoundary(
        <Suspense fallback={<PageSkeleton />}>
          <SignUpPage />
        </Suspense>
      );
    case 'plp':
      return renderWithBoundary(
        <Suspense fallback={<PageSkeleton />}>
          <PLPPage params={params} />
        </Suspense>
      );
    case 'search':
      return renderWithBoundary(
        <Suspense fallback={<PageSkeleton />}>
          <Search key={hash} params={params} />
        </Suspense>
      );
    case 'category':
      return renderWithBoundary(
        <Suspense fallback={<PageSkeleton />}>
          <Category categoryId={Number(params.id)} />
        </Suspense>
      );
    case 'compare':
      return renderWithBoundary(
        <Suspense fallback={<PageSkeleton />}>
          <Compare />
        </Suspense>
      );
    case 'cart':
      return renderWithBoundary(
        <Suspense fallback={<PageSkeleton />}>
          <Cart />
        </Suspense>
      );
    case 'pdp':
      return renderWithBoundary(
        <Suspense fallback={<PageSkeleton />}>
          <PDPPage productId={Number(params.id)} />
        </Suspense>
      );
    case 'checkout':
      return renderWithBoundary(
        <Suspense fallback={<PageSkeleton />}>
          <CheckoutPage />
        </Suspense>
      );
    case 'profile':
    case 'profile/wishlist':
    case 'profile/orders':
      return renderWithBoundary(
        <Suspense fallback={<PageSkeleton />}>
          <ProfilePage />
        </Suspense>
      );
    case 'order-tracking':
      return renderWithBoundary(
        <Suspense fallback={<PageSkeleton />}>
          <OrderTrackingPage params={params} />
        </Suspense>
      );
    case 'order-success':
      return renderWithBoundary(
        <Suspense fallback={<PageSkeleton />}>
          <OrderSuccessPage params={params} />
        </Suspense>
      );
    default:
      return renderWithBoundary(
        <Suspense fallback={<PageSkeleton />}>
          <NotFoundPage />
        </Suspense>
      );
  }
}
