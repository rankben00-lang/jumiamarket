import { c as createLucideIcon, l as useParams, u as useActor, h as useCart, a as useNavigate, r as reactExports, b as useQuery, j as jsxRuntimeExports, i as ShoppingCart, d as Button, L as Link, B as Badge, k as cn, m as ue, e as createActor } from "./index-Dw05bvFi.js";
import { S as Skeleton } from "./skeleton-D-oAdvMv.js";
import { S as Star } from "./star-DAKk_zNy.js";
import { M as Minus } from "./minus-BV1LdfSS.js";
import { P as Plus } from "./plus-DeYFP9t8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7", key: "ztvudi" }],
  ["path", { d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8", key: "1b2hhj" }],
  ["path", { d: "M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4", key: "2ebpfo" }],
  ["path", { d: "M2 7h20", key: "1fcdvo" }],
  [
    "path",
    {
      d: "M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7",
      key: "6c3vgh"
    }
  ]
];
const Store = createLucideIcon("store", __iconNode);
function ProductDetail() {
  const { id } = useParams({ from: "/products/$id" });
  const { actor, isFetching } = useActor(createActor);
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = reactExports.useState(1);
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProduct(BigInt(id));
    },
    enabled: !!actor && !isFetching
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-1/3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-1/2" })
      ] })
    ] });
  }
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 gap-4",
        "data-ocid": "product_detail.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-12 w-12 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "Product not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "This product may have been removed or is unavailable." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", search: { q: void 0, category: void 0 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
            "Back to products"
          ] }) })
        ]
      }
    );
  }
  const priceDisplay = (Number(product.price) / 100).toFixed(2);
  const maxQty = Number(product.quantity);
  const isOutOfStock = maxQty === 0;
  const decreaseQty = () => setQty((prev) => Math.max(1, prev - 1));
  const increaseQty = () => setQty((prev) => Math.min(maxQty, prev + 1));
  const handleAddToCart = () => {
    addItem(product, qty);
    ue.success(`${product.title} added to cart!`, {
      description: `Qty: ${qty} · ${(Number(product.price) / 100 * qty).toFixed(2)}`
    });
  };
  const handleBuyNow = () => {
    addItem(product, qty);
    void navigate({ to: "/cart" });
  };
  const imageUrl = product.image.getDirectURL();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "product_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/products",
        search: { q: void 0, category: void 0 },
        className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors",
        "data-ocid": "product_detail.back_link",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          " Back to products"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl overflow-hidden bg-muted aspect-square", children: imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: imageUrl,
          alt: product.title,
          className: "w-full h-full object-cover"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-16 w-16 text-muted-foreground/30" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "mb-3 font-body", children: product.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-3 leading-snug", children: product.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mb-4", children: [
          [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Star,
            {
              className: cn(
                "h-4 w-4",
                s <= 4 ? "fill-accent text-accent" : "text-muted-foreground"
              )
            },
            s
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground ml-2", children: "(24 reviews)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-3xl text-primary mb-2", children: [
          "$",
          priceDisplay
        ] }),
        isOutOfStock ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", className: "mb-4", children: "Out of Stock" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-accent font-body mb-4", children: [
          "✓ ",
          maxQty,
          " in stock — ready to ship"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-6", children: product.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 bg-muted/40 rounded-lg mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Sold by",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Verified Seller" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "ml-auto text-xs border-accent/40 text-accent",
              children: "✓ Trusted"
            }
          )
        ] }),
        !isOutOfStock && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center border border-border rounded-lg overflow-hidden",
              "data-ocid": "product_detail.qty_selector",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "px-3 py-2 hover:bg-muted transition-colors disabled:opacity-40",
                    onClick: decreaseQty,
                    disabled: qty <= 1,
                    "data-ocid": "product_detail.qty_decrease",
                    "aria-label": "Decrease quantity",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-2 font-display font-semibold text-sm min-w-[3rem] text-center", children: qty }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "px-3 py-2 hover:bg-muted transition-colors disabled:opacity-40",
                    onClick: increaseQty,
                    disabled: qty >= maxQty,
                    "data-ocid": "product_detail.qty_increase",
                    "aria-label": "Increase quantity",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "Max ",
            maxQty,
            " per order"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "flex-1",
              disabled: isOutOfStock,
              onClick: handleAddToCart,
              "data-ocid": "product_detail.add_to_cart_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "mr-2 h-4 w-4" }),
                isOutOfStock ? "Out of Stock" : "Add to Cart"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              disabled: isOutOfStock,
              onClick: handleBuyNow,
              "data-ocid": "product_detail.buy_now_button",
              children: "Buy Now"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  ProductDetail as default
};
