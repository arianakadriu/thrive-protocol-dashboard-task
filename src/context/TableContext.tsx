import React, { createContext, useContext, useState } from "react";

interface ITableContext {
  deleteRows: (ids: number[]) => void;
  favoriteRowsAction: (ids: number[]) => void;
  favoriteRows: number[];
}

interface IProps {
  children: React.ReactNode;
}

const TableContext = createContext<ITableContext | undefined>(undefined);

export const useTableContext = (): ITableContext => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
};

export const TableProvider: React.FC<IProps> = ({ children }) => {
  const [favoriteRows, setFavoriteRows] = useState<number[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedTableRows, setSelectedTableRows] = useState<number[]>([]);

  const deleteRows = (ids: number[]) => {
    setSelectedTableRows((prev) => {
      return prev.filter((id) => !ids.includes(id));
    });
  };

  const favoriteRowsAction = (ids: number[]) => {
    setFavoriteRows((prev) => {
      const updatedFavorites = new Set(prev);
      ids.forEach((id) => {
        if (updatedFavorites.has(id)) {
          updatedFavorites.delete(id);
        } else {
          updatedFavorites.add(id); 
        }
      });
      return Array.from(updatedFavorites);
    });
  };

  return (
    <TableContext.Provider value={{ deleteRows, favoriteRowsAction, favoriteRows }}>
      {children}
    </TableContext.Provider>
  );
};
