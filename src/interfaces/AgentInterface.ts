export interface AvailabilitySubInterface {
  Monday: string;
  Tuesday: string;
  Wednesday: string;
  Thursday: string;
  Friday: string;
  Saturday: string;
  Sunday: string;
}

export interface SaleHistorySubInterface {
  id: number;
  address: string;
  dateOfSale: string;
  closingPrice: string;
  represented: string;
}

export interface AgentInterface {
  id: number;
  name: string;
  img: string;
  rating: number;
  state: string;
  availability: AvailabilitySubInterface;
  saleHistory: SaleHistorySubInterface[];
}
