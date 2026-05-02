import List "mo:core/List";
import CatalogTypes "types/catalog";
import OrderTypes "types/orders";
import UserTypes "types/users";
import CatalogApi "mixins/catalog-api";
import OrdersApi "mixins/orders-api";
import UsersApi "mixins/users-api";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";

actor {
  // --- State ---
  let users = List.empty<UserTypes.UserProfile>();
  let sellers = List.empty<UserTypes.SellerProfile>();
  let products = List.empty<CatalogTypes.Product>();
  let orders = List.empty<OrderTypes.Order>();

  let productIdCounter = { var value : Nat = 0 };
  let orderIdCounter = { var value : Nat = 0 };

  // --- Mixin includes ---
  include MixinObjectStorage();
  include UsersApi(users, sellers);
  include CatalogApi(products, users, sellers, productIdCounter);
  include OrdersApi(orders, products, users, sellers, orderIdCounter);
};
