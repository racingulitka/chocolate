import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React,{ createContext, useState } from "react";

interface ContextType {
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
}

export const context = createContext<ContextType>({
  currency: 'RU',
  setCurrency: () => {},
});

export default function App({ Component, pageProps }: AppProps) {

  const [currency, setCurrency] = useState<string>('RU')

  return (
    <context.Provider value={{currency, setCurrency}}>
      <Component {...pageProps} />;
    </context.Provider>
  )
}
