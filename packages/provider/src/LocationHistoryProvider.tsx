import { createContext, useState, useEffect, FC, ReactNode } from "react";
import { useLocation } from 'react-router-dom';

export interface LocationHistoryContextProps {
  currentIndex: number;
}

export const LocationHistoryContext =
  createContext<LocationHistoryContextProps | null>(null);

export const LocationHistoryProvider: FC<{children: ReactNode}> = (
  {children}
  )=> {
    const [locationHistory, setLocationHistory] = useState<Set<number>>(new Set<number>()); 



    
    const [locationHistoryContext, setLocationHistoryContext] =
      useState<LocationHistoryContextProps>({currentIndex:0});

    const location = useLocation();

    useEffect(() => {
      let index = window.history?.state?.idx || 0
      setLocationHistory((prev) => new Set([index, ...prev]))
    },[location]);

    useEffect(() => {
      const historyValueArray = [...locationHistory.values()];
      const currentIndex = historyValueArray[0];
      setLocationHistoryContext({
        currentIndex
      })
    }, [locationHistory]);

    return (
      <LocationHistoryContext.Provider value={locationHistoryContext}>
        {children}
      </LocationHistoryContext.Provider>
    )
  } 