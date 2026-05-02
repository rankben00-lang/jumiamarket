import { c as createLucideIcon, u as useActor, p as useQueryClient, r as reactExports, b as useQuery, j as jsxRuntimeExports, I as Input, d as Button, V as VerificationStatus, g as Package, L as Link, m as ue, e as createActor } from "./index-Dw05bvFi.js";
import { C as Card } from "./card-DXgHQTOU.js";
import { L as Label } from "./label-BqLxb9Ur.js";
import { S as Skeleton } from "./skeleton-D-oAdvMv.js";
import { T as Textarea } from "./textarea-xJGfX_g9.js";
import { u as useMutation } from "./useMutation-CzIlz-Rh.js";
import { C as Clock } from "./clock-CnHGp3SV.js";
import { S as ShoppingBag } from "./shopping-bag-D8J0PwgR.js";
import { C as CircleCheckBig } from "./circle-check-big-CJbghuv-.js";
import "./index-CyJsTEJN.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
const DollarSign = createLucideIcon("dollar-sign", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
function SellerDashboard() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const [businessName, setBusinessName] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["mySellerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMySellerProfile();
    },
    enabled: !!actor && !isFetching
  });
  const { data: revenue, isLoading: revLoading } = useQuery({
    queryKey: ["sellerRevenue"],
    queryFn: async () => {
      if (!actor) return 0n;
      return actor.getSellerRevenue();
    },
    enabled: !!actor && !isFetching && !!profile
  });
  const { data: products, isLoading: prodLoading } = useQuery({
    queryKey: ["myProducts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyProducts();
    },
    enabled: !!actor && !isFetching && !!profile
  });
  const { data: orders, isLoading: ordLoading } = useQuery({
    queryKey: ["sellerOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSellerOrders();
    },
    enabled: !!actor && !isFetching && !!profile
  });
  const registerMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.registerAsSeller(businessName.trim(), description.trim());
    },
    onSuccess: () => {
      ue.success("Seller application submitted! Awaiting admin approval.");
      void queryClient.invalidateQueries({ queryKey: ["mySellerProfile"] });
    },
    onError: () => ue.error("Failed to submit application")
  });
  if (profileLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "seller_dashboard.loading_state", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, n)) });
  }
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-lg mx-auto py-12",
        "data-ocid": "seller_dashboard.register_panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center mb-8 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-8 w-8 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Become a Seller" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Register your business and start selling on our marketplace. Applications are reviewed by our team." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "businessName", children: "Business Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "businessName",
                  placeholder: "e.g. Tech Gadgets Store",
                  value: businessName,
                  onChange: (e) => setBusinessName(e.target.value),
                  "data-ocid": "seller_dashboard.business_name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "description",
                  placeholder: "Describe your business and what you sell...",
                  value: description,
                  onChange: (e) => setDescription(e.target.value),
                  rows: 4,
                  "data-ocid": "seller_dashboard.description_textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "w-full",
                disabled: !businessName.trim() || !description.trim() || registerMutation.isPending,
                onClick: () => registerMutation.mutate(),
                "data-ocid": "seller_dashboard.register_submit_button",
                children: registerMutation.isPending ? "Submitting..." : "Submit Application"
              }
            )
          ] })
        ]
      }
    );
  }
  if (profile.verificationStatus === VerificationStatus.pending) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "max-w-lg mx-auto py-12",
        "data-ocid": "seller_dashboard.pending_panel",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-8 w-8 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Application Under Review" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-2", children: [
              "Your seller application for",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: profile.businessName }),
              " ",
              "is being reviewed. You'll have access to your dashboard once approved."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-accent/10 border border-accent/30 rounded-xl p-4 flex items-start gap-3 text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-accent mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Our team typically reviews applications within 24-48 hours. Check back soon." })
          ] })
        ] })
      }
    );
  }
  if (profile.verificationStatus === VerificationStatus.rejected) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "max-w-lg mx-auto py-12",
        "data-ocid": "seller_dashboard.rejected_panel",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-8 w-8 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Application Not Approved" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-2", children: [
              "Unfortunately your application for",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: profile.businessName }),
              " ",
              "was not approved. Please contact support for more information."
            ] })
          ] })
        ] })
      }
    );
  }
  const pendingOrders = (orders == null ? void 0 : orders.filter((o) => o.status === "pending").length) ?? 0;
  const stats = [
    {
      label: "Total Revenue",
      value: revLoading ? null : `$${(Number(revenue ?? 0n) / 100).toFixed(2)}`,
      icon: DollarSign,
      color: "text-accent",
      bg: "bg-accent/10"
    },
    {
      label: "Products Listed",
      value: prodLoading ? null : String((products == null ? void 0 : products.length) ?? 0),
      icon: Package,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      label: "Total Orders",
      value: ordLoading ? null : String((orders == null ? void 0 : orders.length) ?? 0),
      icon: ShoppingBag,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      label: "Pending Orders",
      value: ordLoading ? null : String(pendingOrders),
      icon: TrendingUp,
      color: "text-accent",
      bg: "bg-accent/10"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "seller_dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-6 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Seller Dashboard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium bg-accent/15 text-accent px-2 py-0.5 rounded-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3 w-3" }),
            " Approved"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: profile.businessName })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "seller_dashboard.add_product_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/seller/products", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "mr-2 h-4 w-4" }),
        " Manage Products"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8", children: stats.map(({ label, value, icon: Icon, color, bg }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "p-5",
        "data-ocid": `seller_dashboard.stat.${label.toLowerCase().replace(/ /g, "_")}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-2.5 rounded-xl ${bg}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${color}` }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            value === null ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-16 mb-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-foreground truncate", children: value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: label })
          ] })
        ] })
      },
      label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold mb-4 text-foreground", children: "Quick Actions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            variant: "outline",
            "data-ocid": "seller_dashboard.manage_products_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/seller/products", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "mr-2 h-4 w-4" }),
              "My Products"
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            variant: "outline",
            "data-ocid": "seller_dashboard.view_orders_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/seller/orders", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "mr-2 h-4 w-4" }),
              "My Orders"
            ] })
          }
        )
      ] })
    ] })
  ] });
}
export {
  SellerDashboard as default
};
