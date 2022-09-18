import { createContext } from "react";

type dataContext = {
    [key: string]: any;
  };
export const NavContext = createContext<dataContext>({});