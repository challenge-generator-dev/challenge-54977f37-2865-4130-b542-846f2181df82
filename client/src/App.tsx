import { Container, Typography, Box, AppBar, Toolbar } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { OrdersPage } from './features/orders/OrdersPage';

function App() {
  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <ShoppingCartIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gestión de Órdenes
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <OrdersPage />
      </Container>
    </Box>
  );
}

export default App;