// User and Authentication Types
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'doctor' | 'nurse' | 'receptionist';
  firstName: string;
  lastName: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Patient Types
export interface Patient {
  id: string;
  patientNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  phone: string;
  email?: string;
  address: string;
  nationalId: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: string[];
  allergies: string[];
  createdAt: string;
  updatedAt: string;
}

// Appointment Types
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  duration: number; // in minutes
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  reason: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Doctor Types
export interface Doctor {
  id: string;
  userId: string;
  specialization: string;
  licenseNumber: string;
  experience: number; // years
  consultationFee: number;
  workingHours: {
    [key: string]: { // day of week
      start: string;
      end: string;
      isWorking: boolean;
    };
  };
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form Types
export interface FormErrors {
  [key: string]: string;
}

// Language Types
export interface Language {
  code: string;
  name: string;
  direction: 'ltr' | 'rtl';
}