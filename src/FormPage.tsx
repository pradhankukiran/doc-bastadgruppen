import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CompanyLogo from "/Bastadgruppen_Logotyp_Svart_RGB.svg";
import { ArrowRight, ArrowLeft, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  "English",
  "Swedish",
  "Norwegian",
  "Danish",
  "Finnish",
  "Polish",
  "Estonian",
  "German",
  "French",
  "Italian",
  "Dutch",
  "Portuguese",
  "Latvian",
  "Icelandic",
  "Spanish",
  "Slovak",
  "Slovenian",
  "Czech",
  "Hungarian",
  "Lithuanian",
  "Greek",
  "Croatian",
];

const brands = [
  { name: "Guardio", logo: "/Guardio.svg" },
  { name: "Matterhorn", logo: "/Matterhorn.svg" },
  { name: "Monitor", logo: "/Monitor.svg" },
  { name: "Top Swede", logo: "/Top_Swede.svg" },
  { name: "South West", logo: "/South_West.svg" },
];

const notifiedBodies = [
  {
    id: "sgs_fimko",
    name: "SGS Fimko Ltd.",
    number: "0598",
    address: "Takomotie 8",
    zipCode: "FI - 00380",
    country: "Helsinki",
  },
  {
    id: "inspec_international_bv",
    name: "INSPEC International B.V.",
    number: "2849",
    address: "Beechavenue 54, 1119 PW",
    zipCode: "Schiphol-Rijk",
    country: "Netherlands",
  },
  {
    id: "ricotest",
    name: "RICOTEST",
    number: "0498",
    address: "Via Tione, 9",
    zipCode: "37010 - Pastrengo (VR)",
    country: "Italy",
  },
  {
    id: "tuv_rheinland_lga_products_gmbh",
    name: "TÜV Rheinland LGA Products GmbH",
    number: "0197",
    address: "Tillystraße 2",
    zipCode: "90431 Nürnberg",
    country: "Germany",
  },
  {
    id: "ccqs_certification_services_limited",
    name: "CCQS Certification Services Limited",
    number: "2834",
    address:
      "Block 1 Blanchardstown Corporate Park, Ballycoolin Road, Blanchardstown, Dublin 15 D15 AKK1",
    zipCode: "Dublin",
    country: "Ireland",
  },
  {
    id: "din_certco_gesellschaft_fur_konformitatsbewertung_mbh",
    name: "DIN CERTCO GESELLSCHAFT FÜR KONFORMITÄTSBEWERTUNG MBH",
    number: "0196",
    address: "Alboinstraße 56",
    zipCode: "12103 BERLIN",
    country: "Germany",
  },
];

const categoryClasses = ["Class I", "Class II", "Class III"];
const moduleTypes = ["Module C2", "Module D"];

const steps = [
  "Select Languages",
  "Enter Product Information",
  "Configure Manufacturer Details",
  "Add Notifed Body",
  "Input Compliance Information",
];

function FormPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // If navigation originated from the Home page (Get Started button), clear any
  // previously stored form progress so that the user starts fresh on step 0.
  if ((location.state as any)?.resetForm) {
    try {
      localStorage.removeItem("formData");
    } catch (err) {
      // Ignore errors – not critical for the UX
    }
  }

  const loadState = () => {
    try {
      const serializedState = localStorage.getItem("formData");
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      console.error("Could not load state from local storage", err);
      return undefined;
    }
  };

  const savedState = (location.state as any)?.resetForm
    ? undefined
    : loadState();

  const [selected, setSelected] = useState<string[]>(
    savedState?.selected || []
  );
  const [productInfo, setProductInfo] = useState<{
    name: string;
    productNumber: string;
    categoryClass: string;
    certificateNo: string;
    moduleType: string;
  }>(
    savedState?.productInfo || {
      name: "",
      productNumber: "",
      categoryClass: "",
      certificateNo: "",
      moduleType: "",
    }
  );
  const [complianceInfo, setComplianceInfo] = useState<{
    euLegislation: string[];
    harmonisedStandards: string[];
  }>(
    savedState?.complianceInfo || {
      euLegislation: [],
      harmonisedStandards: [],
    }
  );
  const [currentLegislation, setCurrentLegislation] = useState("");
  const [currentStandard, setCurrentStandard] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string>(
    savedState?.selectedBrands || ""
  );
  const [selectedNotifiedBodies, setSelectedNotifiedBodies] = useState<string>(
    savedState?.selectedNotifiedBodies || ""
  );
  const initialStep = (location.state as any)?.resetForm
    ? 0
    : savedState?.step || 0;
  const [[step, direction], setStep] = useState([initialStep, 0]);

  useEffect(() => {
    const stateToSave = {
      selected,
      productInfo,
      complianceInfo,
      selectedBrands,
      selectedNotifiedBodies,
      step: step,
    };
    try {
      const serializedState = JSON.stringify(stateToSave);
      localStorage.setItem("formData", serializedState);
    } catch (err) {
      // Ignore write errors
    }
  }, [
    selected,
    productInfo,
    complianceInfo,
    selectedBrands,
    selectedNotifiedBodies,
    step,
  ]);

  const isStepComplete = () => {
    const currentStep = step;
    switch (currentStep) {
      case 0:
        return selected.length > 0;
      case 1:
        if (
          !productInfo.name ||
          !productInfo.productNumber ||
          !productInfo.categoryClass
        ) {
          return false;
        }
        if (
          (productInfo.categoryClass === "Class II" ||
            productInfo.categoryClass === "Class III") &&
          !productInfo.certificateNo
        ) {
          return false;
        }
        if (
          productInfo.categoryClass === "Class III" &&
          !productInfo.moduleType
        ) {
          return false;
        }
        return true;
      case 2:
        return selectedBrands !== "";
      case 3:
        // Skip validation for Notified Body step if Category Class is "Class I"
        if (productInfo.categoryClass === "Class I") {
          return true;
        }
        return selectedNotifiedBodies !== "";
      case 4:
        return (
          complianceInfo.euLegislation.length > 0 &&
          complianceInfo.harmonisedStandards.length > 0 &&
          currentLegislation.trim() === "" &&
          currentStandard.trim() === ""
        );
      default:
        return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedBodyDetails = notifiedBodies.find(
      (body) => body.id === selectedNotifiedBodies
    );

    const brandDetails = brands.find((brand) => brand.name === selectedBrands);

    const selectedBrandDetails = brandDetails
      ? {
          name: brandDetails.name,
          logo: "", // This is unused by the template but kept for compatibility with DocPdf
        }
      : undefined;

    const formData = {
      selectedLanguages: selected,
      productInfo,
      selectedBrands,
      selectedBrandDetails,
      selectedBodyDetails,
      complianceInfo,
      companyLogoUrl: "", // This is unused by the template but kept for compatibility with DocPdf
    };

    navigate("/preview", { state: { formData } });
  };

  const allSelected = selected.length === languages.length;

  const toggleLanguage = (lang: string) => {
    setSelected((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const toggleSelectAll = () => {
    setSelected(allSelected ? [] : [...languages]);
  };

  const toggleBrand = (brandName: string) => {
    setSelectedBrands((prev) => (prev === brandName ? "" : brandName));
  };

  const toggleNotifiedBody = (bodyId: string) => {
    setSelectedNotifiedBodies((prev) => (prev === bodyId ? "" : bodyId));
  };

  const handleAddLegislation = () => {
    if (
      currentLegislation.trim() &&
      !complianceInfo.euLegislation.includes(currentLegislation.trim())
    ) {
      setComplianceInfo((prev) => ({
        ...prev,
        euLegislation: [...prev.euLegislation, currentLegislation.trim()],
      }));
      setCurrentLegislation("");
    }
  };

  const handleRemoveLegislation = (itemToRemove: string) => {
    setComplianceInfo((prev) => ({
      ...prev,
      euLegislation: prev.euLegislation.filter((item) => item !== itemToRemove),
    }));
  };

  const handleAddStandard = () => {
    if (
      currentStandard.trim() &&
      !complianceInfo.harmonisedStandards.includes(currentStandard.trim())
    ) {
      setComplianceInfo((prev) => ({
        ...prev,
        harmonisedStandards: [
          ...prev.harmonisedStandards,
          currentStandard.trim(),
        ],
      }));
      setCurrentStandard("");
    }
  };

  const handleRemoveStandard = (itemToRemove: string) => {
    setComplianceInfo((prev) => ({
      ...prev,
      harmonisedStandards: prev.harmonisedStandards.filter(
        (item) => item !== itemToRemove
      ),
    }));
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      let nextStep = step + 1;
      // Skip Notified Body step (step 3) if Category Class is "Class I"
      if (nextStep === 3 && productInfo.categoryClass === "Class I") {
        nextStep = 4;
      }
      setStep([nextStep, 1]);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      let prevStep = step - 1;
      // Skip Notified Body step (step 3) when going back if Category Class is "Class I"
      if (prevStep === 3 && productInfo.categoryClass === "Class I") {
        prevStep = 2;
      }
      setStep([prevStep, -1]);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        const numSelected = selected.length;
        const selectionText =
          numSelected === 0
            ? "No Languages Selected"
            : numSelected === 1
            ? "1 Language Selected"
            : `${numSelected} Languages Selected`;

        return (
          <>
            <div className="grid grid-cols-6 gap-4">
              {languages.map((item) => {
                const isChecked = selected.includes(item);

                return (
                  <div key={item} className="relative">
                    <input
                      type="checkbox"
                      id={item}
                      checked={isChecked}
                      onChange={() => toggleLanguage(item)}
                      className="peer absolute opacity-0 h-0 w-0"
                    />
                    <label
                      htmlFor={item}
                      className="cursor-pointer flex items-center justify-center text-center w-full h-full p-4 border-2 border-brand-background-dark rounded-md text-sm font-medium text-brand-primary transition-all duration-250 ease-corporate hover:bg-brand-primary hover:text-white peer-checked:bg-brand-primary peer-checked:text-white peer-checked:border-brand-primary"
                    >
                      {item}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="relative">
                <input
                  type="checkbox"
                  id="select-all"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="peer absolute opacity-0 h-0 w-0"
                />
                <label
                  htmlFor="select-all"
                  className="cursor-pointer flex items-center justify-center text-center px-6 py-3 border-2 border-brand-background-dark rounded-md text-sm font-medium text-brand-primary transition-all duration-250 ease-corporate hover:bg-brand-primary hover:text-white peer-checked:bg-brand-primary peer-checked:text-white peer-checked:border-brand-primary"
                >
                  Select All
                </label>
              </div>
              <div className="text-sm font-medium text-brand-muted">
                {selectionText}
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <label
                  className="block text-sm font-medium mb-1 text-brand-primary"
                  htmlFor="productName"
                >
                  Product Name
                </label>
                <input
                  id="productName"
                  type="text"
                  value={productInfo.name}
                  onChange={(e) =>
                    setProductInfo({ ...productInfo, name: e.target.value })
                  }
                  className="w-full border-2 border-brand-background-dark rounded-md p-2 focus:ring-brand-accent focus:border-brand-accent form-input transition-all duration-250"
                />
              </div>
              <div className="flex-1">
                <label
                  className="block text-sm font-medium mb-1 text-brand-primary"
                  htmlFor="productNumber"
                >
                  Product Number
                </label>
                <input
                  id="productNumber"
                  type="text"
                  value={productInfo.productNumber}
                  onChange={(e) =>
                    setProductInfo({
                      ...productInfo,
                      productNumber: e.target.value,
                    })
                  }
                  placeholder="Enter a product number"
                  className="w-full border-2 border-brand-background-dark rounded-md p-2 focus:ring-brand-accent focus:border-brand-accent form-input transition-all duration-250"
                />
              </div>
            </div>
            <div className="flex items-end gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-brand-primary">
                  Category Class
                </label>
                <div className="flex gap-4">
                  {categoryClasses.map((category) => (
                    <div key={category} className="relative">
                      <input
                        type="radio"
                        id={`category-${category}`}
                        name="categoryClass"
                        value={category}
                        checked={productInfo.categoryClass === category}
                        onChange={(e) => {
                          const newCategoryClass = e.target.value;
                          setProductInfo((prev) => ({
                            ...prev,
                            categoryClass: newCategoryClass,
                            certificateNo:
                              newCategoryClass === "Class I"
                                ? ""
                                : prev.certificateNo,
                            moduleType:
                              newCategoryClass === "Class III"
                                ? prev.moduleType
                                : "",
                          }));
                        }}
                        className="peer absolute opacity-0 h-0 w-0"
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="cursor-pointer flex items-center justify-center text-center px-6 py-3 border-2 border-brand-background-dark rounded-md text-sm font-medium text-brand-primary transition-all duration-250 ease-corporate hover:bg-brand-primary hover:text-white peer-checked:bg-brand-primary peer-checked:text-white peer-checked:border-brand-primary"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {(productInfo.categoryClass === "Class II" ||
                productInfo.categoryClass === "Class III") && (
                <div className="flex-1">
                  <label
                    className="block text-sm font-medium mb-1 text-brand-primary"
                    htmlFor="certificateNo"
                  >
                    Certificate No.
                  </label>
                  <input
                    id="certificateNo"
                    type="text"
                    value={productInfo.certificateNo}
                    onChange={(e) =>
                      setProductInfo({
                        ...productInfo,
                        certificateNo: e.target.value,
                      })
                    }
                    className="w-full border-2 border-brand-background-dark rounded-md p-2 focus:ring-brand-accent focus:border-brand-accent form-input transition-all duration-250"
                  />
                </div>
              )}
            </div>
            {productInfo.categoryClass === "Class III" && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1 text-brand-primary">
                  Module Type
                </label>
                <div className="flex gap-4">
                  {moduleTypes.map((module) => (
                    <div key={module} className="relative">
                      <input
                        type="radio"
                        id={`module-${module}`}
                        name="moduleType"
                        value={module}
                        checked={productInfo.moduleType === module}
                        onChange={(e) =>
                          setProductInfo({
                            ...productInfo,
                            moduleType: e.target.value,
                          })
                        }
                        className="peer absolute opacity-0 h-0 w-0"
                      />
                      <label
                        htmlFor={`module-${module}`}
                        className="cursor-pointer flex items-center justify-center text-center px-6 py-3 border-2 border-brand-background-dark rounded-md text-sm font-medium text-brand-primary transition-all duration-250 ease-corporate hover:bg-brand-primary hover:text-white peer-checked:bg-brand-primary peer-checked:text-white peer-checked:border-brand-primary"
                      >
                        {module}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {brands.map((brand) => (
                  <div key={brand.name}>
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={`brand-${brand.name}`}
                        checked={selectedBrands === brand.name}
                        onChange={() => toggleBrand(brand.name)}
                        className="peer absolute opacity-0 h-0 w-0"
                      />
                      <label
                        htmlFor={`brand-${brand.name}`}
                        className="cursor-pointer flex flex-col items-center justify-center text-center w-full h-full p-4 border-2 border-brand-background-dark rounded-md text-sm font-medium text-brand-primary transition-all duration-250 ease-corporate hover:shadow-card hover:border-brand-secondary peer-checked:shadow-card peer-checked:border-brand-primary"
                      >
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="h-20 w-20 object-contain"
                        />
                      </label>
                    </div>
                    <p className="mt-2 text-sm font-medium text-center text-brand-primary">
                      {brand.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {/* <h3 className="text-lg font-medium text-black mb-2">Manufacturer Address</h3> */}
              <div className="bg-brand-subtle p-4 rounded-md border-2 border-brand-background-dark text-brand-secondary">
                <p className="font-semibold">Båstadgruppen AB</p>
                <p>Fraktgatan 1</p>
                <p>262 73 Ängelholm</p>
                <p>Sweden</p>
              </div>
            </div>
          </div>
        );
      case 3:
        const selectedBody = notifiedBodies.find(
          (body) => body.id === selectedNotifiedBodies
        );
        return (
          <div className="space-y-4">
            {/* <h3 className="text-lg font-medium text-black mb-4">
              Select Notified Bodies
            </h3> */}
            <div className="grid grid-cols-2 gap-4">
              {notifiedBodies.map((body) => (
                <div key={body.id} className="relative">
                  <input
                    type="checkbox"
                    id={`body-${body.id}`}
                    checked={selectedNotifiedBodies === body.id}
                    onChange={() => toggleNotifiedBody(body.id)}
                    className="peer absolute opacity-0 h-0 w-0"
                  />
                  <label
                    htmlFor={`body-${body.id}`}
                    className="cursor-pointer flex items-center justify-center text-center w-full h-full p-4 border-2 border-brand-background-dark rounded-md text-sm font-medium text-brand-primary transition-all duration-250 ease-corporate hover:bg-brand-primary hover:text-white peer-checked:bg-brand-primary peer-checked:text-white peer-checked:border-brand-primary"
                  >
                    {body.name}
                  </label>
                </div>
              ))}
            </div>
            {selectedBody && (
              <div className="mt-4 bg-brand-subtle p-4 rounded-md border-2 border-brand-background-dark text-brand-secondary">
                <p className="font-semibold">{selectedBody.name}</p>
                <p>
                  {`${selectedBody.address}, ${selectedBody.zipCode}, ${selectedBody.country}`}
                </p>
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            {/* Relevant EU Legislation */}
            <div>
              <label
                className="block text-sm font-medium mb-1 text-brand-primary"
                htmlFor="euLegislation"
              >
                Relevant EU Legislation
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="euLegislation"
                  type="text"
                  value={currentLegislation}
                  onChange={(e) => setCurrentLegislation(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddLegislation();
                    }
                  }}
                  placeholder="Enter EU Legislation"
                  className="w-full border-2 border-brand-background-dark rounded-md p-2 focus:ring-brand-accent focus:border-brand-accent form-input transition-all duration-250"
                />
                <button
                  type="button"
                  onClick={handleAddLegislation}
                  className="px-4 py-2 bg-brand-primary text-white rounded-md font-semibold hover:bg-brand-secondary transition-colors duration-250"
                >
                  Add
                </button>
              </div>
              {complianceInfo.euLegislation.length > 0 && (
                <div className="mt-2 space-y-2">
                  <h3 className="text-sm font-medium text-brand-muted">
                    Added Legislations:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {complianceInfo.euLegislation.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 bg-brand-background-dark rounded-full px-3 py-1 text-sm font-medium"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveLegislation(item)}
                          className="text-brand-muted hover:text-brand-error"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Harmonised Standards */}
            <div>
              <label
                className="block text-sm font-medium mb-1 text-brand-primary"
                htmlFor="harmonisedStandards"
              >
                Harmonised Standards
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="harmonisedStandards"
                  type="text"
                  value={currentStandard}
                  onChange={(e) => setCurrentStandard(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddStandard();
                    }
                  }}
                  placeholder="e.g. EN ISO 20345:2011"
                  className="w-full border-2 border-brand-background-dark rounded-md p-2 focus:ring-brand-accent focus:border-brand-accent form-input transition-all duration-250"
                />
                <button
                  type="button"
                  onClick={handleAddStandard}
                  className="px-4 py-2 bg-brand-primary text-white rounded-md font-semibold hover:bg-brand-secondary transition-colors duration-250"
                >
                  Add
                </button>
              </div>
              {complianceInfo.harmonisedStandards.length > 0 && (
                <div className="mt-2 space-y-2">
                  <h3 className="text-sm font-medium text-brand-muted">
                    Added Standards:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {complianceInfo.harmonisedStandards.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 bg-brand-background-dark rounded-full px-3 py-1 text-sm font-medium"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveStandard(item)}
                          className="text-brand-muted hover:text-brand-error"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-background-light to-brand-background-DEFAULT text-brand-primary font-sans relative animate-fade-in">
      {/* Top-right company logo */}
      <img
        src={CompanyLogo}
        alt="Company Logo"
        className="absolute top-4 right-4 h-[50px] w-auto"
      />

      <main className="relative z-10 px-6 py-12 pb-26">
        <div
          className={`mx-auto transition-all duration-500 ease-in-out max-w-3xl select-none`}
        >
          <h1 className="text-2xl font-bold mb-8 text-center text-brand-primary">
            {steps[step]}
          </h1>

          <div className="relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "tween", ease: "easeInOut", duration: 0 },
                  opacity: { duration: 0 },
                }}
                className="w-full p-4"
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      <form
        className="fixed bottom-0 left-0 w-full z-20"
        onSubmit={(e) => e.preventDefault()}
      >
        <div
          className={`mx-auto transition-all duration-500 ease-in-out max-w-3xl px-6`}
        >
          {/* Navigation and Steps */}
          <div className="flex justify-between items-center py-4">
            {/* Back button */}
            <div className="w-32 text-left">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="group relative inline-flex items-center gap-2 px-4 py-2 border-2 border-brand-primary rounded-md text-sm font-semibold text-brand-primary transition-all duration-300 hover:bg-brand-primary hover:text-white hover:shadow-lg focus:outline-none"
                >
                  <ArrowLeft className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  <span className="relative z-10">Back</span>
                  <span className="absolute inset-0 bg-brand-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-md"></span>
                </button>
              ) : null}
            </div>

            {/* Step Indicator */}
            <div className="flex-grow flex justify-center items-center gap-2">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    step === i
                      ? "bg-brand-primary scale-125"
                      : "bg-brand-muted/30"
                  }`}
                ></div>
              ))}
            </div>

            {/* Next/Generate button */}
            <div className="w-32 text-right">
              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStepComplete()}
                  className="group relative inline-flex items-center gap-2 px-4 py-2 border-2 border-brand-primary rounded-md text-sm font-semibold text-brand-primary transition-all duration-300 hover:bg-brand-primary hover:text-white hover:shadow-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">Next</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="absolute inset-0 bg-brand-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-md"></span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isStepComplete()}
                  className="group relative inline-flex items-center gap-2 px-4 py-2 border-2 border-brand-primary rounded-md text-sm font-semibold text-brand-primary transition-all duration-300 hover:bg-brand-primary hover:text-white hover:shadow-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">Generate</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="absolute inset-0 bg-brand-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-md"></span>
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormPage;
