import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { OrderService } from '../../../services/OrderService';
import { CreateOrderDto, UpdateOrderDto, Order } from '../types/order.types';

export const useOrders = () => {
  const queryClient = useQueryClient();

  const {
    data: orders,
    error,
    isLoading,
  } = useQuery<Order[], Error>({
    queryKey: ['orders'],
    queryFn: async () => {
      throw new Error('Get all orders endpoint not implemented');
    },
    retry: false,
  });

  const createOrderMutation = useMutation<Order, Error, CreateOrderDto>({
    mutationFn: OrderService.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const updateOrderMutation = useMutation<Order, Error, { id: string; data: UpdateOrderDto }>({
    mutationFn: ({ id, data }) => OrderService.updateOrder(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['orders', id] });
    },
  });

  const deleteOrderMutation = useMutation<void, Error, string>({
    mutationFn: OrderService.deleteOrder,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.removeQueries({ queryKey: ['orders', id] });
    },
  });

  const getOrderQuery = (id: string) => {
    return useQuery<Order, Error>({
      queryKey: ['orders', id],
      queryFn: () => OrderService.getOrder(id),
      enabled: !!id,
    });
  };

  const handleDelete = async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      deleteOrderMutation.mutate(id, {
        onSuccess: () => resolve(),
        onError: (error) => reject(error),
      });
    });
  };

  return {
    orders,
    error,
    isLoading,
    createOrder: createOrderMutation.mutate,
    createOrderAsync: createOrderMutation.mutateAsync,
    createOrderStatus: createOrderMutation,
    updateOrder: updateOrderMutation.mutate,
    updateOrderAsync: updateOrderMutation.mutateAsync,
    updateOrderStatus: updateOrderMutation,
    deleteOrder: handleDelete,
    deleteOrderMutation: deleteOrderMutation.mutate,
    deleteOrderStatus: deleteOrderMutation,
    getOrder: getOrderQuery,
  };
};