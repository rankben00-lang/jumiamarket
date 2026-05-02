import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { UserId } from "@/types";
import { UserRole, VerificationStatus } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Building2, CheckCircle, Clock, Users, XCircle } from "lucide-react";
import { toast } from "sonner";

function statusBadge(status: VerificationStatus) {
  if (status === VerificationStatus.approved)
    return (
      <Badge className="bg-accent/20 text-accent border-accent/30 capitalize">
        {status}
      </Badge>
    );
  if (status === VerificationStatus.rejected)
    return (
      <Badge className="bg-destructive/20 text-destructive border-destructive/30 capitalize">
        {status}
      </Badge>
    );
  return (
    <Badge className="bg-primary/15 text-primary border-primary/30 capitalize">
      {status}
    </Badge>
  );
}

function SellerCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-3">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-3 w-64" />
      <Skeleton className="h-3 w-32" />
      <div className="flex gap-2 mt-4">
        <Skeleton className="h-8 w-24 rounded-lg" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );
}

export default function AdminSellers() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const { data: pendingSellers, isLoading: loadingPending } = useQuery({
    queryKey: ["pendingSellers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPendingSellers();
    },
    enabled: !!actor && !isFetching,
  });

  const { data: allUsers, isLoading: loadingAll } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllUsers();
    },
    enabled: !!actor && !isFetching,
  });

  const allSellers = allUsers?.filter((u) => u.role === UserRole.seller) ?? [];

  const approveMutation = useMutation({
    mutationFn: async (sellerId: UserId) => {
      if (!actor) throw new Error("Not connected");
      return actor.approveSeller(sellerId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["pendingSellers"] });
      void queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      toast.success("Seller approved successfully");
    },
    onError: () => toast.error("Failed to approve seller"),
  });

  const rejectMutation = useMutation({
    mutationFn: async (sellerId: UserId) => {
      if (!actor) throw new Error("Not connected");
      return actor.rejectSeller(sellerId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["pendingSellers"] });
      void queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      toast.success("Seller rejected");
    },
    onError: () => toast.error("Failed to reject seller"),
  });

  return (
    <div data-ocid="admin_sellers.page" className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-foreground">
          Seller Management
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Approve or reject seller applications before they can list products.
        </p>
      </div>

      <Tabs defaultValue="pending" data-ocid="admin_sellers.tab">
        <TabsList className="bg-muted/50 border border-border">
          <TabsTrigger
            value="pending"
            className="gap-2"
            data-ocid="admin_sellers.pending_tab"
          >
            <Clock className="h-3.5 w-3.5" />
            Pending Approvals
            {pendingSellers && pendingSellers.length > 0 && (
              <span className="ml-1 bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5">
                {pendingSellers.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="all"
            className="gap-2"
            data-ocid="admin_sellers.all_tab"
          >
            <Users className="h-3.5 w-3.5" />
            All Sellers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          {loadingPending ? (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <SellerCardSkeleton key={n} />
              ))}
            </div>
          ) : pendingSellers && pendingSellers.length > 0 ? (
            <div className="space-y-4" data-ocid="admin_sellers.pending_list">
              {pendingSellers.map((seller, i) => (
                <div
                  key={seller.sellerId.toString()}
                  className="bg-card border border-border rounded-xl p-5"
                  data-ocid={`admin_sellers.item.${i + 1}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-display font-semibold text-foreground">
                            {seller.businessName}
                          </p>
                          {statusBadge(seller.verificationStatus)}
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                          {seller.description}
                        </p>
                        <p className="text-xs text-muted-foreground/70 mt-1.5 font-mono">
                          ID: {seller.sellerId.toString().slice(0, 16)}…
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        size="sm"
                        onClick={() => approveMutation.mutate(seller.sellerId)}
                        disabled={
                          approveMutation.isPending || rejectMutation.isPending
                        }
                        className="gap-1.5"
                        data-ocid={`admin_sellers.approve_button.${i + 1}`}
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
                        onClick={() => rejectMutation.mutate(seller.sellerId)}
                        disabled={
                          approveMutation.isPending || rejectMutation.isPending
                        }
                        data-ocid={`admin_sellers.reject_button.${i + 1}`}
                      >
                        <XCircle className="h-3.5 w-3.5" /> Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center py-20 gap-4 bg-card border border-border rounded-xl"
              data-ocid="admin_sellers.empty_state"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
              <div className="text-center">
                <p className="font-display font-semibold text-foreground">
                  All caught up!
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  No pending seller applications to review.
                </p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="all" className="mt-6">
          {loadingAll ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((n) => (
                <SellerCardSkeleton key={n} />
              ))}
            </div>
          ) : allSellers.length > 0 ? (
            <div className="space-y-3" data-ocid="admin_sellers.all_list">
              {allSellers.map((user, i) => (
                <div
                  key={user.principal.toString()}
                  className="bg-card border border-border rounded-xl p-4 flex items-center gap-4"
                  data-ocid={`admin_sellers.all_item.${i + 1}`}
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-medium text-sm text-foreground truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                    <p className="text-xs text-muted-foreground/60 font-mono mt-0.5">
                      {user.principal.toString().slice(0, 20)}…
                    </p>
                  </div>
                  <Badge
                    className={cn(
                      "capitalize text-xs",
                      "bg-accent/20 text-accent border-accent/30",
                    )}
                  >
                    seller
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center py-20 gap-4 bg-card border border-border rounded-xl"
              data-ocid="admin_sellers.all_empty_state"
            >
              <Users className="h-12 w-12 text-muted-foreground" />
              <p className="font-display font-semibold text-foreground">
                No sellers yet
              </p>
              <p className="text-muted-foreground text-sm">
                Sellers will appear here once they register.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
