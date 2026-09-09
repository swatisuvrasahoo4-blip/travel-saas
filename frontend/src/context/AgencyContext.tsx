import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Agency,
  getAgencyByDomain,
} from "@/services/agencyService";

interface AgencyContextType {
  agency: Agency | null;
  loading: boolean;
}

interface AgencyProviderProps {
  children: ReactNode;
}

const AgencyContext =
  createContext<AgencyContextType>({
    agency: null,
    loading: true,
  });

export const AgencyProvider = ({
  children,
}: AgencyProviderProps) => {
  const [agency, setAgency] =
    useState<Agency | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadAgency = async () => {
      try {
        const hostname =
          window.location.hostname;

        const agencyData =
          await getAgencyByDomain(
            hostname
          );

        setAgency(agencyData);
      } catch (error) {
        console.error(
          "Unable to load agency:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadAgency();
  }, []);

  return (
    <AgencyContext.Provider
      value={{
        agency,
        loading,
      }}
    >
      {children}
    </AgencyContext.Provider>
  );
};

export const useAgency = () => {
  return useContext(AgencyContext);
};