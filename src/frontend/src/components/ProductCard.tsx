import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { Link } from "@tanstack/react-router";
import { ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index?: number;
  className?: string;
}

export function ProductCard({
  product,
  index = 1,
  className,
}: ProductCardProps) {
  const { addItem } = useCart();
  const imageUrl = product.image.getDirectURL();
  const priceDisplay = (Number(product.price) / 100).toFixed(2);
  const isOutOfStock = product.quantity === 0n;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) addItem(product);
  };

  return (
    <div
      className={cn(
        "group relative bg-card rounded-lg overflow-hidden border border-border shadow-card hover:shadow-elevated transition-smooth",
        className,
      )}
      data-ocid={`product.item.${index}`}
    >
      <Link to="/products/$id" params={{ id: String(product.id) }}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <ShoppingCart className="h-10 w-10 opacity-30" />
            </div>
          )}
          <div className="absolute top-2 left-2">
            <Badge
              variant="secondary"
              className="text-xs font-body bg-card/90 backdrop-blur-sm"
            >
              {product.category}
            </Badge>
          </div>
          {isOutOfStock && (
            <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
              <span className="text-background font-display font-semibold text-sm">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="font-body font-medium text-sm text-foreground line-clamp-2 leading-snug mb-1 min-h-[2.5rem]">
            {product.title}
          </h3>
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={cn(
                  "h-3 w-3",
                  s <= 4 ? "fill-accent text-accent" : "text-muted-foreground",
                )}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">(24)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-primary text-lg">
              ${priceDisplay}
            </span>
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-2 text-xs border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              data-ocid={`product.add_button.${index}`}
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}
