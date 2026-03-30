import { AppLayout } from '@/layouts';
import { OrderTracking as OrderTrackingView } from '@/features/checkout';

interface OrderTrackingProps {
  params: Record<string, string>;
}

export default function OrderTracking({ params }: OrderTrackingProps) {
  return (
    <AppLayout showSidebar={false} showAnnouncement>
      <div data-testid="order-tracking-page-wrapper">
        <OrderTrackingView orderId={params.orderId} />
      </div>
    </AppLayout>
  );
}
