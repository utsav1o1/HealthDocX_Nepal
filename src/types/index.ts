export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  provider?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFamilyMember {
  _id: string;
  userId: string;
  name: string;
  relationship: string;
  dateOfBirth?: string;
  bloodGroup?: string;
  allergies?: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDocument {
  _id: string;
  userId: string;
  familyMemberId?: string;
  familyMemberName?: string;
  title: string;
  description?: string;
  fileUrl: string;
  filePublicId: string;
  fileType: string;
  hospital?: string;
  doctor?: string;
  category: DocumentCategory;
  tags: string[];
  aiExtractedData?: AIExtractedData;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type DocumentCategory =
  | 'prescription'
  | 'lab-report'
  | 'imaging'
  | 'discharge-summary'
  | 'insurance'
  | 'vaccination'
  | 'consultation'
  | 'surgery'
  | 'other';

export interface AIExtractedData {
  summary: string;
  diagnosis?: string[];
  medications?: string[];
  procedures?: string[];
  doctorName?: string;
  hospitalName?: string;
  dateOfVisit?: string;
  recommendations?: string[];
  keyFindings?: string[];
}

export type Locale = 'en' | 'ne';

export interface Dictionary {
  nav: {
    home: string;
    about: string;
    dashboard: string;
    upload: string;
    documents: string;
    timeline: string;
    family: string;
    signin: string;
    signup: string;
    signout: string;
    language: string;
  };
  landing: {
    heroTitle: string;
    heroSubtitle: string;
    heroCta: string;
    featuresTitle: string;
    features: {
      title: string;
      description: string;
    }[];
    howItWorksTitle: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
  about: {
    title: string;
    mission: string;
    missionText: string;
    vision: string;
    visionText: string;
    values: {
      title: string;
      description: string;
    }[];
  };
  dashboard: {
    title: string;
    welcome: string;
    totalDocuments: string;
    recentUploads: string;
    categories: string;
    familyMembers: string;
    recentDocuments: string;
    viewAll: string;
    noDocuments: string;
  };
  upload: {
    title: string;
    dragDrop: string;
    or: string;
    browse: string;
    analyzing: string;
    success: string;
    supportedFormats: string;
  };
  documents: {
    title: string;
    search: string;
    filter: string;
    all: string;
    noResults: string;
    delete: string;
    view: string;
    export: string;
  };
  common: {
    loading: string;
    error: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    back: string;
    next: string;
    submit: string;
  };
}
