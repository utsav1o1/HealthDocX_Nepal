import type { Dictionary } from '@/types';

const en: Dictionary = {
  nav: {
    home: 'Home',
    about: 'About',
    dashboard: 'Dashboard',
    upload: 'Upload',
    documents: 'Documents',
    timeline: 'Timeline',
    family: 'Family',
    signin: 'Sign In',
    signup: 'Sign Up',
    signout: 'Sign Out',
    language: 'Language',
  },
  landing: {
    heroTitle: 'Your Health Records,\nIntelligently Organized',
    heroSubtitle:
      'HealthDocX uses AI to analyze, categorize, and secure your medical documents. Never lose a prescription, lab report, or medical record again.',
    heroCta: 'Get Started Free',
    featuresTitle: 'Everything You Need',
    features: [
      {
        title: 'AI-Powered Analysis',
        description:
          'Upload any medical document and our AI instantly extracts diagnoses, medications, and key findings.',
      },
      {
        title: 'Cloud Secure Storage',
        description:
          'Your documents are encrypted and stored in the cloud. Access them from any device, anywhere.',
      },
      {
        title: 'Smart Categorization',
        description:
          'Automatically organize documents by type, hospital, doctor, or health issue.',
      },
      {
        title: 'Family Profiles',
        description:
          'Manage health records for your entire family under one account. Children, parents, everyone.',
      },
      {
        title: 'Health Timeline',
        description:
          'Visualize your complete health journey on an interactive timeline spanning months and years.',
      },
      {
        title: 'Export & Share',
        description:
          'Export your medical history as PDF for new doctors or insurance claims with one click.',
      },
    ],
    howItWorksTitle: 'How It Works',
    steps: [
      {
        title: 'Upload',
        description: 'Take a photo or upload a PDF of your medical document.',
      },
      {
        title: 'AI Analyzes',
        description: 'Our AI reads and extracts all important medical information.',
      },
      {
        title: 'Organized',
        description: 'Documents are categorized and searchable in your secure vault.',
      },
    ],
  },
  about: {
    title: 'About HealthDocX',
    mission: 'Our Mission',
    missionText:
      'To empower every individual with organized, accessible, and intelligent health record management. We believe that understanding your medical history should be effortless.',
    vision: 'Our Vision',
    visionText:
      'A world where no medical record is ever lost, where every patient has instant access to their complete health history, and where AI helps bridge the gap between complex medical data and human understanding.',
    values: [
      {
        title: 'Privacy First',
        description: 'Your health data is yours. We never share, sell, or misuse your information.',
      },
      {
        title: 'Accessibility',
        description: 'Available in multiple languages and designed to be used by everyone.',
      },
      {
        title: 'Innovation',
        description: 'Leveraging cutting-edge AI to transform how people manage health records.',
      },
    ],
  },
  dashboard: {
    title: 'Dashboard',
    welcome: 'Welcome back',
    totalDocuments: 'Total Documents',
    recentUploads: 'Recent Uploads',
    categories: 'Categories',
    familyMembers: 'Family Members',
    recentDocuments: 'Recent Documents',
    viewAll: 'View All',
    noDocuments: 'No documents yet. Upload your first medical document to get started!',
  },
  upload: {
    title: 'Upload Document',
    dragDrop: 'Drag & drop your file here',
    or: 'or',
    browse: 'Browse Files',
    analyzing: 'AI is analyzing your document...',
    success: 'Document uploaded and analyzed successfully!',
    supportedFormats: 'Supports JPG, PNG, PDF up to 10MB',
  },
  documents: {
    title: 'My Documents',
    search: 'Search documents...',
    filter: 'Filter by category',
    all: 'All',
    noResults: 'No documents found',
    delete: 'Delete',
    view: 'View',
    export: 'Export as PDF',
  },
  common: {
    loading: 'Loading...',
    error: 'Something went wrong',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    back: 'Back',
    next: 'Next',
    submit: 'Submit',
  },
};

export default en;
