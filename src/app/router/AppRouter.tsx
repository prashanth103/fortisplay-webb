import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from '../../components/layout/AppShell';
import MainLayout from '../../layouts/MainLayout';
import AuthLayout from '../../layouts/AuthLayout';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '../../features/auth/pages/LoginPage';
import HomePage from '../../features/home/pages/HomePage';
import WatchPage from '../../features/watch/pages/WatchPage';
import SalesPage from '../../features/sales/pages/SalesPage';
import PayoutsPage from '../../features/payouts/pages/PayoutsPage';
import WalletPage from '../../features/wallet/pages/WalletPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/watch" element={<WatchPage />} />
              <Route path="/sales" element={<SalesPage />} />
              <Route path="/payouts" element={<PayoutsPage />} />
              <Route path="/wallet" element={<WalletPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
