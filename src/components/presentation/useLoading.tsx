'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type LoadingType = 'spinner' | 'progress' | 'logo' | 'dots';

interface LoadingContextProps {
  isLoading: boolean;
  type: LoadingType;
  show: (type?: LoadingType) => void;
  hide: () => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<LoadingType>('spinner');

  const show = (newType: LoadingType = 'spinner') => {
    setType(newType);
    setIsLoading(true);
  };

  const hide = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, type, show, hide }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}