import List "mo:core/List";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import OrdersLib "../lib/orders";
import CatalogLib "../lib/catalog";
import UsersLib "../lib/users";
import OrderTypes "../types/orders";
import CatalogTypes "../types/catalog";
import CommonTypes "../types/common";
import UserTypes "../types/users";

mixin (
  orders : List.List<OrderTypes.Order>,
  products : List.List<CatalogTypes.Product>,
  users : List.List<UserTypes.UserProfile>,
  sellers : List.List<UserTypes.SellerProfile>,
  nextOrderId : { var value : Nat },
) {
  public shared ({ caller }) func placeOrder(
    items : [OrderTypes.OrderItem],
    deliveryAddress : Text,
  ) : async CommonTypes.OrderId {
    if (caller.isAnonymous()) {
      Runtime.trap("Must be authenticated to place an order");
    };
    switch (UsersLib.getUser(users, caller)) {
      case null { Runtime.trap("Must register as user first") };
      case (?_) {};
    };
    if (items.size() == 0) {
      Runtime.trap("Order must contain at least one item");
    };
    let id = nextOrderId.value;
    nextOrderId.value += 1;
    let order = OrdersLib.createOrder(orders, id, caller, items, deliveryAddress);
    order.id;
  };

  public query ({ caller }) func getOrder(id : CommonTypes.OrderId) : async ?OrderTypes.Order {
    switch (OrdersLib.getOrder(orders, id)) {
      case (?o) {
        if (Principal.equal(o.buyerId, caller) or UsersLib.isAdmin(users, caller)) {
          ?o;
        } else { null };
      };
      case null { null };
    };
  };

  public query ({ caller }) func listMyOrders() : async [OrderTypes.Order] {
    OrdersLib.listBuyerOrders(orders, caller);
  };

  public shared ({ caller }) func cancelOrder(id : CommonTypes.OrderId) : async Bool {
    switch (OrdersLib.getOrder(orders, id)) {
      case null { false };
      case (?o) {
        if (not Principal.equal(o.buyerId, caller)) {
          Runtime.trap("Unauthorized: you can only cancel your own orders");
        };
        if (o.status != #pending) {
          Runtime.trap("Can only cancel pending orders");
        };
        OrdersLib.updateOrderStatus(orders, id, #cancelled, caller);
      };
    };
  };

  public query ({ caller }) func listSellerOrders() : async [OrderTypes.Order] {
    let myProducts = CatalogLib.listSellerProducts(products, caller);
    let myProductIds = myProducts.map(func(p : CatalogTypes.Product) : CommonTypes.ProductId { p.id });
    OrdersLib.listSellerOrders(orders, caller, myProductIds);
  };

  public shared ({ caller }) func updateOrderStatus(
    id : CommonTypes.OrderId,
    status : OrderTypes.OrderStatus,
  ) : async Bool {
    // Sellers can update orders containing their products; admins can update any
    let myProducts = CatalogLib.listSellerProducts(products, caller);
    let myProductIds = myProducts.map(func(p : CatalogTypes.Product) : CommonTypes.ProductId { p.id });
    let isSellerOrder = switch (OrdersLib.getOrder(orders, id)) {
      case (?o) {
        o.items.any(func(item : OrderTypes.OrderItem) : Bool {
          myProductIds.any(func(pid : CommonTypes.ProductId) : Bool { pid == item.productId });
        });
      };
      case null { false };
    };
    if (not isSellerOrder and not UsersLib.isAdmin(users, caller)) {
      Runtime.trap("Unauthorized: you can only update orders for your products");
    };
    OrdersLib.updateOrderStatus(orders, id, status, caller);
  };

  public query ({ caller }) func getSellerRevenue() : async Nat {
    let myProducts = CatalogLib.listSellerProducts(products, caller);
    let myProductIds = myProducts.map(func(p : CatalogTypes.Product) : CommonTypes.ProductId { p.id });
    OrdersLib.calculateRevenue(orders, caller, myProductIds);
  };
};
