export interface DeclarationFormData {
  docType?: "product" | "packaging";
  selectedLanguages: string[];
  productInfo: {
    name: string;
    productNumber: string;
    categoryClass: string;
    certificateNo: string;
    moduleType: string;
  };
  selectedBrands: string;
  selectedBrandDetails?: {
    name: string;
  };
  selectedBodyDetails?: {
    name: string;
    number: string;
    address: string;
    zipCode: string;
    country: string;
  };
  complianceInfo: {
    euLegislation: string[];
    harmonisedStandards: string[];
    additionalInfo?: string;
  };
  signerName?: string;
  signerFunction?: string;
}

