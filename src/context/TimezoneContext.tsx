"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getTimezoneOffsetForLocation } from "../utils/timezone";

const TimezoneContext = createContext<number | null>(null);

export const TimezoneProvider = ({ children }: { children: React.ReactNode }) => {
  const [offset, setOffset] = useState<number | null>(null);

  useEffect(() => {
    const fetchOffset = async () => {
      const cached = localStorage.getItem("timezoneOffset");

      if (cached !== null) {
        const parsed = parseInt(cached, 10);
        if (!isNaN(parsed)) {
          setOffset(parsed);
          return;
        }
      }

      const fetchedOffset = await getTimezoneOffsetForLocation("Berlin");

      if (fetchedOffset !== null) {
        localStorage.setItem("timezoneOffset", fetchedOffset.toString());
        setOffset(fetchedOffset);
      }
    };

    fetchOffset();
  }, []);

  return (
    <TimezoneContext.Provider value={offset}>
      {children}
    </TimezoneContext.Provider>
  );
};

export const useTimezoneOffset = () => useContext(TimezoneContext);
