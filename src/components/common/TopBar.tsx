import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Lock, LogOut, Moon, Palette, Sun, User, Wallet as WalletIcon } from 'lucide-react';
import { useAuth } from '../../features/auth/context/useAuth';
import { useTheme } from '../../features/theme/ThemeContext';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import logo from '../../assets/images/logo.png';

// Demo-only display name (the app has no separate "name" field yet — only an SO ID).
const SO_DISPLAY_NAME = 'SO name displayed';

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [changePwOpen, setChangePwOpen] = useState(false);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwError, setPwError] = useState('');
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const nextTheme = theme === 'dark' ? 'light' : theme === 'light' ? 'red' : theme === 'red' ? 'green' : 'dark';

  const closeChangePw = () => {
    setChangePwOpen(false);
    setCurrentPw('');
    setNewPw('');
    setConfirmPw('');
    setPwError('');
  };

  const handleUpdatePassword = (e: FormEvent) => {
    e.preventDefault();
    if (newPw.length < 6) {
      setPwError('New password must be at least 6 characters.');
      return;
    }
    if (newPw !== confirmPw) {
      setPwError('New password and confirmation do not match.');
      return;
    }
    closeChangePw();
  };

  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-border bg-background px-5 py-4">
      {/* Logo */}
      <img
        src={logo}
        alt="PeryaPlay Logo"
        className="h-10 w-auto object-contain shrink-0"
      />

      {/* Right */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surfaceAlt text-textPrimary shadow-sm hover:bg-surface"
          aria-label={`Switch to ${nextTheme} theme`}
          title={`Switch to ${nextTheme} theme`}
        >
          {theme === 'dark' ? <Sun size={18} /> : theme === 'light' ? <Moon size={18} /> : <Palette size={18} />}
        </button>

        <div className="flex h-10 items-center gap-2 rounded-full bg-primary px-4 font-bold text-primaryText">
          <WalletIcon size={16} />
          <span>₱ {user?.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 items-center rounded-full border border-border bg-surfaceAlt pl-1 pr-2 shadow-sm"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <User
                size={18}
                strokeWidth={2.2}
                className="text-primaryText"
              />
            </div>

            <ChevronDown
              size={22}
              strokeWidth={2.5}
              className={`ml-1 text-textMuted transition-transform ${open ? 'rotate-180' : ''
                }`}
            />
          </button>

          {open && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
              <div className="absolute right-0 top-12 z-20 w-60 rounded-xl border border-border bg-surfaceAlt p-2 shadow-xl">
                <div className="px-3 py-3">
                  <div className="font-bold text-textPrimary">{SO_DISPLAY_NAME}</div>
                  <div className="text-xs text-textMuted">SO ID {user?.soId}</div>
                </div>
                <div className="my-1 h-px bg-border" />
                <button
                  onClick={() => {
                    setOpen(false);
                    setChangePwOpen(true);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-textPrimary hover:bg-surface"
                >
                  <Lock size={16} /> Change Password
                </button>
                <button
                  onClick={() => {
                    setOpen(false);
                    logout();
                    navigate('/login');
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-danger hover:bg-danger/10"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Modal
        open={changePwOpen}
        onClose={closeChangePw}
        title="Change Password"
        className="bg-surfaceAlt text-textPrimary"
      >
        <form onSubmit={handleUpdatePassword} className="flex flex-col gap-5">
          <Input
            label="Current Password"
            type="password"
            value={currentPw}
            onChange={(e) => setCurrentPw(e.target.value)}
          />
          <Input
            label="New Password"
            type="password"
            placeholder="At least 6 characters"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Re-enter new password"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
          />
          {pwError && <p className="text-sm font-semibold text-danger">{pwError}</p>}
          <div className="flex gap-3">
            <Button type="button" variant="outline" fullWidth onClick={closeChangePw}>
              Cancel
            </Button>
            <Button type="submit" fullWidth className="shadow-[0_0_24px_rgba(242,185,62,0.35)]">
              Update
            </Button>
          </div>
        </form>
      </Modal>
    </header>
  );
}
