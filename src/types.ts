export interface ServiceItem {
  id: string;
  title: string;
  category: 'Residential' | 'Storm and Emergency' | 'Additional';
  shortDesc: string;
  fullDesc: string;
  image: string;
  features: string[];
  turnaround: string;
  warranty: string;
  idealFor: string;
}

export interface RoofingProblem {
  id: string;
  title: string;
  image: string;
  warningSigns: string[];
  whyItHappens: string;
  consequences: string;
  inspectionAdvice: string;
  recommendedNextSteps: string[];
}

export interface RoofingMaterial {
  id: string;
  name: string;
  image: string;
  shortDesc: string;
  advantages: string[];
  disadvantages: string[];
  suitableApplications: string;
  maintenanceRequirements: string;
  typicalDurability: string;
  priceLevel: '$' | '$$' | '$$$' | '$$$$';
  availableStyles: string[];
}

export interface RoofLayer {
  id: string;
  number: number;
  name: string;
  subtitle: string;
  purpose: string;
  benefits: string[];
  installationConsiderations: string;
  specs: string;
  color: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Pricing & Inspection' | 'Storm & Insurance' | 'Materials & Longevity';
}

export interface TeamMember {
  name: string;
  role: string;
  certifications: string[];
  experience: string;
  image: string;
  bio: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Roof Replacement' | 'Roof Repair' | 'Storm Restoration' | 'Metal Roofing' | 'Commercial Roofing' | 'New Installation';
  location: string;
  material: string;
  year: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  details: string;
}

export interface LeadFormData {
  fullName: string;
  phone: string;
  email: string;
  propertyAddress: string;
  zipCode: string;
  serviceRequired: string;
  problemDescription: string;
  preferredDate: string;
  preferredTime: string;
  photos?: string[];
  termsAgreed: boolean;
}
