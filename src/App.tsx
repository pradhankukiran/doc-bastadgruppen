import React from "react";
import { Shield, Zap, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="animate-fade-in">
      {/* Main Content */}
      <main className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 md:mb-12 mt-10 md:mt-16 animate-slide-up">
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-5 leading-tight text-brand-primary">
              Generate
              <span className="block whitespace-nowrap">Declaration of Conformity</span>
            </h1>
          </div>

          {/* CTA placed after hero */}
          <div className="text-center mb-8 md:mb-12">
            <Link
              to="/form"
              state={{ resetForm: true }}
              className="group relative inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 border-2 border-brand-primary rounded-md font-semibold text-brand-primary text-sm md:text-base transition-all duration-300 hover:bg-brand-primary hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
            >
              <span className="relative z-10">Get Started Now</span>
              <ArrowRight className="relative z-10 h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:translate-x-1" />
              {/* subtle background fade */}
              <span className="absolute inset-0 bg-brand-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-md"></span>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
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
