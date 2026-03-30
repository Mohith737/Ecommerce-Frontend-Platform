import type { SectionHeadingProps } from '../types';

/**
 * Presentational heading for each component section
 */
export const SectionHeading = ({ id, title, description }: SectionHeadingProps) => (
  <div id={id} className="scroll-mt-24 mb-10">
    <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
    <p className="text-text-secondary mt-2 text-lg leading-relaxed max-w-2xl">{description}</p>
  </div>
);
