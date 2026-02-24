import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LandingPage from './pages/LandingPage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import WishlistPage from './pages/WishlistPage';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminLayout from './components/Layout/AdminLayout';
import ProductList from './pages/Admin/ProductList';
import ProductForm from './pages/Admin/ProductForm';
import UploadTest from './pages/UploadTest';
import CompareModal from './components/UI/CompareModal';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col font-sans text-neutral-900 bg-neutral-50 selection:bg-primary/20">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={
          <><Header /><main className="flex-grow"><AnimatePresence mode="wait"><LandingPage /></AnimatePresence></main><Footer /></>
        } />
        <Route path="/catalog" element={
          <><Header /><main className="flex-grow"><AnimatePresence mode="wait"><CatalogPage /></AnimatePresence></main><Footer /></>
        } />
        <Route path="/product/:id" element={
          <><Header /><main className="flex-grow"><AnimatePresence mode="wait"><ProductDetailPage /></AnimatePresence></main><Footer /></>
        } />
        <Route path="/wishlist" element={
          <><Header /><main className="flex-grow"><AnimatePresence mode="wait"><WishlistPage /></AnimatePresence></main><Footer /></>
        } />
        <Route path="/upload-test" element={
          <><Header /><main className="flex-grow"><UploadTest /></main><Footer /></>
        } />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/products" />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/create" element={<ProductForm />} />
          <Route path="products/edit/:id" element={<ProductForm />} />
        </Route>
      </Routes>
      <CompareModal />
    </div>
  );
}

export default App;
