import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: number;
  title: string;
  artist: string;
  price: number;
  coverUrl: string;
}

interface ShoppingCartProps {
  items: CartItem[];
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

export default function ShoppingCart({ items, onRemoveItem, onCheckout }: ShoppingCartProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative border-primary hover:bg-primary/10">
          <Icon name="ShoppingCart" size={20} className="text-primary" />
          {items.length > 0 && (
            <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 bg-neon-pink border-0">
              {items.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-card">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-foreground">Корзина</SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Icon name="ShoppingCart" size={64} className="text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Ваша корзина пуста</p>
              <p className="text-sm text-muted-foreground mt-2">
                Добавьте минусовки, чтобы начать покупку
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors animate-slide-up"
                  >
                    <img
                      src={item.coverUrl}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground truncate">{item.title}</h4>
                      <p className="text-sm text-muted-foreground truncate">{item.artist}</p>
                      <p className="text-lg font-bold text-neon-purple mt-1">${item.price}</p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Icon name="Trash2" size={18} />
                    </Button>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-muted-foreground">Итого:</span>
                  <span className="text-3xl font-bold text-neon-purple">${total.toFixed(2)}</span>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-neon-purple via-neon-pink to-neon-orange hover:opacity-90 text-white font-bold text-lg glow-purple"
                  onClick={onCheckout}
                >
                  <Icon name="CreditCard" size={20} className="mr-2" />
                  Оформить заказ
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-primary text-primary hover:bg-primary/10"
                  onClick={() => items.forEach((item) => onRemoveItem(item.id))}
                >
                  <Icon name="Trash2" size={20} className="mr-2" />
                  Очистить корзину
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
