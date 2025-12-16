// components/CartButton.tsx
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';


export function CartButton() {
  const { getItemCount, toggleCart } = useCart();
  const itemCount = getItemCount();

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative"
      onClick={toggleCart}
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <Badge 
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
          variant="destructive"
        >
          {itemCount}
        </Badge>
      )}
    </Button>
  );
}