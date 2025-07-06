import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CompanyLogo from "/Bastadgruppen_Logotyp_Svart_RGB.svg";
import { ArrowLeft, Download } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import DocPdfTemplate from "./components/DocPdfTemplate";
import { DeclarationFormData } from "./types";

// Map display language names to ISO codes used in translations.ts
const LANG_NAME_TO_CODE: Record<string, string> = {
  English: "en",
  Swedish: "sv",
  Norwegian: "no",
  Danish: "da",
  Finnish: "fi",
  Polish: "pl",
  Estonian: "et",
  German: "de",
  French: "fr",
  Italian: "it",
  Dutch: "nl",
  Portuguese: "pt",
  Latvian: "lv",
  Icelandic: "is",
  Spanish: "es",
  Slovak: "sk",
  Slovenian: "sl",
  Czech: "cs",
  Hungarian: "hu",
  Lithuanian: "lt",
  Greek: "el",
  Croatian: "hr",
};

const TRANSITION_DURATION_MS = 150;

function PreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const formData = (location.state as any)?.formData as
    | DeclarationFormData
    | undefined;

  // Redirect back if no data (e.g., direct URL entry)
  useEffect(() => {
    if (!formData) {
      navigate("/form");
    }
  }, [formData, navigate]);

  interface PdfData {
    lang: string;
    dataUrl: string;
    blobUrl: string;
  }

  type GenerationState = "pending" | "generating" | "completed";

  interface LanguageState {
    lang: string;
    state: GenerationState;
    pdfData?: PdfData;
  }

  const [languageStates, setLanguageStates] = useState<LanguageState[]>([]);
  const [selectedPdfDataUrl, setSelectedPdfDataUrl] = useState<string | null>(
    null
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isViewerReady, setIsViewerReady] = useState(false);
  const [iframeKey, setIframeKey] = useState(0); // Add a key for forcing iframe remount

  // Generate PDFs with optimized image paths
  useEffect(() => {
    let revoked: string[] = [];

    async function generate() {
      if (!formData) return;

      // Initialize all languages as pending
      const initialStates: LanguageState[] = formData.selectedLanguages.map(
        (lang) => ({
          lang,
          state: "pending" as GenerationState,
        })
      );
      setLanguageStates(initialStates);

      // Generate PDFs sequentially
      for (let i = 0; i < formData.selectedLanguages.length; i++) {
        const langName = formData.selectedLanguages[i];
        const langCode = LANG_NAME_TO_CODE[langName] || "en";

        // Update state to generating
        setLanguageStates((prev) =>
          prev.map((item) =>
            item.lang === langName ? { ...item, state: "generating" } : item
          )
        );

        try {
          const blob = await pdf(
            <DocPdfTemplate formData={formData} language={langCode} />
          ).toBlob();
          const blobUrl = URL.createObjectURL(blob);
          revoked.push(blobUrl);

          const dataUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });

          const pdfData: PdfData = { lang: langCode, dataUrl, blobUrl };

          // Update state to completed
          setLanguageStates((prev) =>
            prev.map((item) =>
              item.lang === langName
                ? { ...item, state: "completed", pdfData }
                : item
            )
          );

          // Set first completed PDF as selected
          if (i === 0) {
            setSelectedPdfDataUrl(dataUrl);
          }
        } catch (error) {
          console.error(`Error generating PDF for ${langName}:`, error);
          // Keep as generating state or could add error state
        }
      }
    }
    generate();

    // Listen for messages from the iframe
    const handlePdfMessage = (event: MessageEvent) => {
      const iframeWindow = iframeRef.current?.contentWindow;
      if (event.source !== iframeWindow) return;

      if (event.data === "pdf-rendered") {
        setIsTransitioning(false);
      } else if (event.data === "pdf-viewer-ready") {
        setIsViewerReady(true);
      }
    };

    window.addEventListener("message", handlePdfMessage);

    return () => {
      revoked.forEach((u) => URL.revokeObjectURL(u));
      window.removeEventListener("message", handlePdfMessage);
    };
  }, [formData]);

  // Send PDF data to iframe when ready and a PDF is selected
  useEffect(() => {
    if (
      isViewerReady &&
      selectedPdfDataUrl &&
      iframeRef.current?.contentWindow
    ) {
      iframeRef.current.contentWindow.postMessage(selectedPdfDataUrl, "*");
    }
  }, [isViewerReady, selectedPdfDataUrl]);

  if (!formData) return null;

  const handleLanguageSelect = (dataUrl: string) => {
    if (dataUrl === selectedPdfDataUrl || isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedPdfDataUrl(dataUrl);
      setIframeKey((prevKey) => prevKey + 1); // Increment key to force iframe remount
      setIsViewerReady(false); // Reset ready state for the new iframe
    }, TRANSITION_DURATION_MS);
  };

  // Helper to download all PDFs
  const downloadAll = async () => {
    const completedPdfs = languageStates.filter(
      (state) => state.state === "completed" && state.pdfData
    );
    completedPdfs.forEach(({ pdfData }) => {
      if (pdfData) {
        const link = document.createElement("a");
        link.href = pdfData.blobUrl;
        link.download = `DoC_${formData.productInfo.name}_${pdfData.lang}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  };

  return (
    <div className="flex flex-col h-screen bg-brand-background-DEFAULT font-sans animate-fade-in">
      {/* Top bar */}
      <header className="flex-shrink-0 p-4 flex items-center">
        {/* Back */}
        <div className="w-34 flex-shrink-0">
          <button
            type="button"
            onClick={() => navigate("/form")}
            className="group relative inline-flex items-center gap-2 px-4 py-2 border-2 border-brand-primary rounded-md text-sm font-semibold text-brand-primary transition-all duration-300 hover:bg-brand-primary hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Form
          </button>
        </div>

        {/* Center */}
        <div className="flex-grow flex justify-center">
          <button
            type="button"
            onClick={downloadAll}
            className="group relative inline-flex items-center gap-2 px-4 py-2 border-2 border-brand-primary rounded-md text-sm font-semibold text-brand-primary transition-all duration-300 hover:bg-brand-primary hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
          >
            <Download className="h-4 w-4" /> Download All
          </button>
        </div>

        {/* Logo */}
        <div className="w-32 flex-shrink-0 flex justify-end">
          <img
            src={CompanyLogo}
            alt="Company Logo"
            className="h-[50px] w-auto"
          />
        </div>
      </header>

      {/* Content area */}
      <main className="flex-1 relative flex justify-center items-center overflow-hidden px-4 pt-4">
        {/* PDF preview */}
        <div className="h-full w-full max-w-[800px]">
          {selectedPdfDataUrl ? (
            <iframe
              key={iframeKey} // Add key to force complete remount
              ref={iframeRef}
              src="/pdfjs.html"
              title="Declaration Preview"
              className={`w-full h-full border-none ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
              style={{ transition: `opacity ${TRANSITION_DURATION_MS}ms` }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-brand-muted"></div>
          )}
        </div>

        {/* Language selection sidebar */}
        {languageStates.length > 1 && (
          <aside className="absolute top-4 right-4 bottom-4 w-40 p-4 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="space-y-2">
              {languageStates.map((langState) => {
                const isCompleted = langState.state === "completed";
                const isSelected =
                  langState.pdfData?.dataUrl === selectedPdfDataUrl;
                const isGenerating = langState.state === "generating";

                return (
                  <button
                    key={langState.lang}
                    type="button"
                    onClick={() =>
                      isCompleted && langState.pdfData
                        ? handleLanguageSelect(langState.pdfData.dataUrl)
                        : undefined
                    }
                    disabled={!isCompleted}
                    className={`w-full text-left p-2 rounded-md text-sm transition-all duration-200 ${
                      isSelected && !isTransitioning
                        ? "bg-brand-primary text-white shadow-md"
                        : isCompleted
                        ? "bg-white hover:bg-gray-100 hover:text-brand-primary cursor-pointer"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {`${langState.lang.toUpperCase()}`}
                    {isGenerating && (
                      <span className="ml-2 text-xs"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </aside>
        )}
      </main>
    </div>
  );
}

export default PreviewPage;
