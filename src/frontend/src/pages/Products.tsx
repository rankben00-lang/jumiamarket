import { createActor } from "@/backend";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCategory } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Package, Search, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const CATEGORY_LIST = Object.values(ProductCategory);

export default function Products() {
  const { actor, isFetching } = useActor(createActor);
  const search = useSearch({ from: "/products" });
  const navigate = useNavigate();
  const q = search.q as string | undefined;
  const category = search.category as string | undefined;

  // Local search input, seeded from URL param
  const [inputVal, setInputVal] = useState(q ?? "");

  // Sync input if URL changes externally (e.g. header search)
  useEffect(() => {
    setInputVal(q ?? "");
  }, [q]);

  // Debounced navigate: push search to URL after 400 ms idle
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    (() => {
      let timer: ReturnType<typeof setTimeout>;
      return (val: string, cat: string | undefined) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          void navigate({
            to: "/products",
            search: {
              q: val.trim() || undefined,
              category: val.trim() ? undefined : cat,
            },
          });
        }, 400);
      };
    })(),
    [],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
    debouncedSearch(e.target.value, category);
  };

  const handleClearSearch = () => {
    setInputVal("");
    void navigate({ to: "/products", search: { q: undefined, category } });
  };

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", q, category],
    queryFn: async () => {
      if (!actor) return [];
      if (q) return actor.searchProducts(q);
      if (category)
        return actor.filterProductsByCategory(category as ProductCategory);
      return actor.listApprovedProducts();
    },
    enabled: !!actor && !isFetching,
  });

  const pageTitle = q
    ? `Results for "${q}"`
    : category
      ? category
      : "All Products";

  return (
    <div>
      {/* Search bar */}
      <div className="mb-5">
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            value={inputVal}
            onChange={handleInputChange}
            placeholder="Search products, brands…"
            className="pl-9 pr-8 h-10 text-sm"
            data-ocid="products.search_input"
          />
          {inputVal && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={handleClearSearch}
              aria-label="Clear search"
              data-ocid="products.clear_search_button"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Title + active category badge */}
      <div className="flex items-center gap-3 mb-5">
        <h1 className="font-display font-bold text-2xl text-foreground">
          {pageTitle}
        </h1>
        {category && (
          <Badge variant="secondary" className="font-body">
            {category}
          </Badge>
        )}
        {products && !isLoading && (
          <span className="text-sm text-muted-foreground ml-auto">
            {products.length} {products.length === 1 ? "result" : "results"}
          </span>
        )}
      </div>

      {/* Category filter pills */}
      <div
        className="flex gap-2 flex-wrap mb-6"
        data-ocid="products.category_filters"
      >
        <Button
          asChild
          size="sm"
          variant={!category && !q ? "default" : "outline"}
          className="h-7 text-xs"
          data-ocid="products.filter.all"
        >
          <Link to="/products" search={{ q: undefined, category: undefined }}>
            All
          </Link>
        </Button>
        {CATEGORY_LIST.map((cat) => (
          <Button
            key={cat}
            asChild
            size="sm"
            variant={category === cat ? "default" : "outline"}
            className="h-7 text-xs"
            data-ocid={`products.filter.${cat.toLowerCase()}`}
          >
            <Link to="/products" search={{ q: undefined, category: cat }}>
              {cat}
            </Link>
          </Button>
        ))}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <div key={n} className="space-y-3">
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : products && products.length > 0 ? (
        <div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
          data-ocid="products.list"
        >
          {products.map((product, i) => (
            <ProductCard
              key={String(product.id)}
              product={product}
              index={i + 1}
            />
          ))}
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-20 gap-4"
          data-ocid="products.empty_state"
        >
          <Package className="h-12 w-12 text-muted-foreground" />
          <p className="font-display font-semibold text-foreground">
            No products found
          </p>
          <p className="text-muted-foreground text-sm">
            {q
              ? `No results for "${q}". Try different keywords.`
              : "No products in this category yet."}
          </p>
          <Button asChild variant="outline" size="sm">
            <Link to="/products" search={{ q: undefined, category: undefined }}>
              Browse all products
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
