import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import type { OrderItem } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle, Loader2, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Checkout() {
  const { actor } = useActor(createActor);
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const orderItems: OrderItem[] = items.map((i) => ({
        productId: i.product.id,
        quantity: BigInt(i.quantity),
        priceSnapshot: i.product.price,
      }));
      const deliveryAddress = `${name}, ${street}, ${city}, ${state}, ${country}`;
      return actor.placeOrder(orderItems, deliveryAddress);
    },
    onSuccess: () => {
      clearCart();
      toast.success(
        "Order placed successfully! We'll notify you when it ships.",
      );
      void navigate({ to: "/account/orders" });
    },
    onError: () => {
      toast.error("Failed to place order. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !name.trim() ||
      !street.trim() ||
      !city.trim() ||
      !state.trim() ||
      !country.trim()
    ) {
      toast.error("Please fill in all delivery fields");
      return;
    }
    mutation.mutate();
  };

  const isDisabled = mutation.isPending;

  return (
    <div data-ocid="checkout.page">
      <h1 className="font-display font-bold text-2xl text-foreground mb-6">
        Checkout
      </h1>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Delivery form — wider column */}
        <form onSubmit={handleSubmit} className="md:col-span-3 space-y-4">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-display font-semibold text-lg mb-5 text-foreground">
              Delivery Information
            </h2>
            <fieldset disabled={isDisabled} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="mt-1"
                  data-ocid="checkout.name_input"
                />
              </div>
              <div>
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="123 Main Street"
                  required
                  className="mt-1"
                  data-ocid="checkout.street_input"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Lagos"
                    required
                    className="mt-1"
                    data-ocid="checkout.city_input"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State / Province</Label>
                  <Input
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Lagos State"
                    required
                    className="mt-1"
                    data-ocid="checkout.state_input"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Nigeria"
                  required
                  className="mt-1"
                  data-ocid="checkout.country_input"
                />
              </div>
            </fieldset>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isDisabled}
            data-ocid="checkout.submit_button"
          >
            {isDisabled ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Placing order…
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" /> Place Order &mdash; $
                {(Number(total) / 100).toFixed(2)}
              </>
            )}
          </Button>
        </form>

        {/* Order summary sidebar */}
        <div
          className="md:col-span-2 bg-card border border-border rounded-xl p-6 h-fit sticky top-4"
          data-ocid="checkout.summary"
        >
          <h2 className="font-display font-semibold text-lg mb-4 text-foreground">
            Order Summary
          </h2>
          <div className="space-y-3">
            {items.map((item, i) => (
              <div
                key={String(item.product.id)}
                className="flex items-start gap-3"
                data-ocid={`checkout.item.${i + 1}`}
              >
                <div className="w-10 h-10 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  {item.product.image.getDirectURL() ? (
                    <img
                      src={item.product.image.getDirectURL()}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="h-3 w-3 text-muted-foreground/40" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">
                    {item.product.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>
                <span className="text-sm font-semibold flex-shrink-0">
                  $
                  {(
                    Number(item.product.price * BigInt(item.quantity)) / 100
                  ).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">
                ${(Number(total) / 100).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-accent font-medium">Free</span>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-display font-bold text-lg">
            <span>Total</span>
            <span className="text-primary">
              ${(Number(total) / 100).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
