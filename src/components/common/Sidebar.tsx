import { NavLink } from 'react-router-dom';
import { NAVIGATION } from '../../constants/navigation';
import { typographyClasses } from '../../constants/typography';
import { cn } from '../../utils/cn';

export default function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-border bg-background lg:flex lg:flex-col lg:py-6">
      <nav className="flex flex-col gap-1 px-3">
        {NAVIGATION.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 transition-colors',
                typographyClasses.labelLarge,
                isActive ? 'bg-primary text-primaryText' : 'text-textSecondary hover:bg-surfaceAlt hover:text-textPrimary',
              )
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
