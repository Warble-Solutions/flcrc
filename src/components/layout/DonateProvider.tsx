"use client";

import { createContext, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface DonateContextType {
  openDonate: () => void;
}

const DonateContext = createContext<DonateContextType>({ openDonate: () => {} });

export function useDonate() {
  return useContext(DonateContext);
}

export default function DonateProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleOpenDonate = () => {
    router.push("/donate");
  };

  return (
    <DonateContext.Provider value={{ openDonate: handleOpenDonate }}>
      {children}
    </DonateContext.Provider>
  );
}
