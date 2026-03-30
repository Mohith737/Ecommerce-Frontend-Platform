import { Button } from '@/design-system';
import type { ShowcaseHeaderProps } from '../types';

/**
 * Presentational sticky top bar for the Showcase page
 */
export const ShowcaseHeader = ({ actualTheme, onToggleTheme }: ShowcaseHeaderProps) => (
  <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
    <div className="px-8 h-14 flex items-center justify-between">
      <h1 className="text-lg font-bold tracking-tight">
        <span className="text-primary">Design</span>{' '}
        <span className="text-text-secondary font-medium">System</span>
      </h1>

      <Button variant="ghost" size="sm" onClick={onToggleTheme}>
        {actualTheme === 'dark' ? '☀ Light' : '☾ Dark'}
      </Button>
    </div>
  </header>
);
