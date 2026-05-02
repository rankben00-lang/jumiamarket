import { c as createLucideIcon, u as useActor, e as createActor, n as useAuth, p as useQueryClient, a as useNavigate, r as reactExports, b as useQuery, j as jsxRuntimeExports, d as Button, m as ue, I as Input, o as LoaderCircle, O as OrderStatus, B as Badge, k as cn, C as ChevronDown } from "./index-Dw05bvFi.js";
import { C as Card, a as CardHeader, b as CardContent } from "./card-DXgHQTOU.js";
import { L as Label } from "./label-BqLxb9Ur.js";
import { S as Separator } from "./separator-BDZfIAub.js";
import { S as Skeleton } from "./skeleton-D-oAdvMv.js";
import { u as useMutation } from "./useMutation-CzIlz-Rh.js";
import { S as ShoppingBag } from "./shopping-bag-D8J0PwgR.js";
import { C as ChevronUp } from "./chevron-up-C-h44nIZ.js";
import "./index-CyJsTEJN.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }],
  ["circle", { cx: "18.5", cy: "15.5", r: "2.5", key: "b5zd12" }],
  ["path", { d: "M20.27 17.27 22 19", key: "1l4muz" }]
];
const PackageSearch = createLucideIcon("package-search", __iconNode);
function useBackend() {
  const { actor, isFetching } = useActor(createActor);
  return {
    actor,
    isReady: !!actor && !isFetching,
    // Products
    getFeaturedProducts: (limit) => actor == null ? void 0 : actor.getFeaturedProducts(limit),
    listApprovedProducts: () => actor == null ? void 0 : actor.listApprovedProducts(),
    listAllProducts: () => actor == null ? void 0 : actor.listAllProducts(),
    listMyProducts: () => actor == null ? void 0 : actor.listMyProducts(),
    listPendingProducts: () => actor == null ? void 0 : actor.listPendingProducts(),
    getProduct: (id) => actor == null ? void 0 : actor.getProduct(id),
    searchProducts: (keyword) => actor == null ? void 0 : actor.searchProducts(keyword),
    filterProductsByCategory: (category) => actor == null ? void 0 : actor.filterProductsByCategory(category),
    addProduct: (title, description, price, category, image, quantity) => actor == null ? void 0 : actor.addProduct(title, description, price, category, image, quantity),
    editProduct: (id, title, description, price, category, image, quantity) => actor == null ? void 0 : actor.editProduct(
      id,
      title,
      description,
      price,
      category,
      image,
      quantity
    ),
    deleteMyProduct: (id) => actor == null ? void 0 : actor.deleteMyProduct(id),
    approveProduct: (id) => actor == null ? void 0 : actor.approveProduct(id),
    rejectProduct: (id) => actor == null ? void 0 : actor.rejectProduct(id),
    // Orders
    listMyOrders: () => actor == null ? void 0 : actor.listMyOrders(),
    listSellerOrders: () => actor == null ? void 0 : actor.listSellerOrders(),
    getOrder: (id) => actor == null ? void 0 : actor.getOrder(id),
    placeOrder: (items, deliveryAddress) => actor == null ? void 0 : actor.placeOrder(items, deliveryAddress),
    cancelOrder: (id) => actor == null ? void 0 : actor.cancelOrder(id),
    updateOrderStatus: (id, status) => actor == null ? void 0 : actor.updateOrderStatus(id, status),
    // Users
    registerUser: (name, email) => actor == null ? void 0 : actor.registerUser(name, email),
    getMyProfile: () => actor == null ? void 0 : actor.getMyProfile(),
    getUserProfile: (userId) => actor == null ? void 0 : actor.getUserProfile(userId),
    listAllUsers: () => actor == null ? void 0 : actor.listAllUsers(),
    // Sellers
    registerAsSeller: (businessName, description) => actor == null ? void 0 : actor.registerAsSeller(businessName, description),
    getMySellerProfile: () => actor == null ? void 0 : actor.getMySellerProfile(),
    getSellerProfile: (sellerId) => actor == null ? void 0 : actor.getSellerProfile(sellerId),
    listPendingSellers: () => actor == null ? void 0 : actor.listPendingSellers(),
    isApprovedSeller: (principal) => actor == null ? void 0 : actor.isApprovedSeller(principal),
    approveSeller: (sellerId) => actor == null ? void 0 : actor.approveSeller(sellerId),
    rejectSeller: (sellerId) => actor == null ? void 0 : actor.rejectSeller(sellerId),
    getSellerRevenue: () => actor == null ? void 0 : actor.getSellerRevenue()
  };
}
const STATUS_CONFIG = {
  [OrderStatus.pending]: {
    label: "Pending",
    className: "bg-primary/15 text-primary border-primary/30"
  },
  [OrderStatus.processing]: {
    label: "Processing",
    className: "bg-secondary/30 text-foreground border-border"
  },
  [OrderStatus.shipped]: {
    label: "Shipped",
    className: "bg-accent/15 text-accent border-accent/30"
  },
  [OrderStatus.delivered]: {
    label: "Delivered",
    className: "bg-accent/20 text-accent border-accent/30"
  },
  [OrderStatus.cancelled]: {
    label: "Cancelled",
    className: "bg-muted text-muted-foreground border-border"
  }
};
function formatDate(ts) {
  const ms = Number(ts) / 1e6;
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function formatPrice(cents) {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}
function OrderSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card p-5 space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16" })
    ] })
  ] }) });
}
function OrderCard({
  order,
  index,
  onCancel,
  isCancelling
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const config = STATUS_CONFIG[order.status];
  const isPending = order.status === OrderStatus.pending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "border-border bg-card shadow-sm",
      "data-ocid": `orders.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4 text-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-semibold text-foreground", children: [
                "Order #",
                String(order.id)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: formatDate(order.createdAt) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground truncate max-w-xs", children: [
              "Deliver to: ",
              order.deliveryAddress
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: cn(
                  "text-xs font-medium capitalize border",
                  config.className
                ),
                "data-ocid": `orders.status.${index}`,
                children: config.label
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary text-base", children: formatPrice(order.total) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              order.items.length,
              " item",
              order.items.length !== 1 ? "s" : ""
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-3 pb-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors font-medium",
              onClick: () => setExpanded((p) => !p),
              "data-ocid": `orders.expand_button.${index}`,
              "aria-expanded": expanded,
              children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" }),
                " Hide items"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" }),
                " View items"
              ] })
            }
          ),
          expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "divide-y divide-border rounded-lg border border-border overflow-hidden",
              "data-ocid": `orders.items_list.${index}`,
              children: order.items.map((item, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between px-4 py-3 bg-muted/30",
                  "data-ocid": `orders.order_item.${index}.${j + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground truncate", children: [
                        "Product #",
                        String(item.productId)
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                        "Qty: ",
                        Number(item.quantity)
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground shrink-0 ml-4", children: formatPrice(item.priceSnapshot * item.quantity) })
                  ]
                },
                String(item.productId)
              ))
            }
          ),
          isPending && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "text-destructive border-destructive/40 hover:bg-destructive/5 hover:border-destructive transition-smooth",
              onClick: () => onCancel(order.id),
              disabled: isCancelling,
              "data-ocid": `orders.cancel_button.${index}`,
              children: isCancelling ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin mr-1.5" }),
                "Cancelling…"
              ] }) : "Cancel Order"
            }
          ) })
        ] })
      ]
    }
  );
}
function RegistrationForm({
  onSuccess
}) {
  const backend = useBackend();
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const result = await backend.registerUser(name.trim(), email.trim());
      if (!result) throw new Error("Registration failed");
      return result;
    },
    onSuccess: () => {
      ue.success("Account created! Loading your orders…");
      onSuccess();
    },
    onError: () => {
      ue.error("Registration failed. Please try again.");
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "max-w-md mx-auto border-border",
      "data-ocid": "registration.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "Complete your profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Tell us a bit about yourself to start shopping." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: (e) => {
              e.preventDefault();
              mutate();
            },
            className: "space-y-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-name", children: "Full name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "reg-name",
                    placeholder: "Ada Okafor",
                    value: name,
                    onChange: (e) => setName(e.target.value),
                    required: true,
                    "data-ocid": "registration.name_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-email", children: "Email address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "reg-email",
                    type: "email",
                    placeholder: "ada@example.com",
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    required: true,
                    "data-ocid": "registration.email_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full bg-primary text-primary-foreground hover:bg-primary/90",
                  disabled: isPending || !name.trim() || !email.trim(),
                  "data-ocid": "registration.submit_button",
                  children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }),
                    "Saving…"
                  ] }) : "Save & continue"
                }
              )
            ]
          }
        ) })
      ]
    }
  );
}
function AccountOrders() {
  const { principal } = useAuth();
  const backend = useBackend();
  const queryClient = useQueryClient();
  const { actor, isFetching } = useActor(createActor);
  const navigate = useNavigate();
  const [justRegistered, setJustRegistered] = reactExports.useState(false);
  const profileQuery = useQuery({
    queryKey: ["myProfile"],
    queryFn: async () => {
      const profile2 = await backend.getMyProfile();
      return profile2 ?? null;
    },
    enabled: backend.isReady
  });
  const ordersQuery = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyOrders();
    },
    enabled: !!actor && !isFetching && (!!profileQuery.data || justRegistered)
  });
  const cancelMutation = useMutation({
    mutationFn: async (orderId) => {
      const result = await backend.cancelOrder(orderId);
      if (!result) throw new Error("Could not cancel order");
      return result;
    },
    onSuccess: (_data, orderId) => {
      ue.success(`Order #${String(orderId)} cancelled.`);
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
    },
    onError: () => {
      ue.error("Failed to cancel order. Please try again.");
    }
  });
  const profileLoading = profileQuery.isLoading;
  const ordersLoading = ordersQuery.isLoading;
  const orders = ordersQuery.data ?? [];
  const profile = profileQuery.data;
  const needsRegistration = !profileLoading && !profile && !justRegistered;
  const displayName = (profile == null ? void 0 : profile.name) ?? (principal ? `${String(principal).slice(0, 12)}…` : "Buyer");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-8", "data-ocid": "orders.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground", children: "My Orders" }),
      !profileLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: needsRegistration ? "Create your profile to view your order history." : `Hello, ${displayName}` })
    ] }),
    needsRegistration && /* @__PURE__ */ jsxRuntimeExports.jsx(
      RegistrationForm,
      {
        onSuccess: () => {
          setJustRegistered(true);
          queryClient.invalidateQueries({ queryKey: ["myProfile"] });
          queryClient.invalidateQueries({ queryKey: ["myOrders"] });
        }
      }
    ),
    (profileLoading || ordersLoading) && !needsRegistration && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "orders.loading_state", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderSkeleton, {}, n)) }),
    !profileLoading && !ordersLoading && !needsRegistration && (orders.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "orders.list", children: orders.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      OrderCard,
      {
        order,
        index: i + 1,
        onCancel: (id) => cancelMutation.mutate(id),
        isCancelling: cancelMutation.isPending && cancelMutation.variables === order.id
      },
      String(order.id)
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-24 gap-5 text-center",
        "data-ocid": "orders.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-muted p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageSearch, { className: "h-10 w-10 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-lg text-foreground", children: "No orders yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Your completed orders will appear here once you start shopping." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "default",
              className: "bg-primary text-primary-foreground hover:bg-primary/90",
              onClick: () => void navigate({
                to: "/products",
                search: { q: void 0, category: void 0 }
              }),
              "data-ocid": "orders.shop_now_button",
              children: "Browse products"
            }
          )
        ]
      }
    ))
  ] });
}
export {
  AccountOrders as default
};
