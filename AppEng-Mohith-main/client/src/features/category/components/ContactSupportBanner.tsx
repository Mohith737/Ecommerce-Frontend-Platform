import contactSupportIcon from '@/assets/icons/contact-support.svg';
import { Button } from '@/design-system/ui/atoms';

export function ContactSupportBanner() {
  return (
    <section
      data-testid="contact-support-banner"
      className="flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-gray-100)] p-4 lg:flex-row lg:items-center lg:justify-between"
    >
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
          Can&apos;t find what you&apos;re looking for?
        </h3>
        <p className="text-sm text-[var(--color-text-muted)]">
          Our team can help you find what you need.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="inline-flex items-center gap-2"
        >
          <img src={contactSupportIcon} alt="support" className="h-4 w-4" />
          Contact Support
        </Button>
        <Button type="button" variant="primary" size="sm">
          Browse All Products
        </Button>
      </div>
    </section>
  );
}
