import {
  createContext,
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

export interface dataProps {
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const DataContext = createContext<dataProps>({
  loggedIn: false,
  setLoggedIn() {},
});

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  return (
    <DataContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
