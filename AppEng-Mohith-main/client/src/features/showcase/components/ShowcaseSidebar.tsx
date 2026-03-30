import type { ShowcaseSidebarProps } from '../types';

/**
 * Presentational sidebar navigation for the Showcase page
 */
export const ShowcaseSidebar = ({ sections, activeSection, onScrollTo }: ShowcaseSidebarProps) => (
  <aside className="hidden md:flex flex-col w-52 shrink-0 border-r border-border px-4 py-8 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
    <p className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-4 px-3">
      Components
    </p>

    <nav className="flex flex-col gap-1">
      {sections.map(s => (
        <button
          key={s.id}
          onClick={() => onScrollTo(s.id)}
          className={`text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
            activeSection === s.id
              ? 'bg-primary/10 text-primary font-semibold'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
          }`}
        >
          {s.label}
        </button>
      ))}
    </nav>

    <div className="mt-auto pt-6 border-t border-border mx-3">
      <p className="text-xs text-text-tertiary leading-relaxed">More components coming soon.</p>
    </div>
  </aside>
);
