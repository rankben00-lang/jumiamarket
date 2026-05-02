import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { VerificationStatus } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Package,
  ShoppingBag,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function SellerDashboard() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["mySellerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMySellerProfile();
    },
    enabled: !!actor && !isFetching,
  });

  const { data: revenue, isLoading: revLoading } = useQuery({
    queryKey: ["sellerRevenue"],
    queryFn: async () => {
      if (!actor) return 0n;
      return actor.getSellerRevenue();
    },
    enabled: !!actor && !isFetching && !!profile,
  });

  const { data: products, isLoading: prodLoading } = useQuery({
    queryKey: ["myProducts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyProducts();
    },
    enabled: !!actor && !isFetching && !!profile,
  });

  const { data: orders, isLoading: ordLoading } = useQuery({
    queryKey: ["sellerOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSellerOrders();
    },
    enabled: !!actor && !isFetching && !!profile,
  });

  const registerMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.registerAsSeller(businessName.trim(), description.trim());
    },
    onSuccess: () => {
      toast.success("Seller application submitted! Awaiting admin approval.");
      void queryClient.invalidateQueries({ queryKey: ["mySellerProfile"] });
    },
    onError: () => toast.error("Failed to submit application"),
  });

  if (profileLoading) {
    return (
      <div className="space-y-4" data-ocid="seller_dashboard.loading_state">
        {[1, 2, 3].map((n) => (
          <Skeleton key={n} className="h-20 rounded-xl" />
        ))}
      </div>
    );
  }

  // Not registered as a seller yet
  if (!profile) {
    return (
      <div
        className="max-w-lg mx-auto py-12"
        data-ocid="seller_dashboard.register_panel"
      >
        <div className="flex flex-col items-center text-center mb-8 gap-3">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <UserPlus className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Become a Seller
          </h1>
          <p className="text-muted-foreground">
            Register your business and start selling on our marketplace.
            Applications are reviewed by our team.
          </p>
        </div>
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              placeholder="e.g. Tech Gadgets Store"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              data-ocid="seller_dashboard.business_name_input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your business and what you sell..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              data-ocid="seller_dashboard.description_textarea"
            />
          </div>
          <Button
            className="w-full"
            disabled={
              !businessName.trim() ||
              !description.trim() ||
              registerMutation.isPending
            }
            onClick={() => registerMutation.mutate()}
            data-ocid="seller_dashboard.register_submit_button"
          >
            {registerMutation.isPending
              ? "Submitting..."
              : "Submit Application"}
          </Button>
        </Card>
      </div>
    );
  }

  // Pending approval
  if (profile.verificationStatus === VerificationStatus.pending) {
    return (
      <div
        className="max-w-lg mx-auto py-12"
        data-ocid="seller_dashboard.pending_panel"
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
            <Clock className="h-8 w-8 text-accent" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Application Under Review
            </h1>
            <p className="text-muted-foreground mt-2">
              Your seller application for{" "}
              <span className="font-semibold text-foreground">
                {profile.businessName}
              </span>{" "}
              is being reviewed. You'll have access to your dashboard once
              approved.
            </p>
          </div>
          <div className="w-full bg-accent/10 border border-accent/30 rounded-xl p-4 flex items-start gap-3 text-left">
            <AlertTriangle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              Our team typically reviews applications within 24-48 hours. Check
              back soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Rejected
  if (profile.verificationStatus === VerificationStatus.rejected) {
    return (
      <div
        className="max-w-lg mx-auto py-12"
        data-ocid="seller_dashboard.rejected_panel"
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Application Not Approved
            </h1>
            <p className="text-muted-foreground mt-2">
              Unfortunately your application for{" "}
              <span className="font-semibold text-foreground">
                {profile.businessName}
              </span>{" "}
              was not approved. Please contact support for more information.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const pendingOrders =
    orders?.filter((o) => o.status === "pending").length ?? 0;

  const stats = [
    {
      label: "Total Revenue",
      value: revLoading ? null : `$${(Number(revenue ?? 0n) / 100).toFixed(2)}`,
      icon: DollarSign,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      label: "Products Listed",
      value: prodLoading ? null : String(products?.length ?? 0),
      icon: Package,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Total Orders",
      value: ordLoading ? null : String(orders?.length ?? 0),
      icon: ShoppingBag,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Pending Orders",
      value: ordLoading ? null : String(pendingOrders),
      icon: TrendingUp,
      color: "text-accent",
      bg: "bg-accent/10",
    },
  ];

  return (
    <div data-ocid="seller_dashboard.page">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-bold text-2xl text-foreground">
              Seller Dashboard
            </h1>
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-accent/15 text-accent px-2 py-0.5 rounded-full">
              <CheckCircle className="h-3 w-3" /> Approved
            </span>
          </div>
          <p className="text-muted-foreground text-sm mt-1">
            {profile.businessName}
          </p>
        </div>
        <Button asChild data-ocid="seller_dashboard.add_product_button">
          <Link to="/seller/products">
            <Package className="mr-2 h-4 w-4" /> Manage Products
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <Card
            key={label}
            className="p-5"
            data-ocid={`seller_dashboard.stat.${label.toLowerCase().replace(/ /g, "_")}`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${bg}`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <div className="min-w-0">
                {value === null ? (
                  <Skeleton className="h-6 w-16 mb-1" />
                ) : (
                  <p className="font-display font-bold text-xl text-foreground truncate">
                    {value}
                  </p>
                )}
                <p className="text-xs text-muted-foreground truncate">
                  {label}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-5">
        <h3 className="font-display font-semibold mb-4 text-foreground">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <Button
            asChild
            variant="outline"
            data-ocid="seller_dashboard.manage_products_button"
          >
            <Link to="/seller/products">
              <Package className="mr-2 h-4 w-4" />
              My Products
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            data-ocid="seller_dashboard.view_orders_button"
          >
            <Link to="/seller/orders">
              <ShoppingBag className="mr-2 h-4 w-4" />
              My Orders
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
