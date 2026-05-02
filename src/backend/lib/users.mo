import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import UserTypes "../types/users";
import CommonTypes "../types/common";

module {
  public type UserProfile = UserTypes.UserProfile;
  public type SellerProfile = UserTypes.SellerProfile;
  public type UserRole = UserTypes.UserRole;
  public type VerificationStatus = UserTypes.VerificationStatus;

  public func registerUser(
    users : List.List<UserProfile>,
    principal : CommonTypes.UserId,
    name : Text,
    email : Text,
  ) : UserProfile {
    let profile : UserProfile = {
      principal;
      name;
      email;
      role = #buyer;
      createdAt = Time.now();
    };
    users.add(profile);
    profile;
  };

  public func getUser(
    users : List.List<UserProfile>,
    principal : CommonTypes.UserId,
  ) : ?UserProfile {
    users.find(func(u) { Principal.equal(u.principal, principal) });
  };

  public func updateUserRole(
    users : List.List<UserProfile>,
    principal : CommonTypes.UserId,
    role : UserRole,
  ) : Bool {
    var found = false;
    users.mapInPlace(func(u) {
      if (Principal.equal(u.principal, principal)) {
        found := true;
        { u with role };
      } else { u };
    });
    found;
  };

  public func registerSeller(
    sellers : List.List<SellerProfile>,
    sellerId : CommonTypes.UserId,
    businessName : Text,
    description : Text,
  ) : SellerProfile {
    let profile : SellerProfile = {
      sellerId;
      businessName;
      description;
      verificationStatus = #pending;
      createdAt = Time.now();
    };
    sellers.add(profile);
    profile;
  };

  public func getSeller(
    sellers : List.List<SellerProfile>,
    sellerId : CommonTypes.UserId,
  ) : ?SellerProfile {
    sellers.find(func(s) { Principal.equal(s.sellerId, sellerId) });
  };

  public func updateSellerStatus(
    sellers : List.List<SellerProfile>,
    sellerId : CommonTypes.UserId,
    status : VerificationStatus,
  ) : Bool {
    var found = false;
    sellers.mapInPlace(func(s) {
      if (Principal.equal(s.sellerId, sellerId)) {
        found := true;
        { s with verificationStatus = status };
      } else { s };
    });
    found;
  };

  public func isAdmin(
    users : List.List<UserProfile>,
    principal : CommonTypes.UserId,
  ) : Bool {
    switch (users.find(func(u) { Principal.equal(u.principal, principal) })) {
      case (?u) { u.role == #admin };
      case null { false };
    };
  };

  public func isApprovedSeller(
    users : List.List<UserProfile>,
    sellers : List.List<SellerProfile>,
    principal : CommonTypes.UserId,
  ) : Bool {
    switch (users.find(func(u) { Principal.equal(u.principal, principal) })) {
      case (?u) {
        if (u.role != #seller) { return false };
        switch (sellers.find(func(s) { Principal.equal(s.sellerId, principal) })) {
          case (?s) { s.verificationStatus == #approved };
          case null { false };
        };
      };
      case null { false };
    };
  };
};
