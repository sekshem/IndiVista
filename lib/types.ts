export interface ArtCultureFinancialData {
  STATE_UT: string;
  FINANCIAL_YEAR: string;
  NO_OF_ORGS: number;
  AMOUNT_RS_IN_LAKHS: number;
  CREATED_AT: string;
}

export interface TourismData {
  STATE: string;
  DOMESTIC_TOURIST_VISITS_MILLION: number;
  FOREIGN_TOURIST_VISITS_MILLION: number;
  HAS_ART: boolean;
  HAS_CULTURE: boolean;
  HAS_TOURISM: boolean;
  CREATED_AT: string;
}

export interface StateData {
  financial: ArtCultureFinancialData[];
  tourism: TourismData[];
} 