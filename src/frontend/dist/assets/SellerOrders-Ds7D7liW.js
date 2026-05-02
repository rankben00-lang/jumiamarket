import { c as createLucideIcon, u as useActor, p as useQueryClient, b as useQuery, j as jsxRuntimeExports, O as OrderStatus, B as Badge, k as cn, g as Package, d as Button, m as ue, e as createActor } from "./index-Dw05bvFi.js";
import { C as Card } from "./card-DXgHQTOU.js";
import { S as Skeleton } from "./skeleton-D-oAdvMv.js";
import { u as useMutation } from "./useMutation-CzIlz-Rh.js";
import { S as ShoppingBag } from "./shopping-bag-D8J0PwgR.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
const STATUS_NEXT = {
  [OrderStatus.pending]: OrderStatus.processing,
  [OrderStatus.processing]: OrderStatus.shipped,
  [OrderStatus.shipped]: OrderStatus.delivered
};
const STATUS_CONFIG = {
  [OrderStatus.pending]: {
    label: "Pending",
    className: "bg-accent/15 text-accent border-accent/30"
  },
  [OrderStatus.processing]: {
    label: "Processing",
    className: "bg-primary/15 text-primary border-primary/30"
  },
  [OrderStatus.shipped]: {
    label: "Shipped",
    className: "bg-secondary/40 text-foreground border-border"
  },
  [OrderStatus.delivered]: {
    label: "Delivered",
    className: "bg-accent/20 text-accent border-accent/40"
  },
  [OrderStatus.cancelled]: {
    label: "Cancelled",
    className: "bg-destructive/15 text-destructive border-destructive/30"
  }
};
const STATUS_ORDER = [
  OrderStatus.pending,
  OrderStatus.processing,
  OrderStatus.shipped,
  OrderStatus.delivered,
  OrderStatus.cancelled
];
function SellerOrders() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const { data: orders, isLoading } = useQuery({
    queryKey: ["sellerOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSellerOrders();
    },
    enabled: !!actor && !isFetching
  });
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      status
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateOrderStatus(id, status);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["sellerOrders"] });
      ue.success("Order status updated");
    },
    onError: () => ue.error("Failed to update order")
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "seller_orders.loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-6", children: "Seller Orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }, n)) })
    ] });
  }
  if (!orders || orders.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "seller_orders.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-6", children: "Seller Orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-20 gap-4",
          "data-ocid": "seller_orders.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-8 w-8 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "No orders yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Orders for your products will appear here." })
            ] })
          ]
        }
      )
    ] });
  }
  const grouped = STATUS_ORDER.reduce(
    (acc, status) => {
      const matching = orders.filter((o) => o.status === status);
      if (matching.length > 0) acc.push({ status, orders: matching });
      return acc;
    },
    []
  );
  let globalIndex = 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "seller_orders.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Seller Orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
        orders.length,
        " order",
        orders.length !== 1 ? "s" : "",
        " total"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", "data-ocid": "seller_orders.list", children: grouped.map(({ status, orders: groupOrders }) => {
      const config = STATUS_CONFIG[status];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: cn("text-xs font-semibold", config.className),
              children: config.label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            groupOrders.length,
            " order",
            groupOrders.length !== 1 ? "s" : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: groupOrders.map((order) => {
          globalIndex++;
          const idx = globalIndex;
          const nextStatus = STATUS_NEXT[order.status];
          const nextConfig = nextStatus ? STATUS_CONFIG[nextStatus] : null;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "p-5",
              "data-ocid": `seller_orders.item.${idx}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-semibold text-foreground", children: [
                      "Order #",
                      String(order.id)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: cn("text-xs", config.className),
                        children: config.label
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-3.5 w-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      order.items.length,
                      " item",
                      order.items.length !== 1 ? "s" : ""
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1", children: "·" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: order.deliveryAddress })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-primary", children: [
                    "$",
                    (Number(order.total) / 100).toFixed(2)
                  ] })
                ] }),
                nextStatus && nextConfig && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    variant: "outline",
                    className: "flex-shrink-0 flex items-center gap-1.5",
                    onClick: () => updateMutation.mutate({
                      id: order.id,
                      status: nextStatus
                    }),
                    disabled: updateMutation.isPending,
                    "data-ocid": `seller_orders.advance_button.${idx}`,
                    children: [
                      "Mark as ",
                      nextConfig.label,
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
                    ]
                  }
                )
              ] })
            },
            String(order.id)
          );
        }) })
      ] }, status);
    }) })
  ] });
}
export {
  SellerOrders as default
};
