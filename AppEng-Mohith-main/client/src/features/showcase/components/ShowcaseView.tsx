import { useState } from 'react';
import { useTheme } from '@/providers';
import type { ComponentSection } from '../types';
import { ShowcaseHeader } from './ShowcaseHeader';
import { ShowcaseSidebar } from './ShowcaseSidebar';
import { ButtonSection } from './ButtonSection';

const componentSections: ComponentSection[] = [{ id: 'buttons', label: 'Buttons' }];

/**
 * Root component for the Showcase feature
 * Owns local UI state and assembles all showcase sub-components
 */
export const ShowcaseView = () => {
  const { actualTheme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('buttons');

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-background text-text-primary min-h-screen flex flex-col">
      <ShowcaseHeader actualTheme={actualTheme} onToggleTheme={toggleTheme} />

      <div className="flex flex-1 w-full">
        <ShowcaseSidebar
          sections={componentSections}
          activeSection={activeSection}
          onScrollTo={scrollTo}
        />

        <main className="flex-1 min-w-0 px-8 md:px-12 py-10">
          {/* Hero */}
          <div className="mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Component Library
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Build faster with
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                reusable components.
              </span>
            </h2>
            <p className="text-text-secondary text-lg mt-4 max-w-xl leading-relaxed">
              Explore, test, and copy production-ready UI primitives. Every component uses design
              tokens and adapts to light & dark themes automatically.
            </p>
          </div>

          <div className="space-y-24">
            <ButtonSection />
          </div>
        </main>
      </div>
    </div>
  );
};
