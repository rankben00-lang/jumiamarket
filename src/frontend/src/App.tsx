import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { UserRole } from "@/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy } from "react";

// Lazy-loaded pages
const Home = lazy(() => import("@/pages/Home"));
const Products = lazy(() => import("@/pages/Products"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const Cart = lazy(() => import("@/pages/Cart"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const AccountOrders = lazy(() => import("@/pages/AccountOrders"));
const SellerDashboard = lazy(() => import("@/pages/seller/SellerDashboard"));
const SellerProducts = lazy(() => import("@/pages/seller/SellerProducts"));
const SellerOrders = lazy(() => import("@/pages/seller/SellerOrders"));
const AdminSellers = lazy(() => import("@/pages/admin/AdminSellers"));
const AdminProducts = lazy(() => import("@/pages/admin/AdminProducts"));
const AdminOrders = lazy(() => import("@/pages/admin/AdminOrders"));

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, retry: 1 } },
});

const PageLoader = () => (
  <div className="flex flex-1 items-center justify-center min-h-[60vh]">
    <Loader2 className="h-7 w-7 animate-spin text-primary" />
  </div>
);

const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Layout>
      <Home />
    </Layout>
  ),
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  validateSearch: (search: Record<string, unknown>) => ({
    q: search.q as string | undefined,
    category: search.category as string | undefined,
  }),
  component: () => (
    <Layout>
      <Products />
    </Layout>
  ),
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$id",
  component: () => (
    <Layout>
      <ProductDetail />
    </Layout>
  ),
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: () => (
    <Layout>
      <Cart />
    </Layout>
  ),
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: () => (
    <Layout>
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    </Layout>
  ),
});

const accountOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account/orders",
  component: () => (
    <Layout>
      <ProtectedRoute>
        <AccountOrders />
      </ProtectedRoute>
    </Layout>
  ),
});

const sellerDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/seller/dashboard",
  component: () => (
    <Layout>
      <ProtectedRoute requiredRole={UserRole.seller}>
        <SellerDashboard />
      </ProtectedRoute>
    </Layout>
  ),
});

const sellerProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/seller/products",
  component: () => (
    <Layout>
      <ProtectedRoute requiredRole={UserRole.seller}>
        <SellerProducts />
      </ProtectedRoute>
    </Layout>
  ),
});

const sellerOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/seller/orders",
  component: () => (
    <Layout>
      <ProtectedRoute requiredRole={UserRole.seller}>
        <SellerOrders />
      </ProtectedRoute>
    </Layout>
  ),
});

const adminSellersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/sellers",
  component: () => (
    <Layout>
      <ProtectedRoute requiredRole={UserRole.admin}>
        <AdminSellers />
      </ProtectedRoute>
    </Layout>
  ),
});

const adminProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products",
  component: () => (
    <Layout>
      <ProtectedRoute requiredRole={UserRole.admin}>
        <AdminProducts />
      </ProtectedRoute>
    </Layout>
  ),
});

const adminOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/orders",
  component: () => (
    <Layout>
      <ProtectedRoute requiredRole={UserRole.admin}>
        <AdminOrders />
      </ProtectedRoute>
    </Layout>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  productsRoute,
  productDetailRoute,
  cartRoute,
  checkoutRoute,
  accountOrdersRoute,
  sellerDashboardRoute,
  sellerProductsRoute,
  sellerOrdersRoute,
  adminSellersRoute,
  adminProductsRoute,
  adminOrdersRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <RouterProvider router={router} />
            <Toaster richColors position="top-right" />
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
