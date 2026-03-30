import { useMemo, useState } from 'react';
import { Button, Input } from '@/design-system/ui/atoms';
import { Modal } from '@/design-system/ui/molecules';
import { useAuth } from '@/providers/AuthProvider';
import { navigate } from '@/utils/navigate';

const EmailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = ({ show }: { show: boolean }) =>
  show ? (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function SignInForm() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isFormValid = useMemo(() => email.length > 0 && password.length > 0, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setEmailError('');
    setIsLoading(true);
    try {
      await signIn(email, password);
      setIsSuccess(true);
      window.setTimeout(() => navigate('/home'), 3000);
    } catch {
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      data-testid="sign-in-form"
      style={{
        width: '100%',
        maxWidth: '480px',
        background: 'var(--color-white)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-xl)',
        padding: 'var(--space-10) var(--space-8)',
        border: '1px solid var(--color-border)',
      }}
    >
      {isSuccess ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-8) 0' }}>
          <div
            style={{
              width: 72,
              height: 72,
              background: 'var(--color-success-bg)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-5)',
              fontSize: '32px',
            }}
          >
            ✓
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-bold)',
              marginBottom: 'var(--space-2)',
            }}
          >
            Welcome Back!
          </h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            You've successfully signed in to ShopHub.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--color-primary)',
                letterSpacing: '-0.02em',
                marginBottom: 'var(--space-2)',
              }}
            >
              ShopHub
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
              Welcome back! Please sign in to continue.
            </p>
          </div>

          <div style={{ marginBottom: 'var(--space-4)' }}>
            <Input
              data-testid="sign-in-email"
              label="Email Address"
              placeholder="your.email@example.com"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={() =>
                setEmailError(
                  email && !isValidEmail(email) ? 'Please enter a valid email address.' : ''
                )
              }
              error={emailError}
              leftIcon={<EmailIcon />}
              disabled={isLoading}
            />
          </div>

          <div style={{ marginBottom: 'var(--space-2)' }}>
            <Input
              data-testid="sign-in-password"
              label="Password"
              placeholder="Enter your password"
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              leftIcon={<LockIcon />}
              rightElement={
                <button type="button" onClick={() => setShowPass(v => !v)}>
                  <EyeIcon show={showPass} />
                </button>
              }
              disabled={isLoading}
            />
          </div>

          <div style={{ textAlign: 'right' }}>
            <a href="#" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary)' }}>
              Forgot Password?
            </a>
          </div>

          <Button
            data-testid="sign-in-submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={!isFormValid}
            style={{ marginTop: 'var(--space-5)' }}
          >
            Sign In
          </Button>

          <p
            style={{
              textAlign: 'center',
              marginTop: 'var(--space-4)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Don't have an account?{' '}
            <a
              href="#/sign-up"
              style={{ color: 'var(--color-primary)', fontWeight: 'var(--font-semibold)' }}
            >
              Sign Up
            </a>
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              marginTop: 'var(--space-4)',
            }}
          >
            <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
          </div>

          <div
            style={{
              marginTop: 'var(--space-4)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            }}
          >
            <button
              type="button"
              style={{
                width: '100%',
                height: '44px',
                border: '1.5px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-2)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-medium)',
                cursor: 'pointer',
                color: 'var(--color-text-primary)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            <button
              type="button"
              style={{
                width: '100%',
                height: '44px',
                border: '1.5px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-2)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-medium)',
                cursor: 'pointer',
                color: 'var(--color-text-primary)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Continue with GitHub
            </button>
          </div>

          <p
            style={{
              textAlign: 'center',
              marginTop: 'var(--space-4)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-muted)',
            }}
          >
            <a href="#" style={{ color: 'var(--color-text-muted)' }}>
              Terms, Privacy & Cookies
            </a>
          </p>
        </form>
      )}

      <Modal
        data-testid="sign-in-error-modal"
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        size="sm"
      >
        <div style={{ textAlign: 'center', padding: 'var(--space-4) 0' }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: 'var(--color-error-bg)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-4)',
              color: 'var(--color-error)',
              fontSize: '24px',
            }}
          >
            ✕
          </div>
          <h3
            style={{
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-bold)',
              marginBottom: 'var(--space-2)',
            }}
          >
            Sign In Failed
          </h3>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--text-sm)',
              marginBottom: 'var(--space-6)',
            }}
          >
            The email or password you entered is incorrect. Please try again.
          </p>
          <Button variant="primary" fullWidth onClick={() => setShowErrorModal(false)}>
            Try Again
          </Button>
          <a
            href="#"
            style={{
              display: 'block',
              marginTop: 'var(--space-3)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-muted)',
            }}
          >
            Forgot your password?
          </a>
        </div>
      </Modal>
    </div>
  );
}
