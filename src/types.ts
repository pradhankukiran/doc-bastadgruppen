export interface DeclarationFormData {
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
  };
}
