export function AnnouncementBar() {
  return (
    <div
      style={{
        height: 'var(--topbar-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        background: 'var(--color-gray-900)',
        color: '#fff',
        fontSize: 12,
      }}
    >
      <p style={{ color: 'var(--color-gray-300)' }}>Welcome to Shophub</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <a
          href="#"
          style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-gray-200)' }}
        >
          <span aria-hidden="true">📍</span>
          <span>Deliver to 423651</span>
        </a>
        <a
          href="#"
          style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-gray-200)' }}
        >
          <span aria-hidden="true">🚚</span>
          <span>Track your order</span>
        </a>
        <a
          href="#"
          style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-gray-200)' }}
        >
          <span aria-hidden="true">✦</span>
          <span>All Offers</span>
        </a>
      </div>
    </div>
  );
}
