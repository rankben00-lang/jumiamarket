import CommonTypes "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type ProductCategory = {
    #Electronics;
    #Fashion;
    #Home;
    #Sports;
    #Beauty;
    #Books;
    #Others;
  };

  public type ProductStatus = {
    #pending;
    #approved;
    #rejected;
  };

  public type Product = {
    id : CommonTypes.ProductId;
    title : Text;
    description : Text;
    price : Nat;
    category : ProductCategory;
    image : Storage.ExternalBlob;
    sellerId : CommonTypes.UserId;
    quantity : Nat;
    status : ProductStatus;
    createdAt : CommonTypes.Timestamp;
  };
};
