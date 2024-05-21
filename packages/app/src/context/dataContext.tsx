import axios from "axios";
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

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const result = await axios.post(
          "http://localhost:3500/api/tokenCheck",
          {},
          {
            withCredentials: true,
          },
        );
        if (result.status === 200) {
          setLoggedIn(true);
        }
      } catch (err) {
        console.log(err);
        setLoggedIn(false);
      }
    };

    verifyToken();
  }, []);

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
