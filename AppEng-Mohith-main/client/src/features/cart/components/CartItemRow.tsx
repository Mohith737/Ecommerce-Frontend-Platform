import minusIcon from '@/assets/icons/minus.svg';
import plusIcon from '@/assets/icons/plus.svg';
import trashIcon from '@/assets/icons/trash.svg';
import type { CartItem } from '@/stores/cartStore';

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export function CartItemRow({ item, onQuantityChange, onRemove }: CartItemRowProps) {
  return (
    <article
      data-testid={`cart-item-${item.id}`}
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-white)] p-3"
    >
      <div className="flex flex-wrap items-center gap-3">
        <img
          src={item.product.image_url}
          alt={item.product.name}
          className="h-20 w-20 rounded-lg object-cover"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[var(--color-text-primary)]">
            {item.product.name}
          </p>
          <p className="mt-1 text-xs text-[var(--color-text-muted)]">
            RAM: 16GB · Color: Space Grey
          </p>
          <p className="mt-1 text-sm font-bold text-[var(--color-text-primary)]">
            ${item.product.price.toFixed(2)}
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            data-testid={`quantity-decrease-${item.id}`}
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            className="rounded border border-[var(--color-border)] p-1.5"
          >
            <img src={minusIcon} alt="minus" className="h-3.5 w-3.5" />
          </button>
          <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
          <button
            type="button"
            data-testid={`quantity-increase-${item.id}`}
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            className="rounded border border-[var(--color-border)] p-1.5"
          >
            <img src={plusIcon} alt="plus" className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            data-testid={`remove-item-${item.id}`}
            onClick={() => onRemove(item.id)}
            className="rounded border border-red-200 p-1.5 hover:bg-red-50"
          >
            <img src={trashIcon} alt="trash" className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
