import { useEffect, useState, type ReactNode } from 'react';
import { AnnouncementBar } from './AnnouncementBar';
import { Navbar } from './Navbar';
import { CategorySidebar } from './CategorySidebar';
import { Footer } from './Footer';

interface AppLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  showAnnouncement?: boolean;
}

export function AppLayout({
  children,
  showSidebar = false,
  showAnnouncement = true,
}: AppLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(
    typeof window === 'undefined' ? true : window.innerWidth >= 1024
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      {showAnnouncement ? <AnnouncementBar /> : null}
      <Navbar />
      {showSidebar ? (
        <div
          style={{
            borderBottom: '1px solid var(--color-border)',
            background: 'var(--color-white)',
            padding: '8px 16px',
            display: isDesktop ? 'none' : 'block',
          }}
        >
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            style={{
              borderRadius: 8,
              border: '1px solid var(--color-border)',
              padding: '6px 12px',
              fontSize: 14,
              fontWeight: 700,
              color: 'var(--color-text-primary)',
            }}
          >
            Browse Categories
          </button>
        </div>
      ) : null}
      <div style={{ display: 'flex', flex: 1, alignItems: 'stretch' }}>
        {showSidebar && isDesktop ? (
          <div>
            <CategorySidebar onCategorySelect={() => {}} />
          </div>
        ) : null}
        <main style={{ minWidth: 0, flex: 1, background: 'var(--color-gray-50)' }}>{children}</main>
      </div>
      {showSidebar && mobileSidebarOpen && !isDesktop ? (
        <div style={{ position: 'fixed', inset: 0, zIndex: 80 }}>
          <button
            type="button"
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }}
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close categories"
          />
          <div
            style={{
              position: 'relative',
              height: '100%',
              width: 280,
              background: 'var(--color-white)',
              boxShadow: '0 10px 28px rgba(0,0,0,0.2)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--color-border)',
                padding: 12,
              }}
            >
              <p style={{ fontSize: 14, fontWeight: 700 }}>Categories</p>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                style={{
                  borderRadius: 6,
                  padding: '4px 8px',
                  fontSize: 14,
                  color: 'var(--color-text-muted)',
                }}
              >
                Close
              </button>
            </div>
            <div style={{ height: 'calc(100% - 53px)', overflowY: 'auto' }}>
              <CategorySidebar onCategorySelect={() => setMobileSidebarOpen(false)} />
            </div>
          </div>
        </div>
      ) : null}
      <Footer />
    </div>
  );
}
