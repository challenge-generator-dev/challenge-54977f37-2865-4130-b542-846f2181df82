import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Alert,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { Order, UpdateOrderDto, OrderItem } from '../types/order.types';
import { useOrders } from '../hooks/useOrders';

interface UpdateOrderFormProps {
  order: Order;
  onSuccess: () => void;
  onCancel: () => void;
}

const STATUS_OPTIONS = ['pending', 'processing', 'completed', 'cancelled'];

export const UpdateOrderForm: React.FC<UpdateOrderFormProps> = ({
  order,
  onSuccess,
  onCancel
}) => {
  const { updateOrder } = useOrders();
  
  const [formData, setFormData] = useState<UpdateOrderDto>({
    items: [...order.items],
    totalAmount: order.totalAmount,
    status: order.status
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newItem, setNewItem] = useState({ productId: '', quantity: 1, price: 0 });

  useEffect(() => {
    setFormData({
      items: [...order.items],
      totalAmount: order.totalAmount,
      status: order.status
    });
  }, [order]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.status) {
      newErrors.status = 'El estado es requerido';
    }

    if (!formData.items || formData.items.length === 0) {
      newErrors.items = 'Debe tener al menos un artículo';
    }

    const calculatedTotal = formData.items?.reduce(
      (sum, item) => sum + item.price * item.quantity, 
      0
    ) || 0;
    
    if (formData.totalAmount !== calculatedTotal) {
      newErrors.totalAmount = 'El total no coincide con la suma de los artículos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof UpdateOrderDto, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAddItem = () => {
    if (!newItem.productId.trim()) {
      setErrors(prev => ({ ...prev, newItem: 'El ID del producto es requerido' }));
      return;
    }
    if (newItem.quantity <= 0) {
      setErrors(prev => ({ ...prev, newItem: 'La cantidad debe ser mayor a 0' }));
      return;
    }
    if (newItem.price <= 0) {
      setErrors(prev => ({ ...prev, newItem: 'El precio debe ser mayor a 0' }));
      return;
    }

    const item: OrderItem = {
      productId: newItem.productId,
      quantity: newItem.quantity,
      price: newItem.price
    };

    const updatedItems = [...(formData.items || []), item];
    const newTotal = updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    setFormData(prev => ({
      ...prev,
      items: updatedItems,
      totalAmount: newTotal
    }));
    
    setNewItem({ productId: '', quantity: 1, price: 0 });
    setErrors(prev => ({ ...prev, newItem: '' }));
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = formData.items?.filter((_, i) => i !== index) || [];
    const newTotal = updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    
    setFormData(prev => ({
      ...prev,
      items: updatedItems,
      totalAmount: newTotal
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setIsUpdating(true);
      await updateOrder({ id: order.id, data: formData });
      onSuccess();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Error al actualizar la orden');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Actualizar Orden
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Orden ID: {order.id}
      </Typography>

      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setSubmitError(null)}>
          {submitError}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.status}>
          <InputLabel id="status-label">Estado</InputLabel>
          <Select
            labelId="status-label"
            value={formData.status}
            label="Estado"
            onChange={(e) => handleInputChange('status', e.target.value)}
          >
            {STATUS_OPTIONS.map((status) => (
              <MenuItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </MenuItem>
            ))}
          </Select>
          {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
        </FormControl>

        <TextField
          fullWidth
          label="Monto Total"
          type="number"
          value={formData.totalAmount}
          onChange={(e) => handleInputChange('totalAmount', parseFloat(e.target.value) || 0)}
          error={!!errors.totalAmount}
          helperText={errors.totalAmount}
          sx={{ mb: 3 }}
          InputProps={{
            readOnly: true,
            inputProps: { step: '0.01' }
          }}
        />

        <Typography variant="h6" gutterBottom>
          Artículos
        </Typography>
        
        {errors.items && (
          <Alert severity="warning" sx={{ mb: 2 }}>{errors.items}</Alert>
        )}

        <List sx={{ mb: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          {formData.items?.map((item, index) => (
            <ListItem key={`${item.productId}-${index}`} divider>
              <ListItemText
                primary={`Producto: ${item.productId}`}
                secondary={`Cantidad: ${item.quantity} | Precio: $${item.price.toFixed(2)} | Subtotal: $${(item.quantity * item.price).toFixed(2)}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="eliminar"
                  onClick={() => handleRemoveItem(index)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          {(!formData.items || formData.items.length === 0) && (
            <ListItem>
              <ListItemText primary="No hay artículos en la orden" />
            </ListItem>
          )}
        </List>

        <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Agregar Artículo
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <TextField
              label="ID Producto"
              value={newItem.productId}
              onChange={(e) => setNewItem(prev => ({ ...prev, productId: e.target.value }))}
              size="small"
              sx={{ flex: 1 }}
            />
            <TextField
              label="Cantidad"
              type="number"
              value={newItem.quantity}
              onChange={(e) => setNewItem(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
              size="small"
              sx={{ width: 100 }}
              inputProps={{ min: 1 }}
            />
            <TextField
              label="Precio"
              type="number"
              value={newItem.price}
              onChange={(e) => setNewItem(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
              size="small"
              sx={{ width: 120 }}
              inputProps={{ step: 0.01, min: 0 }}
            />
            <Button
              variant="contained"
              onClick={handleAddItem}
              startIcon={<AddIcon />}
              sx={{ height: 40 }}
            >
              Agregar
            </Button>
          </Box>
          {errors.newItem && (
            <FormHelperText error>{errors.newItem}</FormHelperText>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            onClick={onCancel}
            disabled={isUpdating}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isUpdating}
            startIcon={isUpdating ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isUpdating ? 'Actualizando...' : 'Actualizar Orden'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};