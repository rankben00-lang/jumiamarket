import { c as createLucideIcon, u as useActor, p as useQueryClient, b as useQuery, j as jsxRuntimeExports, g as Package, d as Button, k as cn, m as ue, B as Badge, e as createActor } from "./index-Dw05bvFi.js";
import { S as Skeleton } from "./skeleton-D-oAdvMv.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent, C as CircleX } from "./tabs-BLPFi_rb.js";
import { u as useMutation } from "./useMutation-CzIlz-Rh.js";
import { C as Clock } from "./clock-CnHGp3SV.js";
import { C as CircleCheckBig } from "./circle-check-big-CJbghuv-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
];
const LayoutGrid = createLucideIcon("layout-grid", __iconNode);
function StatusBadge({ status }) {
  const styles = status === "approved" ? "bg-accent/20 text-accent border-accent/30" : status === "rejected" ? "bg-destructive/20 text-destructive border-destructive/30" : "bg-primary/15 text-primary border-primary/30";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: cn("capitalize text-xs", styles), children: status });
}
function ProductRowSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4 bg-card border border-border rounded-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-14 h-14 rounded-lg flex-shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-40" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-16 rounded-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-20 rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-20 rounded-lg" })
    ] })
  ] });
}
function AdminProducts() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const { data: pendingProducts, isLoading: loadingPending } = useQuery({
    queryKey: ["pendingProducts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPendingProducts();
    },
    enabled: !!actor && !isFetching
  });
  const { data: allProducts, isLoading: loadingAll } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllProducts();
    },
    enabled: !!actor && !isFetching
  });
  const approveMutation = useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.approveProduct(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["pendingProducts"] });
      void queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      ue.success("Product approved and now live");
    },
    onError: () => ue.error("Failed to approve product")
  });
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.rejectProduct(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["pendingProducts"] });
      void queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      ue.success("Product rejected");
    },
    onError: () => ue.error("Failed to reject product")
  });
  const formatDate = (ts) => new Date(Number(ts) / 1e6).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin_products.page", className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Product Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Review and approve product submissions before they appear in the marketplace." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "pending", "data-ocid": "admin_products.tab", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-muted/50 border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "pending",
            className: "gap-2",
            "data-ocid": "admin_products.pending_tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
              "Pending Approvals",
              pendingProducts && pendingProducts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5", children: pendingProducts.length })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "all",
            className: "gap-2",
            "data-ocid": "admin_products.all_tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "h-3.5 w-3.5" }),
              "All Products"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pending", className: "mt-6", children: loadingPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductRowSkeleton, {}, n)) }) : pendingProducts && pendingProducts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "admin_products.pending_list", children: pendingProducts.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-4 flex items-center gap-4",
          "data-ocid": `admin_products.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-muted flex items-center justify-center", children: product.image.getDirectURL() ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: product.image.getDirectURL(),
                alt: product.title,
                className: "w-full h-full object-cover"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-5 w-5 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body font-medium text-sm text-foreground truncate", children: product.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                product.category,
                " ·",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                  "$",
                  (Number(product.price) / 100).toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/70 mt-0.5 font-mono", children: [
                "Seller: ",
                product.sellerId.toString().slice(0, 16),
                "… ·",
                " ",
                formatDate(product.createdAt)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: String(product.status) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "gap-1.5",
                  onClick: () => approveMutation.mutate(product.id),
                  disabled: approveMutation.isPending || rejectMutation.isPending,
                  "data-ocid": `admin_products.approve_button.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3.5 w-3.5" }),
                    " Approve"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: cn(
                    "gap-1.5 border-destructive/40 text-destructive",
                    "hover:bg-destructive/10 hover:border-destructive"
                  ),
                  onClick: () => rejectMutation.mutate(product.id),
                  disabled: approveMutation.isPending || rejectMutation.isPending,
                  "data-ocid": `admin_products.reject_button.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5" }),
                    " Reject"
                  ]
                }
              )
            ] })
          ]
        },
        String(product.id)
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-20 gap-4 bg-card border border-border rounded-xl",
          "data-ocid": "admin_products.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-8 w-8 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "All caught up!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "No products pending review." })
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "all", className: "mt-6", children: loadingAll ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductRowSkeleton, {}, n)) }) : allProducts && allProducts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "admin_products.all_list", children: allProducts.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-4 flex items-center gap-4",
          "data-ocid": `admin_products.all_item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-muted flex items-center justify-center", children: product.image.getDirectURL() ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: product.image.getDirectURL(),
                alt: product.title,
                className: "w-full h-full object-cover"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body font-medium text-sm text-foreground truncate", children: product.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                product.category,
                " · $",
                (Number(product.price) / 100).toFixed(2),
                " ·",
                " ",
                formatDate(product.createdAt)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: String(product.status) })
          ]
        },
        String(product.id)
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-20 gap-4 bg-card border border-border rounded-xl",
          "data-ocid": "admin_products.all_empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-12 w-12 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "No products yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Products will appear here once sellers submit them." })
          ]
        }
      ) })
    ] })
  ] });
}
export {
  AdminProducts as default
};
