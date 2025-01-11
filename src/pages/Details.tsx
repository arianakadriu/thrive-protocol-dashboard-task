import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Details: React.FC = () => {
  return (
    <div className="w-full">
      <Header />
      <main className="flex-grow p-6">
        <h2 className="text-xl font-semibold mb-4">Details</h2>
      </main>
      <Footer />
    </div>
  );
};

export default Details;
