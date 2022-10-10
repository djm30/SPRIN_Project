import React from "react";

const TableHead = () => {
  return (
    <thead className="rounded-[10px]">
      <tr className="bg-darkblue-100 text-white uppercase text-base leading-normal p-4 rounded-2xl first:rounded-tl-lg last:rounded-tr-lg">
        <th className="py-4 px-8 text-left rounded-tl-xl">Email</th>
        <th className="py-4 px-8 text-left">Name</th>
        <th className="py-4 px-8 text-center">Status</th>
        <th className="py-4 px-8 text-center rounded-tr-xl">Actions</th>
      </tr>
    </thead>
  );
};

export default TableHead;
