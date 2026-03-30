import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeFromWishlist } from '@/api-sdk';

export function useRemoveFromWishlistMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: number) => removeFromWishlist(productId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  });
}
