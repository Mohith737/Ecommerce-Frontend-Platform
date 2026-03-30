import { AuthProvider } from './providers/AuthProvider';
import { CartProvider } from './providers/CartProvider';
import { ReactQueryProvider } from './providers/ReactQueryProvider';
import { ToastProvider } from './design-system/ui/molecules/Toast';
import { HashRouter } from './routes';
import { CartDrawer } from './features/cart/CartDrawer';
import { ErrorBoundary } from './routes/ErrorBoundary';

export default function App() {
  return (
    <AuthProvider>
      <ReactQueryProvider>
        <ToastProvider>
          <CartProvider>
            <ErrorBoundary>
              <HashRouter />
              <CartDrawer />
            </ErrorBoundary>
          </CartProvider>
        </ToastProvider>
      </ReactQueryProvider>
    </AuthProvider>
  );
}
