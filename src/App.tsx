import React from "react";
import { Shield, Zap, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="animate-fade-in min-h-[80vh] flex flex-col justify-center items-center">
      {/* Main Content */}
      <main className="px-6 py-12 w-full">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center">
          
          {/* Hero Section */}
          <div className="text-center mb-10 animate-slide-up">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-brand-primary tracking-tight">
              Generate
              <span className="block text-brand-primary mt-2">Declaration of Conformity</span>
            </h1>
            <p className="text-base sm:text-lg text-brand-muted max-w-2xl mx-auto font-medium leading-relaxed">
              Create localized, regulation-compliant EU Declarations of Conformity for Båstadgruppen products and packaging.
            </p>
          </div>

          {/* CTA placed after hero */}
          <div className="text-center">
            <Link
              to="/form"
              state={{ resetForm: true }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-brand-primary text-white rounded-md font-bold text-sm md:text-base transition-all duration-300 hover:bg-brand-secondary hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
            >
              <span className="relative z-10">Get Started Now</span>
              <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
