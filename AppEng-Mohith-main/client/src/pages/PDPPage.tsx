import { PDPContainer } from '@/features/pdp/PDPContainer';

export function PDPPage({ productId }: { productId: number }) {
  return <PDPContainer productId={productId} />;
}
