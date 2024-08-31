import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React,{ createContext, useState } from "react";
import i18n from 'i18next'
import { initReactI18next } from "react-i18next";
import {resources} from '@/services/resources'

interface ContextType {
  currency: number;
  setCurrency: React.Dispatch<React.SetStateAction<number>>;
}

export const context = createContext<ContextType>({
  currency: 1,
  setCurrency: () => {},
});

i18n.use(initReactI18next).init({
  resources,
  lng:"ru"
})

export default function App({ Component, pageProps }: AppProps) {

  const [currency, setCurrency] = useState<number>(1)

  return (
    <context.Provider value={{currency, setCurrency}}>
      <Component {...pageProps} />
    </context.Provider>
  )
}
