import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function Cart() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      login();
      return;
    }
    void navigate({ to: "/checkout" });
  };

  if (itemCount === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 gap-4"
        data-ocid="cart.empty_state"
      >
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        <h2 className="font-display font-bold text-xl text-foreground">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground text-sm">
          Start shopping to add items here.
        </p>
        <Button asChild data-ocid="cart.browse_button">
          <Link to="/products" search={{ q: undefined, category: undefined }}>
            Browse Products
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div data-ocid="cart.page">
      <h1 className="font-display font-bold text-2xl text-foreground mb-6">
        Shopping Cart ({itemCount} {itemCount === 1 ? "item" : "items"})
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <AnimatePresence initial={false}>
            {items.map((item, i) => (
              <motion.div
                key={String(item.product.id)}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-card border border-border rounded-xl p-4 flex gap-4"
                data-ocid={`cart.item.${i + 1}`}
              >
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                  {item.product.image.getDirectURL() ? (
                    <img
                      src={item.product.image.getDirectURL()}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-muted-foreground/40" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-body font-medium text-sm text-foreground truncate">
                    {item.product.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.product.category}
                  </p>
                  <p className="font-display font-bold text-primary mt-1 text-sm">
                    ${(Number(item.product.price) / 100).toFixed(2)}
                    <span className="text-muted-foreground font-normal ml-1">
                      each
                    </span>
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-border rounded-lg overflow-hidden">
                        <button
                          type="button"
                          className="px-2 py-1 hover:bg-muted transition-colors"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          data-ocid={`cart.decrease.${i + 1}`}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 py-1 text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="px-2 py-1 hover:bg-muted transition-colors"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          data-ocid={`cart.increase.${i + 1}`}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="text-destructive hover:text-destructive/80 transition-colors"
                        onClick={() => removeItem(item.product.id)}
                        aria-label="Remove item"
                        data-ocid={`cart.remove_button.${i + 1}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="font-display font-bold text-sm text-foreground">
                      $
                      {(
                        Number(item.product.price * BigInt(item.quantity)) / 100
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div
          className="bg-card border border-border rounded-xl p-6 h-fit sticky top-4"
          data-ocid="cart.summary"
        >
          <h2 className="font-display font-bold text-lg text-foreground mb-4">
            Order Summary
          </h2>
          <div className="space-y-2 text-sm max-h-48 overflow-y-auto">
            {items.map((item) => (
              <div
                key={String(item.product.id)}
                className="flex justify-between"
              >
                <span className="text-muted-foreground truncate mr-2">
                  {item.product.title} ×{item.quantity}
                </span>
                <span className="font-medium flex-shrink-0">
                  $
                  {(
                    Number(item.product.price * BigInt(item.quantity)) / 100
                  ).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">
                ${(Number(total) / 100).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-accent font-semibold">Free</span>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-display font-bold text-lg mb-6">
            <span>Total</span>
            <span className="text-primary">
              ${(Number(total) / 100).toFixed(2)}
            </span>
          </div>
          <Button
            className="w-full"
            onClick={handleCheckout}
            data-ocid="cart.checkout_button"
          >
            {isAuthenticated ? (
              <>
                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Sign In to Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          {!isAuthenticated && (
            <p className="text-xs text-muted-foreground text-center mt-2">
              You&apos;ll be redirected to sign in
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
