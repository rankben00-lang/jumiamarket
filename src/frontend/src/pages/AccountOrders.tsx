import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useBackend } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@/types";
import type { Order } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  PackageSearch,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_CONFIG: Record<OrderStatus, { label: string; className: string }> =
  {
    [OrderStatus.pending]: {
      label: "Pending",
      className: "bg-primary/15 text-primary border-primary/30",
    },
    [OrderStatus.processing]: {
      label: "Processing",
      className: "bg-secondary/30 text-foreground border-border",
    },
    [OrderStatus.shipped]: {
      label: "Shipped",
      className: "bg-accent/15 text-accent border-accent/30",
    },
    [OrderStatus.delivered]: {
      label: "Delivered",
      className: "bg-accent/20 text-accent border-accent/30",
    },
    [OrderStatus.cancelled]: {
      label: "Cancelled",
      className: "bg-muted text-muted-foreground border-border",
    },
  };

function formatDate(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatPrice(cents: bigint): string {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}

function OrderSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-3">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
    </div>
  );
}

function OrderCard({
  order,
  index,
  onCancel,
  isCancelling,
}: {
  order: Order;
  index: number;
  onCancel: (id: bigint) => void;
  isCancelling: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const config = STATUS_CONFIG[order.status];
  const isPending = order.status === OrderStatus.pending;

  return (
    <Card
      className="border-border bg-card shadow-sm"
      data-ocid={`orders.item.${index}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <ShoppingBag className="h-4 w-4 text-primary shrink-0" />
              <span className="font-display font-semibold text-foreground">
                Order #{String(order.id)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {formatDate(order.createdAt)}
            </p>
            <p className="text-sm text-muted-foreground truncate max-w-xs">
              Deliver to: {order.deliveryAddress}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <Badge
              className={cn(
                "text-xs font-medium capitalize border",
                config.className,
              )}
              data-ocid={`orders.status.${index}`}
            >
              {config.label}
            </Badge>
            <span className="font-display font-bold text-primary text-base">
              {formatPrice(order.total)}
            </span>
            <span className="text-xs text-muted-foreground">
              {order.items.length} item{order.items.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-3 pb-4 space-y-3">
        {/* Expand/Collapse items */}
        <button
          type="button"
          className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
          onClick={() => setExpanded((p) => !p)}
          data-ocid={`orders.expand_button.${index}`}
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4" /> Hide items
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" /> View items
            </>
          )}
        </button>

        {expanded && (
          <div
            className="divide-y divide-border rounded-lg border border-border overflow-hidden"
            data-ocid={`orders.items_list.${index}`}
          >
            {order.items.map((item, j) => (
              <div
                key={String(item.productId)}
                className="flex items-center justify-between px-4 py-3 bg-muted/30"
                data-ocid={`orders.order_item.${index}.${j + 1}`}
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    Product #{String(item.productId)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Qty: {Number(item.quantity)}
                  </p>
                </div>
                <span className="text-sm font-semibold text-foreground shrink-0 ml-4">
                  {formatPrice(item.priceSnapshot * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        )}

        {isPending && (
          <div className="flex justify-end pt-1">
            <Button
              variant="outline"
              size="sm"
              className="text-destructive border-destructive/40 hover:bg-destructive/5 hover:border-destructive transition-smooth"
              onClick={() => onCancel(order.id)}
              disabled={isCancelling}
              data-ocid={`orders.cancel_button.${index}`}
            >
              {isCancelling ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
                  Cancelling…
                </>
              ) : (
                "Cancel Order"
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function RegistrationForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const backend = useBackend();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const result = await backend.registerUser(name.trim(), email.trim());
      if (!result) throw new Error("Registration failed");
      return result;
    },
    onSuccess: () => {
      toast.success("Account created! Loading your orders…");
      onSuccess();
    },
    onError: () => {
      toast.error("Registration failed. Please try again.");
    },
  });

  return (
    <Card
      className="max-w-md mx-auto border-border"
      data-ocid="registration.card"
    >
      <CardHeader>
        <h2 className="font-display font-bold text-xl text-foreground">
          Complete your profile
        </h2>
        <p className="text-sm text-muted-foreground">
          Tell us a bit about yourself to start shopping.
        </p>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate();
          }}
          className="space-y-4"
        >
          <div className="space-y-1.5">
            <Label htmlFor="reg-name">Full name</Label>
            <Input
              id="reg-name"
              placeholder="Ada Okafor"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              data-ocid="registration.name_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="reg-email">Email address</Label>
            <Input
              id="reg-email"
              type="email"
              placeholder="ada@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-ocid="registration.email_input"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isPending || !name.trim() || !email.trim()}
            data-ocid="registration.submit_button"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving…
              </>
            ) : (
              "Save & continue"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function AccountOrders() {
  const { principal } = useAuth();
  const backend = useBackend();
  const queryClient = useQueryClient();
  const { actor, isFetching } = useActor(createActor);
  const navigate = useNavigate();
  const [justRegistered, setJustRegistered] = useState(false);

  const profileQuery = useQuery({
    queryKey: ["myProfile"],
    queryFn: async () => {
      const profile = await backend.getMyProfile();
      return profile ?? null;
    },
    enabled: backend.isReady,
  });

  const ordersQuery = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyOrders();
    },
    enabled: !!actor && !isFetching && (!!profileQuery.data || justRegistered),
  });

  const cancelMutation = useMutation({
    mutationFn: async (orderId: bigint) => {
      const result = await backend.cancelOrder(orderId);
      if (!result) throw new Error("Could not cancel order");
      return result;
    },
    onSuccess: (_data, orderId) => {
      toast.success(`Order #${String(orderId)} cancelled.`);
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
    },
    onError: () => {
      toast.error("Failed to cancel order. Please try again.");
    },
  });

  const profileLoading = profileQuery.isLoading;
  const ordersLoading = ordersQuery.isLoading;
  const orders = ordersQuery.data ?? [];
  const profile = profileQuery.data;
  const needsRegistration = !profileLoading && !profile && !justRegistered;

  const displayName =
    profile?.name ??
    (principal ? `${String(principal).slice(0, 12)}…` : "Buyer");

  return (
    <div className="max-w-2xl mx-auto px-4 py-8" data-ocid="orders.page">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-foreground">
          My Orders
        </h1>
        {!profileLoading && (
          <p className="text-muted-foreground mt-1">
            {needsRegistration
              ? "Create your profile to view your order history."
              : `Hello, ${displayName}`}
          </p>
        )}
      </div>

      {/* Registration gate */}
      {needsRegistration && (
        <RegistrationForm
          onSuccess={() => {
            setJustRegistered(true);
            queryClient.invalidateQueries({ queryKey: ["myProfile"] });
            queryClient.invalidateQueries({ queryKey: ["myOrders"] });
          }}
        />
      )}

      {/* Loading skeletons */}
      {(profileLoading || ordersLoading) && !needsRegistration && (
        <div className="space-y-4" data-ocid="orders.loading_state">
          {[1, 2, 3].map((n) => (
            <OrderSkeleton key={n} />
          ))}
        </div>
      )}

      {/* Orders list */}
      {!profileLoading &&
        !ordersLoading &&
        !needsRegistration &&
        (orders.length > 0 ? (
          <div className="space-y-4" data-ocid="orders.list">
            {orders.map((order, i) => (
              <OrderCard
                key={String(order.id)}
                order={order}
                index={i + 1}
                onCancel={(id) => cancelMutation.mutate(id)}
                isCancelling={
                  cancelMutation.isPending &&
                  cancelMutation.variables === order.id
                }
              />
            ))}
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center py-24 gap-5 text-center"
            data-ocid="orders.empty_state"
          >
            <div className="rounded-full bg-muted p-5">
              <PackageSearch className="h-10 w-10 text-muted-foreground" />
            </div>
            <div>
              <p className="font-display font-semibold text-lg text-foreground">
                No orders yet
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                Your completed orders will appear here once you start shopping.
              </p>
            </div>
            <Button
              variant="default"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() =>
                void navigate({
                  to: "/products",
                  search: { q: undefined, category: undefined },
                })
              }
              data-ocid="orders.shop_now_button"
            >
              Browse products
            </Button>
          </div>
        ))}
    </div>
  );
}
