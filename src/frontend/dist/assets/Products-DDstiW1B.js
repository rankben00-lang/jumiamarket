import { u as useActor, f as useSearch, a as useNavigate, r as reactExports, b as useQuery, j as jsxRuntimeExports, S as Search, I as Input, X, B as Badge, d as Button, L as Link, g as Package, P as ProductCategory, e as createActor } from "./index-Dw05bvFi.js";
import { P as ProductCard } from "./ProductCard-C-nb4j9M.js";
import { S as Skeleton } from "./skeleton-D-oAdvMv.js";
import "./star-DAKk_zNy.js";
const CATEGORY_LIST = Object.values(ProductCategory);
function Products() {
  const { actor, isFetching } = useActor(createActor);
  const search = useSearch({ from: "/products" });
  const navigate = useNavigate();
  const q = search.q;
  const category = search.category;
  const [inputVal, setInputVal] = reactExports.useState(q ?? "");
  reactExports.useEffect(() => {
    setInputVal(q ?? "");
  }, [q]);
  const debouncedSearch = reactExports.useCallback(
    /* @__PURE__ */ (() => {
      let timer;
      return (val, cat) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          void navigate({
            to: "/products",
            search: {
              q: val.trim() || void 0,
              category: val.trim() ? void 0 : cat
            }
          });
        }, 400);
      };
    })(),
    []
  );
  const handleInputChange = (e) => {
    setInputVal(e.target.value);
    debouncedSearch(e.target.value, category);
  };
  const handleClearSearch = () => {
    setInputVal("");
    void navigate({ to: "/products", search: { q: void 0, category } });
  };
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", q, category],
    queryFn: async () => {
      if (!actor) return [];
      if (q) return actor.searchProducts(q);
      if (category)
        return actor.filterProductsByCategory(category);
      return actor.listApprovedProducts();
    },
    enabled: !!actor && !isFetching
  });
  const pageTitle = q ? `Results for "${q}"` : category ? category : "All Products";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: inputVal,
          onChange: handleInputChange,
          placeholder: "Search products, brands…",
          className: "pl-9 pr-8 h-10 text-sm",
          "data-ocid": "products.search_input"
        }
      ),
      inputVal && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
          onClick: handleClearSearch,
          "aria-label": "Clear search",
          "data-ocid": "products.clear_search_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: pageTitle }),
      category && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "font-body", children: category }),
      products && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground ml-auto", children: [
        products.length,
        " ",
        products.length === 1 ? "result" : "results"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex gap-2 flex-wrap mb-6",
        "data-ocid": "products.category_filters",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              size: "sm",
              variant: !category && !q ? "default" : "outline",
              className: "h-7 text-xs",
              "data-ocid": "products.filter.all",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", search: { q: void 0, category: void 0 }, children: "All" })
            }
          ),
          CATEGORY_LIST.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              size: "sm",
              variant: category === cat ? "default" : "outline",
              className: "h-7 text-xs",
              "data-ocid": `products.filter.${cat.toLowerCase()}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", search: { q: void 0, category: cat }, children: cat })
            },
            cat
          ))
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4", children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" })
    ] }, n)) }) : products && products.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4",
        "data-ocid": "products.list",
        children: products.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
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
        className: "flex flex-col items-center justify-center py-20 gap-4",
        "data-ocid": "products.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-12 w-12 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "No products found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: q ? `No results for "${q}". Try different keywords.` : "No products in this category yet." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", search: { q: void 0, category: void 0 }, children: "Browse all products" }) })
        ]
      }
    )
  ] });
}
export {
  Products as default
};
