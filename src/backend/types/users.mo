import CommonTypes "common";

module {
  public type UserRole = {
    #buyer;
    #seller;
    #admin;
  };

  public type VerificationStatus = {
    #pending;
    #approved;
    #rejected;
  };

  public type UserProfile = {
    principal : CommonTypes.UserId;
    name : Text;
    email : Text;
    role : UserRole;
    createdAt : CommonTypes.Timestamp;
  };

  public type SellerProfile = {
    sellerId : CommonTypes.UserId;
    businessName : Text;
    description : Text;
    verificationStatus : VerificationStatus;
    createdAt : CommonTypes.Timestamp;
  };
};
