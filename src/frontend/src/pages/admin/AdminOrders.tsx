import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

const STATUS_STYLES: Record<string, string> = {
  [OrderStatus.pending]: "bg-primary/15 text-primary border-primary/30",
  [OrderStatus.processing]: "bg-secondary/30 text-foreground border-border",
  [OrderStatus.shipped]: "bg-accent/15 text-accent border-accent/30",
  [OrderStatus.delivered]: "bg-accent/20 text-accent border-accent/30",
  [OrderStatus.cancelled]:
    "bg-destructive/20 text-destructive border-destructive/30",
};

function truncatePrincipal(p: { toString: () => string }) {
  const s = p.toString();
  return s.length > 20 ? `${s.slice(0, 10)}…${s.slice(-6)}` : s;
}

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function OrderRowSkeleton() {
  return (
    <tr className="border-b border-border">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <td key={n} className="py-3 px-4">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

export default function AdminOrders() {
  const { actor, isFetching } = useActor(createActor);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Admin uses listMyOrders to get an orders overview
  // (The backend provides listMyOrders as the available order-listing endpoint)
  const { data: orders, isLoading } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyOrders();
    },
    enabled: !!actor && !isFetching,
  });

  const filteredOrders =
    orders?.filter(
      (o) => statusFilter === "all" || String(o.status) === statusFilter,
    ) ?? [];

  const statusCounts =
    orders?.reduce(
      (acc, o) => {
        const s = String(o.status);
        acc[s] = (acc[s] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    ) ?? {};

  return (
    <div data-ocid="admin_orders.page" className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-foreground">
          Orders Overview
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Showing your personal order history. Admin-wide order view coming
          soon.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {Object.values(OrderStatus).map((status) => (
          <div
            key={status}
            className="bg-card border border-border rounded-xl p-4 text-center"
          >
            <p className="text-muted-foreground text-xs capitalize mb-1">
              {status}
            </p>
            {isLoading ? (
              <Skeleton className="h-7 w-10 mx-auto" />
            ) : (
              <p className="font-display font-bold text-xl text-foreground">
                {statusCounts[status] ?? 0}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Filter + Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
          <p className="font-display font-semibold text-sm text-foreground">
            {statusFilter === "all"
              ? "All Orders"
              : `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} Orders`}
            <span className="ml-2 text-muted-foreground font-normal">
              ({filteredOrders.length})
            </span>
          </p>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger
              className="w-40 h-8 text-xs"
              data-ocid="admin_orders.status_filter"
            >
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {Object.values(OrderStatus).map((s) => (
                <SelectItem key={s} value={s} className="capitalize">
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">
                  Order ID
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">
                  Buyer
                </th>
                <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">
                  Items
                </th>
                <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">
                  Total
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [1, 2, 3, 4, 5].map((n) => <OrderRowSkeleton key={n} />)
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order, i) => (
                  <tr
                    key={String(order.id)}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                    data-ocid={`admin_orders.row.${i + 1}`}
                  >
                    <td className="py-3 px-4">
                      <span className="font-mono text-xs text-muted-foreground">
                        #{String(order.id).padStart(6, "0")}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-xs">
                        {truncatePrincipal(order.buyerId)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-body text-sm font-medium">
                        {order.items.length}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-body text-sm font-semibold text-foreground">
                        ${(Number(order.total) / 100).toFixed(2)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        className={cn(
                          "capitalize text-xs",
                          STATUS_STYLES[String(order.status)] ??
                            "bg-muted text-muted-foreground",
                        )}
                      >
                        {String(order.status)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs text-muted-foreground">
                        {formatDate(order.createdAt)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <div
                      className="flex flex-col items-center justify-center py-16 gap-4"
                      data-ocid="admin_orders.empty_state"
                    >
                      <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                      <p className="text-muted-foreground text-sm">
                        {statusFilter === "all"
                          ? "No orders yet."
                          : `No ${statusFilter} orders found.`}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
