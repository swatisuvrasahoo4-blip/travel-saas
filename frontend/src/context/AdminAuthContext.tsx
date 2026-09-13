"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  AdminAgency,
  AdminUser,
  getCurrentAdmin,
  loginAdmin,
  logoutAdmin,
} from "@/services/adminAuthService";

interface LoginInput {
  email: string;
  password: string;
}

interface AdminAuthContextValue {
  admin: AdminUser | null;
  agency: AdminAgency | null;
  csrfToken: string;
  isLoading: boolean;
  isAuthenticated: boolean;

  login: (
    input: LoginInput
  ) => Promise<void>;

  logout: () => Promise<void>;

  refreshSession: () => Promise<void>;
}

const AdminAuthContext =
  createContext<
    AdminAuthContextValue | undefined
  >(undefined);

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider = ({
  children,
}: AdminAuthProviderProps) => {
  const [
    admin,
    setAdmin,
  ] = useState<AdminUser | null>(
    null
  );

  const [
    agency,
    setAgency,
  ] = useState<AdminAgency | null>(
    null
  );

  const [
    csrfToken,
    setCsrfToken,
  ] = useState("");

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const refreshSession =
    async () => {
      try {
        const response =
          await getCurrentAdmin();

        if (
          response.success &&
          response.admin &&
          response.agency
        ) {
          setAdmin(
            response.admin
          );

          setAgency(
            response.agency
          );

          setCsrfToken(
            response.csrfToken ||
              ""
          );

          return;
        }

        setAdmin(null);
        setAgency(null);
        setCsrfToken("");
      } catch {
        setAdmin(null);
        setAgency(null);
        setCsrfToken("");
      }
    };

  const login = async (
    input: LoginInput
  ) => {
    const hostname =
      window.location.hostname;

    const response =
      await loginAdmin({
        email: input.email,
        password:
          input.password,
        hostname,
      });

    if (
      !response.success ||
      !response.admin ||
      !response.agency
    ) {
      throw new Error(
        response.message ||
          "Unable to login."
      );
    }

    setAdmin(
      response.admin
    );

    setAgency(
      response.agency
    );

    setCsrfToken(
      response.csrfToken ||
        ""
    );
  };

  const logout =
    async () => {
      try {
        await logoutAdmin();
      } finally {
        setAdmin(null);
        setAgency(null);
        setCsrfToken("");
      }
    };

  useEffect(() => {
    const checkSession =
      async () => {
        try {
          await refreshSession();
        } finally {
          setIsLoading(
            false
          );
        }
      };

    void checkSession();
  }, []);

  const isAuthenticated =
    Boolean(admin);

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        agency,
        csrfToken,
        isLoading,
        isAuthenticated,
        login,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth =
  () => {
    const context =
      useContext(
        AdminAuthContext
      );

    if (!context) {
      throw new Error(
        "useAdminAuth must be used inside AdminAuthProvider"
      );
    }

    return context;
  };