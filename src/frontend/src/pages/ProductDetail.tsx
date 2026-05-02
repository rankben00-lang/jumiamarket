import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Store,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductDetail() {
  const { id } = useParams({ from: "/products/$id" });
  const { actor, isFetching } = useActor(createActor);
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProduct(BigInt(id));
    },
    enabled: !!actor && !isFetching,
  });

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-10">
        <Skeleton className="aspect-square rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-10 w-1/2" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 gap-4"
        data-ocid="product_detail.empty_state"
      >
        <ShoppingCart className="h-12 w-12 text-muted-foreground" />
        <p className="font-display font-semibold text-foreground">
          Product not found
        </p>
        <p className="text-muted-foreground text-sm">
          This product may have been removed or is unavailable.
        </p>
        <Button asChild variant="outline">
          <Link to="/products" search={{ q: undefined, category: undefined }}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to products
          </Link>
        </Button>
      </div>
    );
  }

  const priceDisplay = (Number(product.price) / 100).toFixed(2);
  const maxQty = Number(product.quantity);
  const isOutOfStock = maxQty === 0;

  const decreaseQty = () => setQty((prev) => Math.max(1, prev - 1));
  const increaseQty = () => setQty((prev) => Math.min(maxQty, prev + 1));

  const handleAddToCart = () => {
    addItem(product, qty);
    toast.success(`${product.title} added to cart!`, {
      description: `Qty: ${qty} · ${((Number(product.price) / 100) * qty).toFixed(2)}`,
    });
  };

  const handleBuyNow = () => {
    addItem(product, qty);
    void navigate({ to: "/cart" });
  };

  const imageUrl = product.image.getDirectURL();

  return (
    <div data-ocid="product_detail.page">
      <Link
        to="/products"
        search={{ q: undefined, category: undefined }}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
        data-ocid="product_detail.back_link"
      >
        <ArrowLeft className="h-4 w-4" /> Back to products
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="rounded-xl overflow-hidden bg-muted aspect-square">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground/30" />
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <Badge variant="secondary" className="mb-3 font-body">
            {product.category}
          </Badge>

          <h1 className="font-display font-bold text-2xl text-foreground mb-3 leading-snug">
            {product.title}
          </h1>

          {/* Stars */}
          <div className="flex items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={cn(
                  "h-4 w-4",
                  s <= 4 ? "fill-accent text-accent" : "text-muted-foreground",
                )}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2">
              (24 reviews)
            </span>
          </div>

          {/* Price */}
          <p className="font-display font-bold text-3xl text-primary mb-2">
            ${priceDisplay}
          </p>

          {/* Stock status */}
          {isOutOfStock ? (
            <Badge variant="destructive" className="mb-4">
              Out of Stock
            </Badge>
          ) : (
            <p className="text-sm text-accent font-body mb-4">
              ✓ {maxQty} in stock — ready to ship
            </p>
          )}

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Seller info */}
          <div className="flex items-center gap-2 p-3 bg-muted/40 rounded-lg mb-6">
            <Store className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Sold by{" "}
              <span className="font-medium text-foreground">
                Verified Seller
              </span>
            </p>
            <Badge
              variant="outline"
              className="ml-auto text-xs border-accent/40 text-accent"
            >
              ✓ Trusted
            </Badge>
          </div>

          {/* Quantity + Add */}
          {!isOutOfStock && (
            <div className="flex items-center gap-4 mb-5">
              <div
                className="flex items-center border border-border rounded-lg overflow-hidden"
                data-ocid="product_detail.qty_selector"
              >
                <button
                  type="button"
                  className="px-3 py-2 hover:bg-muted transition-colors disabled:opacity-40"
                  onClick={decreaseQty}
                  disabled={qty <= 1}
                  data-ocid="product_detail.qty_decrease"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 font-display font-semibold text-sm min-w-[3rem] text-center">
                  {qty}
                </span>
                <button
                  type="button"
                  className="px-3 py-2 hover:bg-muted transition-colors disabled:opacity-40"
                  onClick={increaseQty}
                  disabled={qty >= maxQty}
                  data-ocid="product_detail.qty_increase"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-xs text-muted-foreground">
                Max {maxQty} per order
              </span>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              className="flex-1"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              data-ocid="product_detail.add_to_cart_button"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>
            <Button
              variant="outline"
              disabled={isOutOfStock}
              onClick={handleBuyNow}
              data-ocid="product_detail.buy_now_button"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
