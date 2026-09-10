import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

/* =========================================
   ENQUIRY SOURCE
========================================= */

export type EnquirySource =
  | "general"
  | "trip"
  | "destination"
  | "package";

/* =========================================
   ENQUIRY DATA
========================================= */

export interface EnquiryData {
  source: EnquirySource;

  destination?: string;

  packageName?: string;

  packageId?: string;

  travelDate?: string;

  travellers?: string;

  tripType?: string;
}

/* =========================================
   CONTEXT
========================================= */

interface EnquiryContextValue {
  isOpen: boolean;

  enquiryData: EnquiryData;

  openEnquiry: (
    data?: Partial<EnquiryData>
  ) => void;

  closeEnquiry: () => void;
}

const defaultEnquiryData: EnquiryData = {
  source: "general",
};

const EnquiryContext =
  createContext<
    EnquiryContextValue | undefined
  >(undefined);

/* =========================================
   PROVIDER
========================================= */

interface EnquiryProviderProps {
  children: ReactNode;
}

export const EnquiryProvider = ({
  children,
}: EnquiryProviderProps) => {
  const [
    isOpen,
    setIsOpen,
  ] = useState(false);

  const [
    enquiryData,
    setEnquiryData,
  ] = useState<EnquiryData>(
    defaultEnquiryData
  );

  /* =======================================
     OPEN
  ======================================= */

  const openEnquiry = useCallback(
    (
      data: Partial<EnquiryData> = {}
    ) => {
      setEnquiryData({
        ...defaultEnquiryData,
        ...data,
      });

      setIsOpen(true);
    },
    []
  );

  /* =======================================
     CLOSE
  ======================================= */

  const closeEnquiry =
    useCallback(() => {
      setIsOpen(false);
    }, []);

  return (
    <EnquiryContext.Provider
      value={{
        isOpen,
        enquiryData,
        openEnquiry,
        closeEnquiry,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
};

/* =========================================
   HOOK
========================================= */

export const useEnquiry = () => {
  const context =
    useContext(EnquiryContext);

  if (!context) {
    throw new Error(
      "useEnquiry must be used inside EnquiryProvider"
    );
  }

  return context;
};