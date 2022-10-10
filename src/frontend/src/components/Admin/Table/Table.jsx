import React from "react";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

export const Table = () => {
  return (
    <table className="min-w-max w-full table-auto overflow-x-scroll mb-12">
      <TableHead />
      <tbody className="text-gray-600 text-sm font-light">
        <TableRow />
        <TableRow alt={true} />
        <TableRow />
        <TableRow alt={true} />
        <TableRow />
        <TableRow alt={true} />
      </tbody>
    </table>
  );
};
