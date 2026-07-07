import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, TicketCheck, User } from 'lucide-react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { useAuth } from '../context/useAuth';

export default function LoginPage() {
  const [soId, setSoId] = useState('400001');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (login(soId, password)) {
      navigate('/');
    } else {
      setError('Enter your SO ID and password to continue.');
    }
  };

  return (
    <div className="w-full max-w-sm lg:max-w-md">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primaryText">
          <TicketCheck size={32} />
        </div>
        <h1 className="text-2xl font-black tracking-tight text-primary">PERYAPLAY</h1>
        <h2 className="mt-4 text-2xl font-bold text-textPrimary">Welcome back</h2>
        <p className="mt-1 text-sm text-textSecondary">Sign in to your gaming station</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label="SO ID"
          icon={<User size={18} />}
          value={soId}
          onChange={(e) => setSoId(e.target.value)}
          placeholder="Enter SO ID"
        />
        <Input
          label="Password"
          icon={<Lock size={18} />}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          error={error}
          rightSlot={
            <button type="button" onClick={() => setShowPassword((v) => !v)} className="text-textMuted">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />
        <Button type="submit" size="lg" fullWidth className="mt-2">
          Sign In
        </Button>
      </form>

      <p className="mt-10 text-center text-xs text-textMuted">
        Powered by <span className="font-bold text-textSecondary">NorthAlley.</span>
      </p>
    </div>
  );
}
