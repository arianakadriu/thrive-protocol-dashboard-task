import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Dashboard: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex-grow p-6">
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
