import {
  ReactNode,
  useEffect,
} from "react";
import {
  useRouter,
} from "next/router";

import {
  useAdminAuth,
} from "@/context/AdminAuthContext";

interface ProtectedAdminRouteProps {
  children: ReactNode;
}

const ProtectedAdminRoute = ({
  children,
}: ProtectedAdminRouteProps) => {
  const router = useRouter();

  const {
    isAuthenticated,
    isLoading,
  } = useAdminAuth();

  useEffect(() => {
    if (
      !isLoading &&
      !isAuthenticated
    ) {
      void router.replace(
        "/admin/login"
      );
    }
  }, [
    isAuthenticated,
    isLoading,
    router,
  ]);

  if (
    isLoading ||
    !isAuthenticated
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f8fb]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#d7e7ed] border-t-[#06364a]" />

          <p className="text-sm font-medium text-[#52727f]">
            Loading admin portal...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;