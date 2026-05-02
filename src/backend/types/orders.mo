import CommonTypes "common";

module {
  public type OrderStatus = {
    #pending;
    #processing;
    #shipped;
    #delivered;
    #cancelled;
  };

  public type OrderItem = {
    productId : CommonTypes.ProductId;
    quantity : Nat;
    priceSnapshot : Nat;
  };

  public type Order = {
    id : CommonTypes.OrderId;
    buyerId : CommonTypes.UserId;
    items : [OrderItem];
    total : Nat;
    deliveryAddress : Text;
    status : OrderStatus;
    createdAt : CommonTypes.Timestamp;
  };
};
