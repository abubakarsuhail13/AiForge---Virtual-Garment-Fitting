
export interface Measurements {
  height: number;
  weight: number;
  chest: number;
  waist: number;
  hips: number;
  shoulderWidth: number;
  fitPreference: 'slim' | 'regular' | 'loose';
}

export type GarmentCategory = 'Shirts' | 'Shalwar Kameez' | 'Kurtas' | 'Abayas' | 'Trousers';
export type Gender = 'Men' | 'Women';

export interface Garment {
  id: string;
  name: string;
  category: GarmentCategory;
  gender: Gender;
  image: string;
  color: string;
  material: string;
}

export type Language = 'en' | 'ur';

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
}
