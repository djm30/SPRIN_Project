import React from "react";
import Stat from "../components/Admin/Stat";
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
        <div className="flex justify-center">
          <div className="mt-10 grid grid-cols-2 gap-2 sm:gap-8 lg:grid-cols-4 lg:gap-2 xl:gap-10">
            <Stat />
            <Stat />
            <Stat />
            <Stat />
          </div>
        </div>
        {/* APPROVE USERS TABLE */}
        <h3 className="mt-10 font-display text-darkblue-100 text-2xl">
          Users awaiting approval
        </h3>
        <div></div>
        {/* USERS TABLE */}
        <h3 className="mt-10 font-display text-darkblue-100 text-2xl">
          Manage Registered Users
        </h3>
        <div></div>
      </ContentContainer>
    </div>
  );
};

export default Admin;
