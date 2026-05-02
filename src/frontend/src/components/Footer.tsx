import { Link } from "@tanstack/react-router";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

const year = new Date().getFullYear();
const hostname = typeof window !== "undefined" ? window.location.hostname : "";
const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

export function Footer() {
  return (
    <footer
      className="bg-card border-t border-border mt-auto"
      data-ocid="footer"
    >
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <span className="font-display font-bold text-lg text-primary">
              Jumia<span className="text-accent">Market</span>
            </span>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Africa's premier online marketplace. Buy and sell with confidence.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <SiFacebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <SiInstagram className="h-4 w-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <SiX className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-3">
              Shop
            </h4>
            <ul className="space-y-2">
              {[
                "Electronics",
                "Fashion",
                "Beauty",
                "Home",
                "Sports",
                "Books",
              ].map((cat) => (
                <li key={cat}>
                  <Link
                    to="/products"
                    search={{ q: undefined, category: cat }}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-3">
              Sellers
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Seller Hub", to: "/seller/dashboard" },
                { label: "List a Product", to: "/seller/products" },
                { label: "Order Management", to: "/seller/orders" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-3">
              Help
            </h4>
            <ul className="space-y-2">
              {[
                { label: "My Orders", to: "/account/orders" },
                { label: "Cart", to: "/cart" },
                { label: "Checkout", to: "/checkout" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {year}. Built with love using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex gap-4">
            <span className="text-xs text-muted-foreground">
              Privacy Policy
            </span>
            <span className="text-xs text-muted-foreground">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
