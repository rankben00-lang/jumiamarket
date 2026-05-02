import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { ProductId } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, Clock, LayoutGrid, Package, XCircle } from "lucide-react";
import { toast } from "sonner";

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "approved"
      ? "bg-accent/20 text-accent border-accent/30"
      : status === "rejected"
        ? "bg-destructive/20 text-destructive border-destructive/30"
        : "bg-primary/15 text-primary border-primary/30";
  return <Badge className={cn("capitalize text-xs", styles)}>{status}</Badge>;
}

function ProductRowSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
      <Skeleton className="w-14 h-14 rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-40" />
      </div>
      <Skeleton className="h-6 w-16 rounded-full" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20 rounded-lg" />
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>
    </div>
  );
}

export default function AdminProducts() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const { data: pendingProducts, isLoading: loadingPending } = useQuery({
    queryKey: ["pendingProducts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPendingProducts();
    },
    enabled: !!actor && !isFetching,
  });

  const { data: allProducts, isLoading: loadingAll } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllProducts();
    },
    enabled: !!actor && !isFetching,
  });

  const approveMutation = useMutation({
    mutationFn: async (id: ProductId) => {
      if (!actor) throw new Error("Not connected");
      return actor.approveProduct(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["pendingProducts"] });
      void queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      toast.success("Product approved and now live");
    },
    onError: () => toast.error("Failed to approve product"),
  });

  const rejectMutation = useMutation({
    mutationFn: async (id: ProductId) => {
      if (!actor) throw new Error("Not connected");
      return actor.rejectProduct(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["pendingProducts"] });
      void queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      toast.success("Product rejected");
    },
    onError: () => toast.error("Failed to reject product"),
  });

  const formatDate = (ts: bigint) =>
    new Date(Number(ts) / 1_000_000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div data-ocid="admin_products.page" className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-foreground">
          Product Management
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Review and approve product submissions before they appear in the
          marketplace.
        </p>
      </div>

      <Tabs defaultValue="pending" data-ocid="admin_products.tab">
        <TabsList className="bg-muted/50 border border-border">
          <TabsTrigger
            value="pending"
            className="gap-2"
            data-ocid="admin_products.pending_tab"
          >
            <Clock className="h-3.5 w-3.5" />
            Pending Approvals
            {pendingProducts && pendingProducts.length > 0 && (
              <span className="ml-1 bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5">
                {pendingProducts.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="all"
            className="gap-2"
            data-ocid="admin_products.all_tab"
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            All Products
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          {loadingPending ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((n) => (
                <ProductRowSkeleton key={n} />
              ))}
            </div>
          ) : pendingProducts && pendingProducts.length > 0 ? (
            <div className="space-y-3" data-ocid="admin_products.pending_list">
              {pendingProducts.map((product, i) => (
                <div
                  key={String(product.id)}
                  className="bg-card border border-border rounded-xl p-4 flex items-center gap-4"
                  data-ocid={`admin_products.item.${i + 1}`}
                >
                  <div className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                    {product.image.getDirectURL() ? (
                      <img
                        src={product.image.getDirectURL()}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-medium text-sm text-foreground truncate">
                      {product.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {product.category} ·{" "}
                      <span className="font-medium text-foreground">
                        ${(Number(product.price) / 100).toFixed(2)}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-0.5 font-mono">
                      Seller: {product.sellerId.toString().slice(0, 16)}… ·{" "}
                      {formatDate(product.createdAt)}
                    </p>
                  </div>
                  <StatusBadge status={String(product.status)} />
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      size="sm"
                      className="gap-1.5"
                      onClick={() => approveMutation.mutate(product.id)}
                      disabled={
                        approveMutation.isPending || rejectMutation.isPending
                      }
                      data-ocid={`admin_products.approve_button.${i + 1}`}
                    >
                      <CheckCircle className="h-3.5 w-3.5" /> Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className={cn(
                        "gap-1.5 border-destructive/40 text-destructive",
                        "hover:bg-destructive/10 hover:border-destructive",
                      )}
                      onClick={() => rejectMutation.mutate(product.id)}
                      disabled={
                        approveMutation.isPending || rejectMutation.isPending
                      }
                      data-ocid={`admin_products.reject_button.${i + 1}`}
                    >
                      <XCircle className="h-3.5 w-3.5" /> Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center py-20 gap-4 bg-card border border-border rounded-xl"
              data-ocid="admin_products.empty_state"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
              <div className="text-center">
                <p className="font-display font-semibold text-foreground">
                  All caught up!
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  No products pending review.
                </p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="all" className="mt-6">
          {loadingAll ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <ProductRowSkeleton key={n} />
              ))}
            </div>
          ) : allProducts && allProducts.length > 0 ? (
            <div className="space-y-3" data-ocid="admin_products.all_list">
              {allProducts.map((product, i) => (
                <div
                  key={String(product.id)}
                  className="bg-card border border-border rounded-xl p-4 flex items-center gap-4"
                  data-ocid={`admin_products.all_item.${i + 1}`}
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                    {product.image.getDirectURL() ? (
                      <img
                        src={product.image.getDirectURL()}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-medium text-sm text-foreground truncate">
                      {product.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {product.category} · $
                      {(Number(product.price) / 100).toFixed(2)} ·{" "}
                      {formatDate(product.createdAt)}
                    </p>
                  </div>
                  <StatusBadge status={String(product.status)} />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center py-20 gap-4 bg-card border border-border rounded-xl"
              data-ocid="admin_products.all_empty_state"
            >
              <Package className="h-12 w-12 text-muted-foreground" />
              <p className="font-display font-semibold text-foreground">
                No products yet
              </p>
              <p className="text-muted-foreground text-sm">
                Products will appear here once sellers submit them.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
