import React from "react";
import { Outlet } from "react-router-dom";
import CompanyLogo from "/Bastadgruppen_Logotyp_Svart_RGB.svg";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-background-light to-brand-background-DEFAULT text-brand-primary font-sans relative overflow-x-hidden">
      {/* Top-right company logo, kept mounted during page transition */}
      <img
        src={CompanyLogo}
        alt="Company Logo"
        className="absolute top-4 right-4 h-[30px] md:h-[50px] w-auto z-50 pointer-events-none"
      />

      {/* Subtle pattern background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23999999%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20 pointer-events-none"></div>

      {/* Page content injected here */}
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
