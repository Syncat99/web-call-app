import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children } : { children: React.ReactNode }) => {
    return (
        <DataContext.Provider value={{

        }}>
            {children}
        </DataContext.Provider>
    )
}


export default DataContext;