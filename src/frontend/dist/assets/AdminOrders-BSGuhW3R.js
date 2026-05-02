import { u as useActor, r as reactExports, b as useQuery, j as jsxRuntimeExports, O as OrderStatus, B as Badge, k as cn, e as createActor } from "./index-Dw05bvFi.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DhZwefsZ.js";
import { S as Skeleton } from "./skeleton-D-oAdvMv.js";
import { S as ShoppingBag } from "./shopping-bag-D8J0PwgR.js";
import "./chevron-up-C-h44nIZ.js";
const STATUS_STYLES = {
  [OrderStatus.pending]: "bg-primary/15 text-primary border-primary/30",
  [OrderStatus.processing]: "bg-secondary/30 text-foreground border-border",
  [OrderStatus.shipped]: "bg-accent/15 text-accent border-accent/30",
  [OrderStatus.delivered]: "bg-accent/20 text-accent border-accent/30",
  [OrderStatus.cancelled]: "bg-destructive/20 text-destructive border-destructive/30"
};
function truncatePrincipal(p) {
  const s = p.toString();
  return s.length > 20 ? `${s.slice(0, 10)}…${s.slice(-6)}` : s;
}
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function OrderRowSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: [1, 2, 3, 4, 5, 6].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }) }, n)) });
}
function AdminOrders() {
  const { actor, isFetching } = useActor(createActor);
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const { data: orders, isLoading } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyOrders();
    },
    enabled: !!actor && !isFetching
  });
  const filteredOrders = (orders == null ? void 0 : orders.filter(
    (o) => statusFilter === "all" || String(o.status) === statusFilter
  )) ?? [];
  const statusCounts = (orders == null ? void 0 : orders.reduce(
    (acc, o) => {
      const s = String(o.status);
      acc[s] = (acc[s] ?? 0) + 1;
      return acc;
    },
    {}
  )) ?? {};
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin_orders.page", className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Orders Overview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Showing your personal order history. Admin-wide order view coming soon." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-3", children: Object.values(OrderStatus).map((status) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-4 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs capitalize mb-1", children: status }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-10 mx-auto" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-foreground", children: statusCounts[status] ?? 0 })
        ]
      },
      status
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-semibold text-sm text-foreground", children: [
          statusFilter === "all" ? "All Orders" : `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} Orders`,
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-muted-foreground font-normal", children: [
            "(",
            filteredOrders.length,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              className: "w-40 h-8 text-xs",
              "data-ocid": "admin_orders.status_filter",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filter by status" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Statuses" }),
            Object.values(OrderStatus).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, className: "capitalize", children: s.charAt(0).toUpperCase() + s.slice(1) }, s))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-medium text-muted-foreground py-3 px-4", children: "Order ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-medium text-muted-foreground py-3 px-4", children: "Buyer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right text-xs font-medium text-muted-foreground py-3 px-4", children: "Items" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right text-xs font-medium text-muted-foreground py-3 px-4", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-medium text-muted-foreground py-3 px-4", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-medium text-muted-foreground py-3 px-4", children: "Date" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderRowSkeleton, {}, n)) : filteredOrders.length > 0 ? filteredOrders.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
            "data-ocid": `admin_orders.row.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
                "#",
                String(order.id).padStart(6, "0")
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: truncatePrincipal(order.buyerId) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm font-medium", children: order.items.length }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-body text-sm font-semibold text-foreground", children: [
                "$",
                (Number(order.total) / 100).toFixed(2)
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: cn(
                    "capitalize text-xs",
                    STATUS_STYLES[String(order.status)] ?? "bg-muted text-muted-foreground"
                  ),
                  children: String(order.status)
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDate(order.createdAt) }) })
            ]
          },
          String(order.id)
        )) : /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-16 gap-4",
            "data-ocid": "admin_orders.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-10 w-10 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: statusFilter === "all" ? "No orders yet." : `No ${statusFilter} orders found.` })
            ]
          }
        ) }) }) })
      ] }) })
    ] })
  ] });
}
export {
  AdminOrders as default
};
