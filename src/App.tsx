import React from "react";
import CompanyLogo from "/Bastadgruppen_Logotyp_Svart_RGB.svg";
import { FileCheck, Shield, Zap, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-background-light to-brand-background-DEFAULT text-brand-primary font-sans overflow-hidden relative animate-fade-in">
      {/* Top-right company logo */}
      <img
        src={CompanyLogo}
        alt="Company Logo"
        className="absolute top-4 right-4 h-[50px] w-auto"
      />

      {/* Optional subtle pattern (kept light grey) */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23999999%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 mt-16 animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-5 leading-tight text-brand-primary">
              Generate
              <span className="block">Declaration of Conformity</span>
            </h1>
          </div>

          {/* CTA placed after hero */}
          <div className="text-center mb-12">
            <Link
              to="/form"
              state={{ resetForm: true }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 border-2 border-brand-primary rounded-md font-semibold text-brand-primary transition-all duration-300 hover:bg-brand-primary hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
            >
              <span className="relative z-10">Get Started Now</span>
              <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              {/* subtle background fade */}
              <span className="absolute inset-0 bg-brand-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-md"></span>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-background-dark rounded-md w-fit group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="text-xl font-semibold">Lightning Fast</h3>
              </div>
            </div>

            <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-background-dark rounded-md w-fit group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="text-xl font-semibold">Regulation Compliant</h3>
              </div>
            </div>

            <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-background-dark rounded-md w-fit group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="text-xl font-semibold">Professional Quality</h3>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
