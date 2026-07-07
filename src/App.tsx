import AppRouter from './app/router/AppRouter';
import { AuthProvider } from './features/auth/context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
