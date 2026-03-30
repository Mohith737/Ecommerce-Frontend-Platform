import { useEffect, useState, type MouseEvent } from 'react';

const POPULAR_CATEGORIES = [
  { name: 'Electronics', href: '#/category/1' },
  { name: 'Beverages', href: '#/category/2' },
  { name: 'Personal Care', href: '#/category/3' },
  { name: 'Home Care', href: '#/category/4' },
  { name: 'Baby Care', href: '#/category/5' },
  { name: 'Vegetables & Fruits', href: '#/category/6' },
  { name: 'Dairy & Bakery', href: '#/category/7' },
];

const CUSTOMER_SERVICES = [
  { name: 'About Us', href: '#' },
  { name: 'Terms & Conditions', href: '#' },
  { name: 'FAQ', href: '#' },
  { name: 'Privacy Policy', href: '#' },
  { name: 'E-waste Policy', href: '#' },
  { name: 'Cancellation & Return Policy', href: '#' },
];

export function Footer() {
  const [width, setWidth] = useState<number>(
    typeof window === 'undefined' ? 1440 : window.innerWidth
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const columns =
    width >= 1024
      ? 'repeat(4, minmax(0, 1fr))'
      : width >= 640
        ? 'repeat(2, minmax(0, 1fr))'
        : '1fr';

  const handleCategoryNavigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    window.setTimeout(() => {
      window.location.hash = href;
    }, 0);
  };

  return (
    <footer
      style={{
        backgroundColor: '#13002B',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: '-32px',
          right: '24px',
          width: '160px',
          height: '160px',
          borderRadius: '9999px',
          backgroundColor: '#7C3AED',
          opacity: 0.3,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '48px 24px 24px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: columns,
            gap: width >= 1024 ? '40px' : '24px',
            marginBottom: '40px',
          }}
        >
          <div>
            <p
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: '#FFFFFF',
              }}
            >
              SHOPHUB
            </p>
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '14px', color: '#C7C4D8', marginBottom: '6px' }}>
                WhatsApp: +1234 999 2132
              </p>
              <p style={{ fontSize: '14px', color: '#C7C4D8' }}>Call: +1234 919 2132</p>
            </div>
            <p
              style={{
                marginBottom: '10px',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#C7C4D8',
              }}
            >
              Download App
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href="#"
                style={{
                  width: 'fit-content',
                  border: '1px solid #615782',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#FFFFFF',
                  fontSize: '12px',
                }}
              >
                App Store
              </a>
              <a
                href="#"
                style={{
                  width: 'fit-content',
                  border: '1px solid #615782',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#FFFFFF',
                  fontSize: '12px',
                }}
              >
                Google Play
              </a>
            </div>
          </div>

          <div>
            <p
              style={{
                marginBottom: '16px',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#FFFFFF',
              }}
            >
              Most Popular Categories
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {POPULAR_CATEGORIES.map(item => (
                <li key={item.name} style={{ marginBottom: '10px' }}>
                  <a
                    href={item.href}
                    onClick={event => handleCategoryNavigate(event, item.href)}
                    style={{ fontSize: '14px', color: '#C7C4D8' }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              style={{
                marginBottom: '16px',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#FFFFFF',
              }}
            >
              Customer Services
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {CUSTOMER_SERVICES.map(item => (
                <li key={item.name} style={{ marginBottom: '10px' }}>
                  <a href={item.href} style={{ fontSize: '14px', color: '#C7C4D8' }}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              style={{
                marginBottom: '16px',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#FFFFFF',
              }}
            >
              Contact Us
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px', fontSize: '14px', color: '#C7C4D8' }}>
                support@shophub.com
              </li>
              <li style={{ marginBottom: '10px', fontSize: '14px', color: '#C7C4D8' }}>
                +1 234 999 2132
              </li>
              <li style={{ marginBottom: '10px', fontSize: '14px', color: '#C7C4D8' }}>
                +1 234 919 2132
              </li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #4A406A', paddingTop: '16px' }}>
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#8F89A8' }}>
            © 2025 All rights reserved. Balance Retail Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}
