import { useMutation } from '@tanstack/react-query';
import { register } from '@/api-sdk';
import type { RegisterRequest, TokenResponse } from '@/api-sdk';
import type { UseRegisterMutationResult } from '../types';

export const useRegisterMutation = (): UseRegisterMutationResult => {
  const { data, isPending, isError, error, mutateAsync, reset } = useMutation<
    TokenResponse,
    Error,
    RegisterRequest
  >({
    mutationFn: async (requestData: RegisterRequest) => {
      return register(requestData);
    },
  });

  return {
    mutate: async (payload: RegisterRequest) => {
      await mutateAsync(payload);
    },
    data: data ?? null,
    isLoading: isPending,
    error: isError ? (error as Error) : null,
    reset,
  };
};
