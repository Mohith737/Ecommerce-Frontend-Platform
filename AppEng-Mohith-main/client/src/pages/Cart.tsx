import { CartContainer } from '@/features/cart';
import { AppLayout } from '@/layouts';

export default function Cart() {
  return (
    <AppLayout showSidebar showAnnouncement>
      <div data-testid="cart-page">
        <CartContainer />
      </div>
    </AppLayout>
  );
}
