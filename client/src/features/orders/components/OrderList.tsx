import React from 'react';
import { Order } from '../types/order.types';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert } from '@mui/material';

interface OrderListProps {
  isLoading: boolean;
  error: Error | null;
  orders: Order[] | undefined;
  onEdit: (order: Order) => void;
  onDelete: (id: string) => Promise<void>;
}

export const OrderList: React.FC<OrderListProps> = ({ isLoading, error, orders, onEdit, onDelete }) => {
  if (isLoading) {
    return (
      <Paper elevation={2} sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={2} sx={{ p: 3 }}>
        <Alert severity="error">
          Error al cargar las órdenes: {error.message}
        </Alert>
      </Paper>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Paper elevation={2} sx={{ p: 3 }}>
        <Alert severity="info">
          No hay órdenes para mostrar.
        </Alert>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>User ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Total Amount</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} hover>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.userId}</TableCell>
              <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ textTransform: 'capitalize' }}
                >
                  {order.status}
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => onEdit(order)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => onDelete(order.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};