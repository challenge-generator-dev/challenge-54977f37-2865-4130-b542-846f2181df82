import React, { useState } from 'react';
import { useOrders } from '../hooks/useOrders';
import { CreateOrderDto, OrderItem } from '../types/order.types';
import { Button, TextField, Box, Typography, Paper, CircularProgress, Alert } from '@mui/material';

interface CreateOrderFormProps {
  onSuccess: () => void;
}

export const CreateOrderForm: React.FC<CreateOrderFormProps> = ({ onSuccess }) => {
  const [userId, setUserId] = useState('');
  const [items, setItems] = useState<OrderItem[]>([{ productId: '', quantity: 1, price: 0 }]);
  const [status, setStatus] = useState('pending');
  const { createOrder, createOrderStatus } = useOrders();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const orderData: CreateOrderDto = {
      userId,
      items,
      totalAmount,
      status,
    };
    await createOrder(orderData);
    onSuccess();
  };

  const handleItemChange = (index: number, field: keyof OrderItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { productId: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <Paper elevation={3} style={{ padding: '24px', marginBottom: '24px' }}>
      <Typography variant="h6" gutterBottom>
        Create New Order
      </Typography>
      {createOrderStatus.error && (
        <Alert severity="error" style={{ marginBottom: '16px' }}>
          {createOrderStatus.error.message}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            fullWidth
            required
          />
        </Box>
        <Typography variant="subtitle1" gutterBottom>
          Items
        </Typography>
        {items.map((item, index) => (
          <Box key={index} mb={2} display="flex" gap={2}>
            <TextField
              label="Product ID"
              value={item.productId}
              onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
              required
            />
            <TextField
              label="Quantity"
              type="number"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
              required
              inputProps={{ min: 1 }}
            />
            <TextField
              label="Price"
              type="number"
              value={item.price}
              onChange={(e) => handleItemChange(index, 'price', Number(e.target.value))}
              required
              inputProps={{ min: 0, step: 0.01 }}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={() => removeItem(index)}
              disabled={items.length <= 1}
            >
              Remove
            </Button>
          </Box>
        ))}
        <Button
          variant="outlined"
          onClick={addItem}
          style={{ marginBottom: '16px' }}
        >
          Add Item
        </Button>
        <Box mb={2}>
          <TextField
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            required
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={createOrderStatus.isPending}
        >
          {createOrderStatus.isPending ? <CircularProgress size={24} /> : 'Create Order'}
        </Button>
      </form>
    </Paper>
  );
};