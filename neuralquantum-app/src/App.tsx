import { Route, Switch } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { ComponentShowcase } from '@/pages/ComponentShowcase';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        
        <main className="flex-grow">
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/showcase" component={ComponentShowcase} />
            <Route path="/solutions/:category">
              {(params) => (
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-quantum-600 mb-4">
                      {params.category?.charAt(0).toUpperCase() + params.category?.slice(1)} Solutions
                    </h1>
                    <p className="text-gray-600">Coming soon...</p>
                  </div>
                </div>
              )}
            </Route>
            <Route path="/products/:product">
              {(params) => (
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-quantum-600 mb-4">
                      {params.product?.charAt(0).toUpperCase() + params.product?.slice(1)} Product
                    </h1>
                    <p className="text-gray-600">Coming soon...</p>
                  </div>
                </div>
              )}
            </Route>
            <Route>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-quantum-600 mb-4">404</h1>
                  <p className="text-xl text-gray-600 mb-8">Page not found</p>
                  <a href="/" className="text-quantum-600 hover:underline">
                    Return to homepage
                  </a>
                </div>
              </div>
            </Route>
          </Switch>
        </main>
        
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;