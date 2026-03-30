import { useNavigate } from 'react-router-dom';
import { Button } from '@/design-system/ui';

/**
 * Presentational root component for the Home feature
 */
export const HomeView = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-(--color-primary-100) via-(--color-secondary-100) to-(--color-primary-200)">
      <div className="flex gap-4">
        {' '}
        <h1>Front-end</h1>
        <Button size="lg" onClick={() => navigate('/showcase')}>
          Proceed to Showcase
        </Button>
        <Button size="lg" variant="secondary" onClick={() => navigate('/demo')}>
          Proceed to Demo
        </Button>
      </div>
    </div>
  );
};
