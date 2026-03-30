import { SignUpForm } from '@/features/auth/SignUpForm';

export function SignUpPage() {
  return (
    <div
      data-testid="sign-up-page"
      style={{
        minHeight: '100vh',
        background: 'var(--color-gray-50)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-8) var(--space-4)',
        }}
      >
        <SignUpForm />
      </div>
    </div>
  );
}
