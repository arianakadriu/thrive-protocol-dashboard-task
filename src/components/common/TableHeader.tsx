import React from "react";

interface TableHeaderProps {
  column: string;
  label: string;
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  onSort: (column: string) => void;
  className?: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ column, label, sortColumn, sortDirection, onSort, className = '' }) => {
  return (
    <th
      className={`px-6 py-3 cursor-pointer ${className}`}
      onClick={() => onSort(column)}
    >
      <div className="flex">
        {label}
        {sortColumn === column && (
          <i className={`bi bi-arrow-${sortDirection === "asc" ? "up" : "down"} ms-2`}></i>
        )}
      </div>
    </th>
  );
};

export default TableHeader;
