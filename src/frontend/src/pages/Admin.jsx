import React from "react";
import Stat from "../components/Admin/Stat";
import { Table } from "../components/Admin/Table/Table";
import Card from "../components/UI/Card";
import ContentContainer from "../components/UI/ContentContainer";
import Heading from "../components/UI/Heading";
import Navbar from "../components/UI/Navbar/Navbar";

const Admin = () => {
  return (
    <div className="min-h-screen">
      <Navbar transparent={false} />
      <ContentContainer>
        <Heading>Admin Page</Heading>
        {/* STATS */}
        <h3 className="mt-10 mb-4 font-display text-darkblue-100 text-2xl">
          Monthly stats
        </h3>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 gap-2 sm:gap-8 lg:grid-cols-4 lg:gap-2 xl:gap-10">
            <Stat />
            <Stat />
            <Stat />
            <Stat />
          </div>
        </div>
        {/* APPROVE USERS TABLE */}
        <h3 className="mt-10 mb-10 font-display text-darkblue-100 text-2xl">
          User Management
        </h3>

        <div className="overflow-x-scroll">
          <Table />
        </div>
      </ContentContainer>
    </div>
  );
};

export default Admin;
