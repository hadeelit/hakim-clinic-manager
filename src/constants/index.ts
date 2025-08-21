// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-api-domain.com/api' 
    : 'http://localhost:3000/api',
  VERSION: 'v1',
  TIMEOUT: 10000, // 10 seconds
};

// Application Constants
export const APP_CONFIG = {
  NAME: 'HakimClinic',
  VERSION: '1.0.0',
  DEFAULT_LANGUAGE: 'ar',
  SUPPORTED_LANGUAGES: ['ar', 'en'],
  ITEMS_PER_PAGE: 10,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  NURSE: 'nurse',
  RECEPTIONIST: 'receptionist',
} as const;

// Appointment Status
export const APPOINTMENT_STATUS = {
  SCHEDULED: 'scheduled',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// Gender Options
export const GENDER_OPTIONS = {
  MALE: 'male',
  FEMALE: 'female',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'hakimclinic_auth_token',
  REFRESH_TOKEN: 'hakimclinic_refresh_token',
  USER_DATA: 'hakimclinic_user_data',
  LANGUAGE: 'hakimclinic_language',
  THEME: 'hakimclinic_theme',
  REMEMBER_ME: 'hakimclinic_remember_me',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  
  // Users
  USERS: '/users',
  USER_PROFILE: '/users/profile',
  
  // Patients
  PATIENTS: '/patients',
  PATIENT_SEARCH: '/patients/search',
  
  // Appointments
  APPOINTMENTS: '/appointments',
  APPOINTMENT_SLOTS: '/appointments/available-slots',
  
  // Doctors
  DOCTORS: '/doctors',
  DOCTOR_SCHEDULE: '/doctors/schedule',
  
  // Reports
  REPORTS: '/reports',
  ANALYTICS: '/analytics',
} as const;

// Date and Time Formats
export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  API: 'YYYY-MM-DD',
  DATETIME: 'DD/MM/YYYY HH:mm',
  TIME: 'HH:mm',
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  PHONE_PATTERN: /^[0-9+\-\s()]+$/,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  NATIONAL_ID_LENGTH: 10,
} as const;