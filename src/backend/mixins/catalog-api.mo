import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import CatalogLib "../lib/catalog";
import UsersLib "../lib/users";
import CatalogTypes "../types/catalog";
import CommonTypes "../types/common";
import UserTypes "../types/users";
import Storage "mo:caffeineai-object-storage/Storage";

mixin (
  products : List.List<CatalogTypes.Product>,
  users : List.List<UserTypes.UserProfile>,
  sellers : List.List<UserTypes.SellerProfile>,
  nextProductId : { var value : Nat },
) {
  // ─── public browse & search ──────────────────────────────────────────────────

  public query func listApprovedProducts() : async [CatalogTypes.Product] {
    CatalogLib.listApprovedProducts(products);
  };

  public query func getProduct(id : CommonTypes.ProductId) : async ?CatalogTypes.Product {
    CatalogLib.getProduct(products, id);
  };

  public query func filterProductsByCategory(
    category : CatalogTypes.ProductCategory
  ) : async [CatalogTypes.Product] {
    CatalogLib.filterByCategory(products, category);
  };

  public query func searchProducts(keyword : Text) : async [CatalogTypes.Product] {
    CatalogLib.searchByKeyword(products, keyword);
  };

  public query func getFeaturedProducts(limit : Nat) : async [CatalogTypes.Product] {
    CatalogLib.getFeaturedProducts(products, limit);
  };

  // ─── seller product management ───────────────────────────────────────────────

  public shared ({ caller }) func addProduct(
    title : Text,
    description : Text,
    price : Nat,
    category : CatalogTypes.ProductCategory,
    image : Storage.ExternalBlob,
    quantity : Nat,
  ) : async CommonTypes.ProductId {
    if (not UsersLib.isApprovedSeller(users, sellers, caller)) {
      Runtime.trap("Unauthorized: only approved sellers can add products");
    };
    let id = nextProductId.value;
    nextProductId.value += 1;
    let product = CatalogLib.createProduct(products, id, title, description, price, category, image, caller, quantity);
    product.id;
  };

  public shared ({ caller }) func editProduct(
    id : CommonTypes.ProductId,
    title : Text,
    description : Text,
    price : Nat,
    category : CatalogTypes.ProductCategory,
    image : Storage.ExternalBlob,
    quantity : Nat,
  ) : async Bool {
    if (not UsersLib.isApprovedSeller(users, sellers, caller)) {
      Runtime.trap("Unauthorized: only approved sellers can edit products");
    };
    CatalogLib.updateProduct(products, id, caller, title, description, price, category, image, quantity);
  };

  public shared ({ caller }) func deleteMyProduct(id : CommonTypes.ProductId) : async Bool {
    if (not UsersLib.isApprovedSeller(users, sellers, caller)) {
      Runtime.trap("Unauthorized: only approved sellers can delete products");
    };
    CatalogLib.deleteProduct(products, id, caller);
  };

  public query ({ caller }) func listMyProducts() : async [CatalogTypes.Product] {
    CatalogLib.listSellerProducts(products, caller);
  };

  // ─── admin product management ────────────────────────────────────────────────

  public shared ({ caller }) func approveProduct(id : CommonTypes.ProductId) : async Bool {
    if (not UsersLib.isAdmin(users, caller)) {
      Runtime.trap("Unauthorized: only admins can approve products");
    };
    CatalogLib.updateProductStatus(products, id, #approved);
  };

  public shared ({ caller }) func rejectProduct(id : CommonTypes.ProductId) : async Bool {
    if (not UsersLib.isAdmin(users, caller)) {
      Runtime.trap("Unauthorized: only admins can reject products");
    };
    CatalogLib.updateProductStatus(products, id, #rejected);
  };

  public query ({ caller }) func listPendingProducts() : async [CatalogTypes.Product] {
    if (not UsersLib.isAdmin(users, caller)) {
      Runtime.trap("Unauthorized: only admins can list pending products");
    };
    CatalogLib.listPendingProducts(products);
  };

  public query ({ caller }) func listAllProducts() : async [CatalogTypes.Product] {
    if (not UsersLib.isAdmin(users, caller)) {
      Runtime.trap("Unauthorized: only admins can list all products");
    };
    CatalogLib.listProducts(products);
  };
};
