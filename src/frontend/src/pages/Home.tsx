import { createActor } from "@/backend";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCategory } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Search,
  Shield,
  ShoppingBag,
  Truck,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const CATEGORY_ICONS: Record<string, string> = {
  Electronics: "💻",
  Fashion: "👗",
  Beauty: "✨",
  Home: "🏠",
  Sports: "⚽",
  Books: "📚",
  Others: "🛍️",
};

const CATEGORIES = Object.values(ProductCategory);

const VALUE_PROPS = [
  {
    icon: Shield,
    label: "Secure Payments",
    desc: "100% verified transactions",
  },
  { icon: Truck, label: "Fast Delivery", desc: "Doorstep in 2–5 days" },
  { icon: Zap, label: "Best Prices", desc: "Price-match guarantee" },
];

export default function Home() {
  const { actor, isFetching } = useActor(createActor);
  const navigate = useNavigate();
  const [heroQuery, setHeroQuery] = useState("");

  const { data: featured, isLoading } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedProducts(8n);
    },
    enabled: !!actor && !isFetching,
  });

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroQuery.trim()) {
      void navigate({
        to: "/products",
        search: { q: heroQuery.trim(), category: undefined },
      });
    } else {
      void navigate({
        to: "/products",
        search: { q: undefined, category: undefined },
      });
    }
  };

  return (
    <div className="-mx-4 -my-6">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-14 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <Badge className="mb-4 bg-accent text-accent-foreground font-body text-xs">
                Africa's Premier Marketplace
              </Badge>
              <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-4">
                Shop Everything,
                <br />
                Delivered to You
              </h1>
              <p className="text-primary-foreground/80 font-body text-lg mb-6 max-w-md">
                From electronics to fashion — discover millions of products from
                verified sellers across the continent.
              </p>
              {/* Hero Search */}
              <form
                onSubmit={handleHeroSearch}
                className="flex max-w-lg mb-6"
                data-ocid="home.hero_search_form"
              >
                <Input
                  value={heroQuery}
                  onChange={(e) => setHeroQuery(e.target.value)}
                  placeholder="Search products, brands and categories…"
                  className="rounded-r-none h-11 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-accent"
                  data-ocid="home.hero_search_input"
                />
                <Button
                  type="submit"
                  className="rounded-l-none h-11 px-5 bg-accent hover:bg-accent/90 text-accent-foreground"
                  data-ocid="home.hero_search_button"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
              <div className="flex gap-3 flex-wrap">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  data-ocid="home.sell_button"
                >
                  <Link to="/seller/dashboard">Start Selling</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-1 flex justify-center"
            >
              <img
                src="/assets/generated/hero-marketplace.dim_800x600.jpg"
                alt="Marketplace"
                className="rounded-xl shadow-lg max-w-sm w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="bg-muted/30 border-y border-border py-5 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {VALUE_PROPS.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-foreground">
                    {label}
                  </p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 px-4 bg-background">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-2xl text-foreground">
              Shop by Category
            </h2>
            <Link
              to="/products"
              search={{ q: undefined, category: undefined }}
              className="text-primary text-sm font-body hover:underline inline-flex items-center gap-1"
              data-ocid="home.all_categories_link"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div
            className="grid grid-cols-4 md:grid-cols-7 gap-3"
            data-ocid="home.categories_section"
          >
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to="/products"
                  search={{ q: undefined, category: cat }}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-smooth group"
                  data-ocid={`home.category.${cat.toLowerCase()}`}
                >
                  <span className="text-2xl">{CATEGORY_ICONS[cat]}</span>
                  <span className="text-xs font-body font-medium text-foreground/80 text-center">
                    {cat}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-10 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-bold text-2xl text-foreground">
                Featured Products
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Curated picks from our best sellers
              </p>
            </div>
            <Link
              to="/products"
              search={{ q: undefined, category: undefined }}
              className="text-primary text-sm font-body hover:underline inline-flex items-center gap-1"
              data-ocid="home.view_all_products_link"
            >
              See all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div key={n} className="space-y-3">
                  <Skeleton className="aspect-square rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : featured && featured.length > 0 ? (
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              data-ocid="home.featured_list"
            >
              {featured.map((product, i) => (
                <ProductCard
                  key={String(product.id)}
                  product={product}
                  index={i + 1}
                />
              ))}
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center py-16 gap-4"
              data-ocid="home.featured_empty_state"
            >
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">
                No products listed yet. Be the first to sell!
              </p>
              <Button
                asChild
                variant="outline"
                data-ocid="home.start_selling_button"
              >
                <Link to="/seller/dashboard">Start Selling</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
