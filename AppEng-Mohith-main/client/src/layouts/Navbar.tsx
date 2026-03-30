import { useEffect, useState } from 'react';
import { SearchBar } from '@/features/search';
import { useAuth } from '@/providers/AuthProvider';
import { useCart } from '@/providers/CartProvider';
import { useCartStore } from '@/stores/cartStore';
import { navigate } from '@/utils/navigate';

export function Navbar() {
  const { user, isAuthenticated, isGuest, signOut } = useAuth();
  const cart = useCart();
  const cartItemCount = useCartStore(state => state.itemCount());
  const [query, setQuery] = useState('');

  const initials = (() => {
    if (!user?.full_name) return 'U';
    return user.full_name
      .split(' ')
      .slice(0, 2)
      .map(part => part[0]?.toUpperCase() ?? '')
      .join('');
  })();

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      const queryString = hash.split('?')[1] ?? '';
      const params = new URLSearchParams(queryString);
      setQuery(params.get('q') ?? '');
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const handleSearch = (value: string) => {
    const next = value.trim();
    if (!next) {
      navigate('/search');
      return;
    }
    navigate(`/search?q=${encodeURIComponent(next)}`);
  };

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-white)',
        boxShadow: '0 1px 4px rgba(15, 23, 42, 0.06)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 16px',
          minHeight: '56px',
        }}
      >
        <button
          onClick={() => navigate('/home')}
          style={{
            flexShrink: 0,
            fontFamily: 'var(--font-display)',
            fontSize: '34px',
            lineHeight: 1,
            fontWeight: 800,
            color: 'var(--color-primary)',
            letterSpacing: '-0.02em',
          }}
          aria-label="Go to home"
        >
          ShopHub
        </button>

        <div style={{ flex: 1, minWidth: 0, margin: '0 8px' }}>
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={handleSearch}
            inputTestId="navbar-search-input"
            onFocus={() => {
              if (!window.location.hash.startsWith('#/search')) {
                navigate('/search');
              }
            }}
            className="h-10"
          />
        </div>

        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            flexShrink: 0,
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap',
          }}
        >
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate('/profile')}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '9999px',
                  background: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  fontSize: '13px',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Profile"
              >
                {initials}
              </button>
              <button
                className="relative hidden rounded-full p-2 text-lg hover:bg-[var(--color-gray-100)] md:block"
                aria-label="Wishlist"
              >
                ♡<span className="absolute -right-1 -top-1 text-[10px]">0</span>
              </button>
              <button
                className="relative rounded-full p-2 text-lg hover:bg-[var(--color-gray-100)]"
                onClick={() => navigate('/cart')}
                data-testid="cart-count"
                aria-label="Cart"
              >
                🛒
                {cartItemCount > 0 ? (
                  <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1 text-[10px] text-white">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                ) : null}
              </button>
              <button
                type="button"
                style={{
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  background: 'transparent',
                }}
                onClick={signOut}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                style={{
                  border: '1px solid var(--color-primary)',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                  background: 'var(--color-white)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={() => navigate('/sign-in')}
              >
                Sign In
              </button>
              <button
                type="button"
                style={{
                  border: '1px solid var(--color-primary)',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'white',
                  background: 'var(--color-primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={() => navigate('/sign-up')}
              >
                Sign Up
              </button>
              {isGuest ? (
                <button
                  onClick={() => navigate('/cart')}
                  className="rounded-full p-2 text-lg hover:bg-[var(--color-gray-100)]"
                  aria-label="Guest cart"
                >
                  🛒{cart?.itemCount ?? 0}
                </button>
              ) : null}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
