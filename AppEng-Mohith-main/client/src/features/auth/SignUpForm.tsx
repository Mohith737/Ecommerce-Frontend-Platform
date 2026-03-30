import { useMemo, useState } from 'react';
import { Button, Input } from '@/design-system/ui/atoms';
import { useAuth } from '@/providers/AuthProvider';
import { navigate } from '@/utils/navigate';

const PersonIcon = () => (
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
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

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

export function SignUpForm() {
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const isFormValid = useMemo(() => {
    return (
      fullName.trim().length >= 2 &&
      isValidEmail(email) &&
      password.length >= 8 &&
      confirmPassword=see .env file
      !emailError &&
      !passwordError &&
      !confirmError
    );
  }, [fullName, email, password, confirmPassword, emailError, passwordError, confirmError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextEmailError = isValidEmail(email) ? '' : 'Please enter a valid email address.';
    const nextPasswordError = password.length >= 8 ? '' : 'Password must be at least 8 characters.';
    const nextConfirmError = confirmPassword !== password ? 'Passwords do not match' : '';

    setEmailError(nextEmailError);
    setPasswordError(nextPasswordError);
    setConfirmError(nextConfirmError);

    if (nextEmailError || nextPasswordError || nextConfirmError) {
      return;
    }

    setConfirmError('');
    setApiError('');
    setIsLoading(true);

    try {
      await signUp(fullName, email, password);
      setIsSuccess(true);
      window.setTimeout(() => navigate('/sign-in'), 3000);
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : 'An account with this email already exists.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      data-testid="sign-up-form"
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
        <div
          style={{ textAlign: 'center', padding: 'var(--space-8) 0' }}
          data-testid="sign-up-success"
        >
          <div
            style={{
              width: 84,
              height: 84,
              background: 'var(--color-success-bg)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-5)',
              fontSize: '36px',
              position: 'relative',
            }}
          >
            ✓
            <span
              style={{
                position: 'absolute',
                right: 8,
                top: 6,
                color: '#facc15',
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              ✦
            </span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-bold)',
              marginBottom: 'var(--space-2)',
            }}
          >
            Welcome to ShopHub!
          </h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Your account has been successfully created.
          </p>
          <button
            type="button"
            onClick={() => navigate('/sign-in')}
            style={{
              marginTop: 'var(--space-5)',
              borderRadius: 10,
              background: 'var(--color-primary)',
              color: '#fff',
              padding: '10px 16px',
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            Continue
          </button>
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
              Create your account to get started.
            </p>
          </div>

          {apiError ? (
            <div
              style={{
                background: 'var(--color-error-bg)',
                border: '1px solid var(--color-error)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-3) var(--space-4)',
                marginBottom: 'var(--space-4)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-error)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
              }}
            >
              ⚠ {apiError}
            </div>
          ) : null}

          <div style={{ marginBottom: 'var(--space-4)' }}>
            <Input
              data-testid="sign-up-name"
              label="Full Name"
              placeholder="John Doe"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              leftIcon={<PersonIcon />}
              disabled={isLoading}
            />
          </div>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <Input
              data-testid="sign-up-email"
              label="Email Address"
              placeholder="your.email@example.com"
              type="email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
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
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <Input
              data-testid="sign-up-password"
              label="Password"
              placeholder="At least 8 characters"
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError('');
              }}
              onBlur={() =>
                setPasswordError(
                  password && password.length < 8 ? 'Password must be at least 8 characters.' : ''
                )
              }
              error={passwordError}
              helperText="At least 8 characters"
              leftIcon={<LockIcon />}
              rightElement={
                <button type="button" onClick={() => setShowPass(v => !v)}>
                  <EyeIcon show={showPass} />
                </button>
              }
              disabled={isLoading}
            />
          </div>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <Input
              data-testid="sign-up-confirm-password"
              label="Confirm Password"
              placeholder="Re-enter your password"
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              onBlur={() =>
                setConfirmError(
                  confirmPassword && confirmPassword !== password ? 'Passwords do not match' : ''
                )
              }
              leftIcon={<LockIcon />}
              rightElement={
                <button type="button" onClick={() => setShowConfirm(v => !v)}>
                  <EyeIcon show={showConfirm} />
                </button>
              }
              error={confirmError}
              disabled={isLoading}
            />
          </div>

          <Button
            data-testid="sign-up-submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={!isFormValid}
            style={{ marginTop: 'var(--space-6)' }}
          >
            Create Account
          </Button>

          <p
            style={{
              textAlign: 'center',
              marginTop: 'var(--space-4)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Already have an account?{' '}
            <a
              href="#/sign-in"
              style={{ color: 'var(--color-primary)', fontWeight: 'var(--font-semibold)' }}
            >
              Sign In
            </a>
          </p>

          <p
            style={{
              textAlign: 'center',
              marginTop: 'var(--space-3)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-muted)',
            }}
          >
            By creating an account, you agree to our{' '}
            <a href="#" style={{ color: 'var(--color-primary)' }}>
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" style={{ color: 'var(--color-primary)' }}>
              Privacy Policy
            </a>
            .
          </p>
        </form>
      )}
    </div>
  );
}


