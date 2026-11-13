import { useState } from 'react';
import { Container, Typography, Box, Alert, Snackbar } from '@mui/material';
import { CreateOrderForm } from './components/CreateOrderForm';
import { OrderList } from './components/OrderList';
import { UpdateOrderForm } from './components/UpdateOrderForm';
import { useOrders } from './hooks/useOrders';
import type { Order } from './types/order.types';

export function OrdersPage() {
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [notification, setNotification] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const {
    orders,
    isLoading,
    error,
    createOrder,
    updateOrder,
    deleteOrder,
  } = useOrders();

  const handleCreateSuccess = () => {
    setShowCreateForm(false);
    setNotification({
      open: true,
      message: 'Orden creada exitosamente',
      severity: 'success',
    });
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
  };

  const handleUpdateSuccess = () => {
    setEditingOrder(null);
    setNotification({
      open: true,
      message: 'Orden actualizada exitosamente',
      severity: 'success',
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteOrder(id);
      setNotification({
        open: true,
        message: 'Orden eliminada exitosamente',
        severity: 'success',
      });
    } catch (err) {
      setNotification({
        open: true,
        message: 'Error al eliminar la orden',
        severity: 'error',
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingOrder(null);
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Órdenes
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Administra las órdenes de tu sistema de comercio electrónico
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Error al cargar las órdenes: {error.message}
        </Alert>
      )}

      {showCreateForm ? (
        <CreateOrderForm onSuccess={handleCreateSuccess} />
      ) : editingOrder ? (
        <UpdateOrderForm
          order={editingOrder}
          onSuccess={handleUpdateSuccess}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <CreateOrderForm onSuccess={handleCreateSuccess} />
          </Box>
          <OrderList
            orders={orders}
            isLoading={isLoading}
            error={error}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}