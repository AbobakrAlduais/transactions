export interface Transaction {
  id: Number;
  _id: string;
  date: string;
  sender?: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    IDNumber: string;
  };
  recipient?: {
    firstName: string;
    lastName: string;
    email: string;
    accountNumber: string;
    bank: string;
  };
  Amount: string;
  CurrencyCd: string;
  Comments?: string;
  status: string;
}
