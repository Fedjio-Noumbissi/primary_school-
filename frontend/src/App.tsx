import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AppRouter } from './router/AppRouter';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 10 * 60 * 1000, // 10 minutes — reduce calls to slow remote DB
      gcTime: 15 * 60 * 1000,    // Keep cache 15 minutes
    },
  },
});


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontFamily: 'Sora, sans-serif',
            fontSize: '14px',
            borderRadius: '10px',
          },
          success: {
            style: { background: '#059669', color: '#fff' },
            iconTheme: { primary: '#fff', secondary: '#059669' },
          },
          error: {
            style: { background: '#ef4444', color: '#fff' },
            iconTheme: { primary: '#fff', secondary: '#ef4444' },
          },
        }}
      />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;