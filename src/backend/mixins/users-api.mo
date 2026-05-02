import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import UsersLib "../lib/users";
import UserTypes "../types/users";
import CommonTypes "../types/common";

mixin (
  users : List.List<UserTypes.UserProfile>,
  sellers : List.List<UserTypes.SellerProfile>,
) {
  public shared ({ caller }) func registerUser(name : Text, email : Text) : async Bool {
    if (caller.isAnonymous()) {
      Runtime.trap("Must be authenticated to register");
    };
    switch (UsersLib.getUser(users, caller)) {
      case (?_) { false }; // already registered
      case null {
        ignore UsersLib.registerUser(users, caller, name, email);
        true;
      };
    };
  };

  public query ({ caller }) func getMyProfile() : async ?UserTypes.UserProfile {
    UsersLib.getUser(users, caller);
  };

  public query func getUserProfile(userId : CommonTypes.UserId) : async ?UserTypes.UserProfile {
    UsersLib.getUser(users, userId);
  };

  public shared ({ caller }) func registerAsSeller(
    businessName : Text,
    description : Text,
  ) : async Bool {
    if (caller.isAnonymous()) {
      Runtime.trap("Must be authenticated to register as seller");
    };
    // Ensure user is registered
    switch (UsersLib.getUser(users, caller)) {
      case null { Runtime.trap("Must register as user first") };
      case (?_) {};
    };
    // Check if already a seller
    switch (UsersLib.getSeller(sellers, caller)) {
      case (?_) { return false }; // already registered
      case null {};
    };
    ignore UsersLib.registerSeller(sellers, caller, businessName, description);
    ignore UsersLib.updateUserRole(users, caller, #seller);
    true;
  };

  public query ({ caller }) func getMySellerProfile() : async ?UserTypes.SellerProfile {
    UsersLib.getSeller(sellers, caller);
  };

  public query func getSellerProfile(sellerId : CommonTypes.UserId) : async ?UserTypes.SellerProfile {
    UsersLib.getSeller(sellers, sellerId);
  };

  public shared ({ caller }) func approveSeller(sellerId : CommonTypes.UserId) : async Bool {
    if (not UsersLib.isAdmin(users, caller)) {
      Runtime.trap("Unauthorized: only admins can approve sellers");
    };
    let ok = UsersLib.updateSellerStatus(sellers, sellerId, #approved);
    if (ok) {
      ignore UsersLib.updateUserRole(users, sellerId, #seller);
    };
    ok;
  };

  public shared ({ caller }) func rejectSeller(sellerId : CommonTypes.UserId) : async Bool {
    if (not UsersLib.isAdmin(users, caller)) {
      Runtime.trap("Unauthorized: only admins can reject sellers");
    };
    UsersLib.updateSellerStatus(sellers, sellerId, #rejected);
  };

  public query ({ caller }) func listPendingSellers() : async [UserTypes.SellerProfile] {
    if (not UsersLib.isAdmin(users, caller)) {
      Runtime.trap("Unauthorized: only admins can list pending sellers");
    };
    sellers.filter(func(s) { s.verificationStatus == #pending }).toArray();
  };

  public query ({ caller }) func listAllUsers() : async [UserTypes.UserProfile] {
    if (not UsersLib.isAdmin(users, caller)) {
      Runtime.trap("Unauthorized: only admins can list all users");
    };
    users.toArray();
  };

  public query func isApprovedSeller(principal : CommonTypes.UserId) : async Bool {
    UsersLib.isApprovedSeller(users, sellers, principal);
  };
};
