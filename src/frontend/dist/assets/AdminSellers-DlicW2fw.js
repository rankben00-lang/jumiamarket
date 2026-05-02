import { c as createLucideIcon, u as useActor, p as useQueryClient, b as useQuery, U as UserRole, j as jsxRuntimeExports, d as Button, k as cn, B as Badge, m as ue, V as VerificationStatus, e as createActor } from "./index-Dw05bvFi.js";
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
const __iconNode$1 = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
];
const Building2 = createLucideIcon("building-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
function statusBadge(status) {
  if (status === VerificationStatus.approved)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-accent/20 text-accent border-accent/30 capitalize", children: status });
  if (status === VerificationStatus.rejected)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-destructive/20 text-destructive border-destructive/30 capitalize", children: status });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/15 text-primary border-primary/30 capitalize", children: status });
}
function SellerCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-64" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-32" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24 rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24 rounded-lg" })
    ] })
  ] });
}
function AdminSellers() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const { data: pendingSellers, isLoading: loadingPending } = useQuery({
    queryKey: ["pendingSellers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPendingSellers();
    },
    enabled: !!actor && !isFetching
  });
  const { data: allUsers, isLoading: loadingAll } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllUsers();
    },
    enabled: !!actor && !isFetching
  });
  const allSellers = (allUsers == null ? void 0 : allUsers.filter((u) => u.role === UserRole.seller)) ?? [];
  const approveMutation = useMutation({
    mutationFn: async (sellerId) => {
      if (!actor) throw new Error("Not connected");
      return actor.approveSeller(sellerId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["pendingSellers"] });
      void queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      ue.success("Seller approved successfully");
    },
    onError: () => ue.error("Failed to approve seller")
  });
  const rejectMutation = useMutation({
    mutationFn: async (sellerId) => {
      if (!actor) throw new Error("Not connected");
      return actor.rejectSeller(sellerId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["pendingSellers"] });
      void queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      ue.success("Seller rejected");
    },
    onError: () => ue.error("Failed to reject seller")
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin_sellers.page", className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Seller Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Approve or reject seller applications before they can list products." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "pending", "data-ocid": "admin_sellers.tab", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-muted/50 border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "pending",
            className: "gap-2",
            "data-ocid": "admin_sellers.pending_tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
              "Pending Approvals",
              pendingSellers && pendingSellers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5", children: pendingSellers.length })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "all",
            className: "gap-2",
            "data-ocid": "admin_sellers.all_tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
              "All Sellers"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pending", className: "mt-6", children: loadingPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(SellerCardSkeleton, {}, n)) }) : pendingSellers && pendingSellers.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "admin_sellers.pending_list", children: pendingSellers.map((seller, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-5",
          "data-ocid": `admin_sellers.item.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-5 w-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: seller.businessName }),
                  statusBadge(seller.verificationStatus)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5 line-clamp-2", children: seller.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/70 mt-1.5 font-mono", children: [
                  "ID: ",
                  seller.sellerId.toString().slice(0, 16),
                  "…"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  onClick: () => approveMutation.mutate(seller.sellerId),
                  disabled: approveMutation.isPending || rejectMutation.isPending,
                  className: "gap-1.5",
                  "data-ocid": `admin_sellers.approve_button.${i + 1}`,
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
                  onClick: () => rejectMutation.mutate(seller.sellerId),
                  disabled: approveMutation.isPending || rejectMutation.isPending,
                  "data-ocid": `admin_sellers.reject_button.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5" }),
                    " Reject"
                  ]
                }
              )
            ] })
          ] })
        },
        seller.sellerId.toString()
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-20 gap-4 bg-card border border-border rounded-xl",
          "data-ocid": "admin_sellers.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-8 w-8 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "All caught up!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "No pending seller applications to review." })
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "all", className: "mt-6", children: loadingAll ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(SellerCardSkeleton, {}, n)) }) : allSellers.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "admin_sellers.all_list", children: allSellers.map((user, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-4 flex items-center gap-4",
          "data-ocid": `admin_sellers.all_item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body font-medium text-sm text-foreground truncate", children: user.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: user.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/60 font-mono mt-0.5", children: [
                user.principal.toString().slice(0, 20),
                "…"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: cn(
                  "capitalize text-xs",
                  "bg-accent/20 text-accent border-accent/30"
                ),
                children: "seller"
              }
            )
          ]
        },
        user.principal.toString()
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-20 gap-4 bg-card border border-border rounded-xl",
          "data-ocid": "admin_sellers.all_empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-12 w-12 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "No sellers yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Sellers will appear here once they register." })
          ]
        }
      ) })
    ] })
  ] });
}
export {
  AdminSellers as default
};
