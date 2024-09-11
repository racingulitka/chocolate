import { useContext } from "react";
import { context } from "@/pages/_app";

export const useCurrency = () => {
  const appContext = useContext(context);
  switch (appContext.currency) {
    case 1:{
        return '₸'
        break
    }
    case 2:{
        return '$'
        break
    }
    case 3:{
        return 'cz'
        break
    }
  }
};
