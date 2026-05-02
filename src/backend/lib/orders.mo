import List "mo:core/List";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import OrderTypes "../types/orders";
import CommonTypes "../types/common";

module {
  public type Order = OrderTypes.Order;
  public type OrderItem = OrderTypes.OrderItem;
  public type OrderStatus = OrderTypes.OrderStatus;

  public func createOrder(
    orders : List.List<Order>,
    nextId : Nat,
    buyerId : CommonTypes.UserId,
    items : [OrderItem],
    deliveryAddress : Text,
  ) : Order {
    let total = items.foldLeft(0, func(acc : Nat, item : OrderItem) : Nat {
      acc + item.priceSnapshot * item.quantity;
    });
    let order : Order = {
      id = nextId;
      buyerId;
      items;
      total;
      deliveryAddress;
      status = #pending;
      createdAt = Time.now();
    };
    orders.add(order);
    order;
  };

  public func getOrder(
    orders : List.List<Order>,
    id : CommonTypes.OrderId,
  ) : ?Order {
    orders.find(func(o) { o.id == id });
  };

  public func listBuyerOrders(
    orders : List.List<Order>,
    buyerId : CommonTypes.UserId,
  ) : [Order] {
    orders.filter(func(o) { Principal.equal(o.buyerId, buyerId) }).toArray();
  };

  public func listSellerOrders(
    orders : List.List<Order>,
    _sellerId : CommonTypes.UserId,
    productIds : [CommonTypes.ProductId],
  ) : [Order] {
    orders.filter(func(o) {
      o.items.any(func(item : OrderItem) : Bool {
        productIds.any(func(pid : CommonTypes.ProductId) : Bool { pid == item.productId });
      });
    }).toArray();
  };

  public func updateOrderStatus(
    orders : List.List<Order>,
    id : CommonTypes.OrderId,
    status : OrderStatus,
    _callerId : CommonTypes.UserId,
  ) : Bool {
    var found = false;
    orders.mapInPlace(func(o) {
      if (o.id == id) {
        found := true;
        { o with status };
      } else { o };
    });
    found;
  };

  public func calculateRevenue(
    orders : List.List<Order>,
    sellerId : CommonTypes.UserId,
    productIds : [CommonTypes.ProductId],
  ) : Nat {
    orders.foldLeft(0, func(acc : Nat, o : Order) : Nat {
      if (o.status == #cancelled) { return acc };
      let sellerTotal = o.items.foldLeft(0, func(sum : Nat, item : OrderItem) : Nat {
        if (productIds.any(func(pid : CommonTypes.ProductId) : Bool { pid == item.productId })) {
          sum + item.priceSnapshot * item.quantity;
        } else { sum };
      });
      acc + sellerTotal;
    });
  };
};
