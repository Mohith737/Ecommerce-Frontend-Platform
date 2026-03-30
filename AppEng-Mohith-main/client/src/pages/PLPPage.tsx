import { PLPContainer } from '@/features/plp/PLPContainer';

export function PLPPage({ params }: { params: Record<string, string> }) {
  return <PLPContainer params={params} />;
}
