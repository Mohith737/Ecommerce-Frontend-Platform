import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/api-sdk';

export function useCreateOrderMutation() {
  return useMutation({
    mutationFn: (orderData: Parameters<typeof createOrder>[0]) => createOrder(orderData),
  });
}
