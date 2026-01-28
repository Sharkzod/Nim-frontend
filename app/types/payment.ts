// types/payment.ts
export interface PaymentOption {
  id: string;
  label: string;
  description: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface PlanFeature {
  id: string;
  text: string;
  included: boolean;
}

export interface PlanTier {
  id: string;
  name: string;
  price: number;
  currency?: string;
  description?: string;
  features: PlanFeature[];
  popular?: boolean;
}

export interface UpgradePlanFormData {
  selectedPlan: string;
  paymentMethod: string;
  walletBalanceUsed: boolean;
  cryptoPayment: boolean;
  bankTransfer: boolean;
  termsAccepted: boolean;
}