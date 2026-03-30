import userCircleIcon from '@/assets/icons/user-circle.svg';

interface ProfileSidebarProps {
  activeTab: 'profile' | 'wishlist' | 'orders' | 'recently-viewed' | 'addresses' | 'password';
  user: { fullName: string; email: string };
  onSignOut: () => void;
}

const NAV_ITEMS: Array<{ key: ProfileSidebarProps['activeTab']; label: string; href?: string }> = [
  { key: 'profile', label: 'My Profile', href: '#/profile' },
  { key: 'wishlist', label: 'My Wishlist', href: '#/profile/wishlist' },
  { key: 'orders', label: 'My Orders', href: '#/profile/orders' },
  { key: 'recently-viewed', label: 'Recently Viewed' },
  { key: 'addresses', label: 'Manage Addresses' },
  { key: 'password', label: 'Change Password' },
];

export function ProfileSidebar({ activeTab, user, onSignOut }: ProfileSidebarProps) {
  const initials = user.fullName
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside
      data-testid="profile-sidebar"
      className="w-full rounded-xl border border-[var(--color-border)] bg-white p-4 lg:w-[240px] lg:min-w-[240px]"
    >
      <div className="mb-4 flex items-center gap-3 border-b border-[var(--color-border)] pb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)]/15 text-sm font-bold text-[var(--color-primary)]">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[var(--color-text-primary)]">
            {user.fullName}
          </p>
          <p className="truncate text-xs text-[var(--color-text-muted)]">{user.email}</p>
        </div>
        <img src={userCircleIcon} alt="user" className="h-4 w-4 opacity-60" />
      </div>

      <nav className="space-y-1">
        {NAV_ITEMS.map(item => {
          const active = item.key === activeTab;
          return item.href ? (
            <a
              key={item.key}
              data-testid="profile-sidebar-nav-item"
              href={item.href}
              className={`block rounded-md px-3 py-2 text-sm ${
                active
                  ? 'border-r-2 border-[var(--color-primary)] bg-[var(--color-primary-light)] font-semibold text-[var(--color-primary)]'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-gray-100)]'
              }`}
            >
              {item.label}
            </a>
          ) : (
            <span
              key={item.key}
              data-testid="profile-sidebar-nav-item"
              className={`block rounded-md px-3 py-2 text-sm ${
                active
                  ? 'border-r-2 border-[var(--color-primary)] bg-[var(--color-primary-light)] font-semibold text-[var(--color-primary)]'
                  : 'text-[var(--color-text-secondary)]'
              }`}
            >
              {item.label}
            </span>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={onSignOut}
        className="mt-4 w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm font-semibold"
      >
        Sign Out
      </button>
    </aside>
  );
}
