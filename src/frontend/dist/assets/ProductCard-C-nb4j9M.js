import { h as useCart, j as jsxRuntimeExports, L as Link, i as ShoppingCart, B as Badge, k as cn, d as Button } from "./index-Dw05bvFi.js";
import { S as Star } from "./star-DAKk_zNy.js";
function ProductCard({
  product,
  index = 1,
  className
}) {
  const { addItem } = useCart();
  const imageUrl = product.image.getDirectURL();
  const priceDisplay = (Number(product.price) / 100).toFixed(2);
  const isOutOfStock = product.quantity === 0n;
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) addItem(product);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "group relative bg-card rounded-lg overflow-hidden border border-border shadow-card hover:shadow-elevated transition-smooth",
        className
      ),
      "data-ocid": `product.item.${index}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products/$id", params: { id: String(product.id) }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden bg-muted", children: [
          imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageUrl,
              alt: product.title,
              className: "w-full h-full object-cover group-hover:scale-105 transition-smooth"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-10 w-10 opacity-30" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "text-xs font-body bg-card/90 backdrop-blur-sm",
              children: product.category
            }
          ) }),
          isOutOfStock && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/60 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-background font-display font-semibold text-sm", children: "Out of Stock" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-body font-medium text-sm text-foreground line-clamp-2 leading-snug mb-1 min-h-[2.5rem]", children: product.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mb-2", children: [
            [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                className: cn(
                  "h-3 w-3",
                  s <= 4 ? "fill-accent text-accent" : "text-muted-foreground"
                )
              },
              s
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1", children: "(24)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-primary text-lg", children: [
              "$",
              priceDisplay
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-7 px-2 text-xs border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-smooth",
                onClick: handleAddToCart,
                disabled: isOutOfStock,
                "data-ocid": `product.add_button.${index}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-3 w-3 mr-1" }),
                  "Add"
                ]
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
export {
  ProductCard as P
};
