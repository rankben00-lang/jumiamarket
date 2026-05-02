import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProductCategory } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

const CATEGORIES = Object.values(ProductCategory);

export function Header() {
  const { isAuthenticated, isInitializing, isLoggingIn, login, logout } =
    useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      void navigate({
        to: "/products",
        search: { q: searchQuery.trim(), category: undefined },
      });
    }
  };

  return (
    <header
      className="sticky top-0 z-50 bg-card border-b border-border shadow-subtle"
      data-ocid="header"
    >
      {/* Main header row */}
      <div className="container mx-auto px-4 py-3 flex items-center gap-3">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0" data-ocid="header.logo_link">
          <span className="font-display font-bold text-xl text-primary tracking-tight">
            Jumia
            <span className="text-accent">Market</span>
          </span>
        </Link>

        {/* Category + Search */}
        {!isMobile && (
          <form onSubmit={handleSearch} className="flex flex-1 max-w-2xl gap-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-r-none border-r-0 text-xs font-body h-9 px-3 flex-shrink-0"
                  data-ocid="header.category_select"
                >
                  All Categories <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40">
                <DropdownMenuItem
                  onClick={() =>
                    void navigate({
                      to: "/products",
                      search: { q: undefined, category: undefined },
                    })
                  }
                >
                  All
                </DropdownMenuItem>
                {CATEGORIES.map((cat) => (
                  <DropdownMenuItem
                    key={cat}
                    onClick={() =>
                      void navigate({
                        to: "/products",
                        search: { q: undefined, category: cat },
                      })
                    }
                  >
                    {cat}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands and categories…"
              className="rounded-none flex-1 h-9 text-sm border-primary/20 focus-visible:ring-primary"
              data-ocid="header.search_input"
            />
            <Button
              type="submit"
              className="rounded-l-none h-9 px-4 bg-primary hover:bg-primary/90"
              data-ocid="header.search_button"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        )}

        <div className="flex items-center gap-2 ml-auto">
          {/* Cart */}
          <Link to="/cart" data-ocid="header.cart_link">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px] bg-accent text-accent-foreground rounded-full"
                  data-ocid="header.cart_badge"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Auth */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  data-ocid="header.account_menu"
                >
                  <User className="h-4 w-4" />
                  {!isMobile && "Account"}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem asChild>
                  <Link to="/account/orders" data-ocid="header.orders_link">
                    <Package className="mr-2 h-4 w-4" /> My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/seller/dashboard" data-ocid="header.seller_link">
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Seller Hub
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin/sellers" data-ocid="header.admin_link">
                    <Settings className="mr-2 h-4 w-4" /> Admin Panel
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-destructive focus:text-destructive"
                  data-ocid="header.logout_button"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={login}
              disabled={isInitializing || isLoggingIn}
              size="sm"
              data-ocid="header.login_button"
            >
              {isInitializing
                ? "Loading…"
                : isLoggingIn
                  ? "Signing in…"
                  : "Sign in"}
            </Button>
          )}

          {/* Mobile menu toggle */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-ocid="header.mobile_menu_toggle"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile search */}
      {isMobile && (
        <div className="px-4 pb-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products…"
              className="flex-1 h-9 text-sm"
              data-ocid="header.mobile_search_input"
            />
            <Button type="submit" size="icon" className="h-9 w-9 flex-shrink-0">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}

      {/* Category nav bar */}
      {!isMobile && (
        <nav className="bg-primary/5 border-t border-border">
          <div className="container mx-auto px-4">
            <ul
              className="flex items-center gap-0 overflow-x-auto hide-scrollbar"
              data-ocid="header.category_nav"
            >
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() =>
                      void navigate({
                        to: "/products",
                        search: { q: undefined, category: cat },
                      })
                    }
                    className="px-4 py-2 text-xs font-body font-medium text-foreground/70 hover:text-primary hover:bg-primary/10 transition-smooth whitespace-nowrap"
                    data-ocid={`header.nav_cat.${cat.toLowerCase()}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
}
