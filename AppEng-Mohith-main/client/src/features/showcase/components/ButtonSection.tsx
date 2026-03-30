import { Button } from '@/design-system';
import type { ButtonVariant, ButtonSize } from '../types';
import { SectionHeading } from './SectionHeading';

const buttonVariants: { variant: ButtonVariant; label: string; description: string }[] = [
  {
    variant: 'primary',
    label: 'Primary',
    description: 'Main call-to-action. Drives the user forward.',
  },
  { variant: 'secondary', label: 'Secondary', description: 'Complements the primary action.' },
  { variant: 'success', label: 'Success', description: 'Confirms, saves, or submits.' },
  { variant: 'error', label: 'Error', description: 'Destructive or irreversible operations.' },
  { variant: 'ghost', label: 'Ghost', description: 'Low-emphasis or tertiary actions.' },
];

const buttonSizes: { size: ButtonSize; label: string }[] = [
  { size: 'sm', label: 'Small' },
  { size: 'md', label: 'Medium' },
  { size: 'lg', label: 'Large' },
];

/**
 * Presentational section showcasing all Button variants and sizes
 */
export const ButtonSection = () => (
  <section>
    <SectionHeading
      id="buttons"
      title="Buttons"
      description="Interactive elements for triggering actions. Available in five semantic variants and three sizes."
    />

    {/* Variant + Size matrix */}
    <div className="bg-surface border border-border rounded-xl overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider py-4 px-6 w-44">
              Variant
            </th>
            {buttonSizes.map(s => (
              <th
                key={s.size}
                className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider py-4 px-6"
              >
                {s.label}
              </th>
            ))}
            <th className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider py-4 px-6">
              Disabled
            </th>
          </tr>
        </thead>
        <tbody>
          {buttonVariants.map((v, i) => (
            <tr
              key={v.variant}
              className={i < buttonVariants.length - 1 ? 'border-b border-border/40' : ''}
            >
              <td className="py-5 px-6 align-middle">
                <p className="font-semibold text-sm">{v.label}</p>
                <p className="text-text-tertiary text-xs mt-0.5 leading-snug">{v.description}</p>
              </td>
              {buttonSizes.map(s => (
                <td key={s.size} className="py-5 px-6 align-middle">
                  <Button variant={v.variant} size={s.size}>
                    {v.label}
                  </Button>
                </td>
              ))}
              <td className="py-5 px-6 align-middle">
                <Button variant={v.variant} size="md" disabled>
                  {v.label}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Real-world examples */}
    <h3 className="text-xl font-semibold mt-14 mb-6">Usage examples</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="bg-surface border border-border rounded-xl p-6">
        <p className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-5">
          Action bar
        </p>
        <div className="flex items-center gap-3">
          <Button variant="primary" size="md">
            Save changes
          </Button>
          <Button variant="ghost" size="md">
            Cancel
          </Button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <p className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-5">
          Destructive confirmation
        </p>
        <div className="flex items-center gap-3">
          <Button variant="error" size="md">
            Delete account
          </Button>
          <Button variant="ghost" size="md">
            Keep account
          </Button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <p className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-5">
          Full width
        </p>
        <Button variant="primary" size="lg" className="w-full">
          Continue to checkout
        </Button>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <p className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-5">
          Button group
        </p>
        <div className="flex items-center gap-3">
          <Button variant="success" size="sm">
            Approve
          </Button>
          <Button variant="error" size="sm">
            Reject
          </Button>
          <Button variant="secondary" size="sm">
            Review
          </Button>
        </div>
      </div>
    </div>
  </section>
);
