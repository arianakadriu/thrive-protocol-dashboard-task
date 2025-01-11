import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const redirectToDashboard = () => {
    navigate("/dashboard");
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 px-4 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to the Rick and Morty Dashboard
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Explore the world of Rick and Morty episodes! Search, filter, and
            view episode details in a responsive dashboard. Get started by
            clicking below to access the full episode list.
          </p>
          <Button title="Go to Dashboard" onClick={redirectToDashboard} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
