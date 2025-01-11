import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
