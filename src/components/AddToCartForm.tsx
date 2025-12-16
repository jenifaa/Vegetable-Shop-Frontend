// components/AddToCartForm.tsx
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useCart } from '@/context/CartContext';


interface AddToCartFormProps {
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
  };
  trigger?: React.ReactNode;
}

export function AddToCartForm({ product, trigger }: AddToCartFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const { addItem } = useCart();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    });
    
    setOpen(false);
    setQuantity(1);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Cart</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">
              Subtotal: ${(product.price * quantity).toFixed(2)}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add to Cart
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}