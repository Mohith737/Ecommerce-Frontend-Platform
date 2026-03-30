export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'error' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ComponentSection {
  id: string;
  label: string;
}

export interface ShowcaseHeaderProps {
  actualTheme: string;
  onToggleTheme: () => void;
}

export interface ShowcaseSidebarProps {
  sections: ComponentSection[];
  activeSection: string;
  onScrollTo: (id: string) => void;
}

export interface SectionHeadingProps {
  id: string;
  title: string;
  description: string;
}
