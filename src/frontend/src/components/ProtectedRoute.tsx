import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ShieldAlert } from "lucide-react";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
}

export function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { isAuthenticated, isInitializing, login } = useAuth();
  const { actor, isFetching } = useActor(createActor);

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["myProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyProfile();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });

  if (isInitializing || profileLoading) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        className="flex flex-1 flex-col items-center justify-center min-h-[60vh] gap-4"
        data-ocid="protected.empty_state"
      >
        <ShieldAlert className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-display font-semibold text-foreground">
          Sign in required
        </h2>
        <p className="text-muted-foreground text-sm max-w-xs text-center">
          You need to be logged in to view this page.
        </p>
        <Button onClick={login} data-ocid="protected.login_button">
          Sign in with Internet Identity
        </Button>
      </div>
    );
  }

  if (requiredRole) {
    const userRole = profile?.role;
    const isAdmin = userRole === UserRole.admin;
    const isSeller = userRole === UserRole.seller || isAdmin;

    const hasAccess =
      requiredRole === UserRole.admin
        ? isAdmin
        : requiredRole === UserRole.seller
          ? isSeller
          : true;

    if (!hasAccess) {
      return (
        <div
          className="flex flex-1 flex-col items-center justify-center min-h-[60vh] gap-4"
          data-ocid="protected.error_state"
        >
          <ShieldAlert className="h-12 w-12 text-destructive" />
          <h2 className="text-xl font-display font-semibold text-foreground">
            Access denied
          </h2>
          <p className="text-muted-foreground text-sm max-w-xs text-center">
            You don't have the required permissions to view this page.
          </p>
        </div>
      );
    }
  }

  return <>{children}</>;
}
