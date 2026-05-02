import List "mo:core/List";
import Time "mo:core/Time";
import CatalogTypes "../types/catalog";
import CommonTypes "../types/common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type Product = CatalogTypes.Product;
  public type ProductCategory = CatalogTypes.ProductCategory;
  public type ProductStatus = CatalogTypes.ProductStatus;

  public func createProduct(
    products : List.List<Product>,
    nextId : Nat,
    title : Text,
    description : Text,
    price : Nat,
    category : ProductCategory,
    image : Storage.ExternalBlob,
    sellerId : CommonTypes.UserId,
    quantity : Nat,
  ) : Product {
    let product : Product = {
      id = nextId;
      title;
      description;
      price;
      category;
      image;
      sellerId;
      quantity;
      status = #pending;
      createdAt = Time.now();
    };
    products.add(product);
    product;
  };

  public func getProduct(
    products : List.List<Product>,
    id : CommonTypes.ProductId,
  ) : ?Product {
    products.find(func(p) { p.id == id });
  };

  public func listProducts(products : List.List<Product>) : [Product] {
    products.toArray();
  };

  public func listApprovedProducts(products : List.List<Product>) : [Product] {
    products.filter(func(p) { p.status == #approved }).toArray();
  };

  public func filterByCategory(
    products : List.List<Product>,
    category : ProductCategory,
  ) : [Product] {
    products.filter(func(p) { p.status == #approved and p.category == category }).toArray();
  };

  public func searchByKeyword(
    products : List.List<Product>,
    keyword : Text,
  ) : [Product] {
    let lower = keyword.toLower();
    products.filter(func(p) {
      p.status == #approved and (
        p.title.toLower().contains(#text lower) or
        p.description.toLower().contains(#text lower)
      );
    }).toArray();
  };

  public func updateProductStatus(
    products : List.List<Product>,
    id : CommonTypes.ProductId,
    status : ProductStatus,
  ) : Bool {
    var found = false;
    products.mapInPlace(func(p) {
      if (p.id == id) {
        found := true;
        { p with status };
      } else { p };
    });
    found;
  };

  public func updateProduct(
    products : List.List<Product>,
    id : CommonTypes.ProductId,
    sellerId : CommonTypes.UserId,
    title : Text,
    description : Text,
    price : Nat,
    category : ProductCategory,
    image : Storage.ExternalBlob,
    quantity : Nat,
  ) : Bool {
    var found = false;
    products.mapInPlace(func(p) {
      if (p.id == id and p.sellerId == sellerId) {
        found := true;
        { p with title; description; price; category; image; quantity; status = #pending };
      } else { p };
    });
    found;
  };

  public func deleteProduct(
    products : List.List<Product>,
    id : CommonTypes.ProductId,
    sellerId : CommonTypes.UserId,
  ) : Bool {
    let before = products.size();
    let filtered = products.filter(func(p) {
      not (p.id == id and p.sellerId == sellerId);
    });
    products.clear();
    products.append(filtered);
    products.size() < before;
  };

  public func listPendingProducts(products : List.List<Product>) : [Product] {
    products.filter(func(p) { p.status == #pending }).toArray();
  };

  public func listSellerProducts(
    products : List.List<Product>,
    sellerId : CommonTypes.UserId,
  ) : [Product] {
    products.filter(func(p) { p.sellerId == sellerId }).toArray();
  };

  public func getFeaturedProducts(products : List.List<Product>, limit : Nat) : [Product] {
    let approved = products.filter(func(p) { p.status == #approved });
    let arr = approved.toArray();
    if (arr.size() <= limit) { arr } else {
      arr.sliceToArray(0, limit);
    };
  };
};
