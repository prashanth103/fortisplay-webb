import { NavLink } from 'react-router-dom';
import { NAVIGATION } from '../../constants/navigation';
import { cn } from '../../utils/cn';

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-center border-t border-border bg-background lg:hidden">
      {NAVIGATION.map(({ label, path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          end={path === '/'}
          className={({ isActive }) =>
            cn(
              'flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium',
              isActive ? 'text-primary' : 'text-textMuted',
            )
          }
        >
          <Icon size={22} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
