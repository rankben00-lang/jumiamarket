import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@/types";
import type { OrderId } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronRight, Package, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const STATUS_NEXT: Partial<Record<OrderStatus, OrderStatus>> = {
  [OrderStatus.pending]: OrderStatus.processing,
  [OrderStatus.processing]: OrderStatus.shipped,
  [OrderStatus.shipped]: OrderStatus.delivered,
};

const STATUS_CONFIG: Record<OrderStatus, { label: string; className: string }> =
  {
    [OrderStatus.pending]: {
      label: "Pending",
      className: "bg-accent/15 text-accent border-accent/30",
    },
    [OrderStatus.processing]: {
      label: "Processing",
      className: "bg-primary/15 text-primary border-primary/30",
    },
    [OrderStatus.shipped]: {
      label: "Shipped",
      className: "bg-secondary/40 text-foreground border-border",
    },
    [OrderStatus.delivered]: {
      label: "Delivered",
      className: "bg-accent/20 text-accent border-accent/40",
    },
    [OrderStatus.cancelled]: {
      label: "Cancelled",
      className: "bg-destructive/15 text-destructive border-destructive/30",
    },
  };

const STATUS_ORDER = [
  OrderStatus.pending,
  OrderStatus.processing,
  OrderStatus.shipped,
  OrderStatus.delivered,
  OrderStatus.cancelled,
];

export default function SellerOrders() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["sellerOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSellerOrders();
    },
    enabled: !!actor && !isFetching,
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      status,
    }: { id: OrderId; status: OrderStatus }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateOrderStatus(id, status);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["sellerOrders"] });
      toast.success("Order status updated");
    },
    onError: () => toast.error("Failed to update order"),
  });

  if (isLoading) {
    return (
      <div data-ocid="seller_orders.loading_state">
        <h1 className="font-display font-bold text-2xl text-foreground mb-6">
          Seller Orders
        </h1>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((n) => (
            <Skeleton key={n} className="h-28 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div data-ocid="seller_orders.page">
        <h1 className="font-display font-bold text-2xl text-foreground mb-6">
          Seller Orders
        </h1>
        <div
          className="flex flex-col items-center justify-center py-20 gap-4"
          data-ocid="seller_orders.empty_state"
        >
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="font-display font-semibold text-foreground">
              No orders yet
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Orders for your products will appear here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Group by status
  const grouped = STATUS_ORDER.reduce(
    (acc, status) => {
      const matching = orders.filter((o) => o.status === status);
      if (matching.length > 0) acc.push({ status, orders: matching });
      return acc;
    },
    [] as { status: OrderStatus; orders: typeof orders }[],
  );

  let globalIndex = 0;

  return (
    <div data-ocid="seller_orders.page">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-foreground">
          Seller Orders
        </h1>
        <span className="text-sm text-muted-foreground">
          {orders.length} order{orders.length !== 1 ? "s" : ""} total
        </span>
      </div>

      <div className="space-y-8" data-ocid="seller_orders.list">
        {grouped.map(({ status, orders: groupOrders }) => {
          const config = STATUS_CONFIG[status];
          return (
            <section key={status}>
              <div className="flex items-center gap-2 mb-3">
                <Badge
                  variant="outline"
                  className={cn("text-xs font-semibold", config.className)}
                >
                  {config.label}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {groupOrders.length} order
                  {groupOrders.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="space-y-3">
                {groupOrders.map((order) => {
                  globalIndex++;
                  const idx = globalIndex;
                  const nextStatus = STATUS_NEXT[order.status];
                  const nextConfig = nextStatus
                    ? STATUS_CONFIG[nextStatus]
                    : null;

                  return (
                    <Card
                      key={String(order.id)}
                      className="p-5"
                      data-ocid={`seller_orders.item.${idx}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-display font-semibold text-foreground">
                              Order #{String(order.id)}
                            </p>
                            <Badge
                              variant="outline"
                              className={cn("text-xs", config.className)}
                            >
                              {config.label}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                            <Package className="h-3.5 w-3.5" />
                            <span>
                              {order.items.length} item
                              {order.items.length !== 1 ? "s" : ""}
                            </span>
                            <span className="mx-1">·</span>
                            <span className="truncate">
                              {order.deliveryAddress}
                            </span>
                          </div>

                          <p className="font-display font-bold text-primary">
                            ${(Number(order.total) / 100).toFixed(2)}
                          </p>
                        </div>

                        {nextStatus && nextConfig && (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="flex-shrink-0 flex items-center gap-1.5"
                            onClick={() =>
                              updateMutation.mutate({
                                id: order.id,
                                status: nextStatus,
                              })
                            }
                            disabled={updateMutation.isPending}
                            data-ocid={`seller_orders.advance_button.${idx}`}
                          >
                            Mark as {nextConfig.label}
                            <ChevronRight className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
