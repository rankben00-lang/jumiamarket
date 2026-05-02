import { c as createLucideIcon, u as useActor, a as useNavigate, r as reactExports, b as useQuery, j as jsxRuntimeExports, B as Badge, I as Input, d as Button, S as Search, L as Link, P as ProductCategory, e as createActor } from "./index-Dw05bvFi.js";
import { P as ProductCard } from "./ProductCard-C-nb4j9M.js";
import { S as Skeleton } from "./skeleton-D-oAdvMv.js";
import { m as motion, A as ArrowRight } from "./proxy-Cg7qBahV.js";
import { S as ShoppingBag } from "./shopping-bag-D8J0PwgR.js";
import "./star-DAKk_zNy.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode$1);
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
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const CATEGORY_ICONS = {
  Electronics: "💻",
  Fashion: "👗",
  Beauty: "✨",
  Home: "🏠",
  Sports: "⚽",
  Books: "📚",
  Others: "🛍️"
};
const CATEGORIES = Object.values(ProductCategory);
const VALUE_PROPS = [
  {
    icon: Shield,
    label: "Secure Payments",
    desc: "100% verified transactions"
  },
  { icon: Truck, label: "Fast Delivery", desc: "Doorstep in 2–5 days" },
  { icon: Zap, label: "Best Prices", desc: "Price-match guarantee" }
];
function Home() {
  const { actor, isFetching } = useActor(createActor);
  const navigate = useNavigate();
  const [heroQuery, setHeroQuery] = reactExports.useState("");
  const { data: featured, isLoading } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedProducts(8n);
    },
    enabled: !!actor && !isFetching
  });
  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroQuery.trim()) {
      void navigate({
        to: "/products",
        search: { q: heroQuery.trim(), category: void 0 }
      });
    } else {
      void navigate({
        to: "/products",
        search: { q: void 0, category: void 0 }
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "-mx-4 -my-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary text-primary-foreground py-14 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-center gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5 },
          className: "flex-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-4 bg-accent text-accent-foreground font-body text-xs", children: "Africa's Premier Marketplace" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-4xl md:text-5xl leading-tight mb-4", children: [
              "Shop Everything,",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "Delivered to You"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 font-body text-lg mb-6 max-w-md", children: "From electronics to fashion — discover millions of products from verified sellers across the continent." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleHeroSearch,
                className: "flex max-w-lg mb-6",
                "data-ocid": "home.hero_search_form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: heroQuery,
                      onChange: (e) => setHeroQuery(e.target.value),
                      placeholder: "Search products, brands and categories…",
                      className: "rounded-r-none h-11 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-accent",
                      "data-ocid": "home.hero_search_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      className: "rounded-l-none h-11 px-5 bg-accent hover:bg-accent/90 text-accent-foreground",
                      "data-ocid": "home.hero_search_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4" })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                variant: "outline",
                size: "lg",
                className: "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10",
                "data-ocid": "home.sell_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/seller/dashboard", children: "Start Selling" })
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.5, delay: 0.1 },
          className: "flex-1 flex justify-center",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/hero-marketplace.dim_800x600.jpg",
              alt: "Marketplace",
              className: "rounded-xl shadow-lg max-w-sm w-full object-cover"
            }
          )
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-y border-border py-5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: VALUE_PROPS.map(({ icon: Icon, label, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: desc })
      ] })
    ] }, label)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 px-4 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Shop by Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/products",
            search: { q: void 0, category: void 0 },
            className: "text-primary text-sm font-body hover:underline inline-flex items-center gap-1",
            "data-ocid": "home.all_categories_link",
            children: [
              "View all ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-4 md:grid-cols-7 gap-3",
          "data-ocid": "home.categories_section",
          children: CATEGORIES.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: i * 0.05 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/products",
                  search: { q: void 0, category: cat },
                  className: "flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-smooth group",
                  "data-ocid": `home.category.${cat.toLowerCase()}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: CATEGORY_ICONS[cat] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body font-medium text-foreground/80 text-center", children: cat })
                  ]
                }
              )
            },
            cat
          ))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 px-4 bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Featured Products" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Curated picks from our best sellers" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/products",
            search: { q: void 0, category: void 0 },
            className: "text-primary text-sm font-body hover:underline inline-flex items-center gap-1",
            "data-ocid": "home.view_all_products_link",
            children: [
              "See all ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
            ]
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-lg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" })
      ] }, n)) }) : featured && featured.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 md:grid-cols-4 gap-4",
          "data-ocid": "home.featured_list",
          children: featured.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProductCard,
            {
              product,
              index: i + 1
            },
            String(product.id)
          ))
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-16 gap-4",
          "data-ocid": "home.featured_empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-12 w-12 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No products listed yet. Be the first to sell!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                variant: "outline",
                "data-ocid": "home.start_selling_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/seller/dashboard", children: "Start Selling" })
              }
            )
          ]
        }
      )
    ] }) })
  ] });
}
export {
  Home as default
};
