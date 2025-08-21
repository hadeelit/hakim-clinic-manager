import { APP_CONFIG, STORAGE_KEYS } from '@/constants';
import type { Language } from '@/types';

// Available languages
export const LANGUAGES: Language[] = [
  {
    code: 'ar',
    name: 'العربية',
    direction: 'rtl',
  },
  {
    code: 'en',
    name: 'English',
    direction: 'ltr',
  },
];

// Translation keys interface
export interface TranslationKeys {
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    add: string;
    search: string;
    filter: string;
    export: string;
    import: string;
    refresh: string;
    back: string;
    next: string;
    previous: string;
    submit: string;
    reset: string;
    clear: string;
    confirm: string;
    yes: string;
    no: string;
  };

  // Authentication
  auth: {
    login: string;
    logout: string;
    username: string;
    password: string;
    email: string;
    rememberMe: string;
    forgotPassword: string;
    resetPassword: string;
    loginSuccess: string;
    loginError: string;
    logoutSuccess: string;
    invalidCredentials: string;
    sessionExpired: string;
    resetEmailSent: string;
    passwordResetSuccess: string;
    showPassword: string;
    hidePassword: string;
    enterCredentials: string;
  };

  // Navigation
  nav: {
    dashboard: string;
    patients: string;
    appointments: string;
    doctors: string;
    reports: string;
    settings: string;
    profile: string;
    help: string;
  };

  // Dashboard
  dashboard: {
    welcome: string;
    todayAppointments: string;
    totalPatients: string;
    totalDoctors: string;
    revenue: string;
    quickActions: string;
    recentActivity: string;
  };

  // Patients
  patients: {
    patientList: string;
    addPatient: string;
    editPatient: string;
    patientDetails: string;
    patientNumber: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    phone: string;
    address: string;
    nationalId: string;
    emergencyContact: string;
    medicalHistory: string;
    allergies: string;
    male: string;
    female: string;
    patientAdded: string;
    patientUpdated: string;
    patientDeleted: string;
  };

  // Appointments
  appointments: {
    appointmentList: string;
    addAppointment: string;
    editAppointment: string;
    appointmentDetails: string;
    date: string;
    time: string;
    duration: string;
    doctor: string;
    patient: string;
    reason: string;
    status: string;
    notes: string;
    scheduled: string;
    confirmed: string;
    inProgress: string;
    completed: string;
    cancelled: string;
    appointmentBooked: string;
    appointmentUpdated: string;
    appointmentCancelled: string;
  };

  // Doctors
  doctors: {
    doctorList: string;
    addDoctor: string;
    editDoctor: string;
    doctorDetails: string;
    specialization: string;
    licenseNumber: string;
    experience: string;
    consultationFee: string;
    workingHours: string;
    schedule: string;
    availability: string;
    doctorAdded: string;
    doctorUpdated: string;
  };

  // Validation
  validation: {
    required: string;
    invalidEmail: string;
    invalidPhone: string;
    passwordTooShort: string;
    passwordsNotMatch: string;
    invalidDate: string;
    invalidNumber: string;
    maxLength: string;
    minLength: string;
  };

  // Errors
  errors: {
    networkError: string;
    serverError: string;
    notFound: string;
    unauthorized: string;
    forbidden: string;
    validationError: string;
    unknownError: string;
  };
}

// Default translations (Arabic)
const translations: Record<string, TranslationKeys> = {
  ar: {
    common: {
      loading: 'جاري التحميل...',
      error: 'خطأ',
      success: 'نجح',
      cancel: 'إلغاء',
      save: 'حفظ',
      delete: 'حذف',
      edit: 'تعديل',
      add: 'إضافة',
      search: 'بحث',
      filter: 'تصفية',
      export: 'تصدير',
      import: 'استيراد',
      refresh: 'تحديث',
      back: 'رجوع',
      next: 'التالي',
      previous: 'السابق',
      submit: 'إرسال',
      reset: 'إعادة تعيين',
      clear: 'مسح',
      confirm: 'تأكيد',
      yes: 'نعم',
      no: 'لا',
    },
    auth: {
      login: 'تسجيل الدخول',
      logout: 'تسجيل الخروج',
      username: 'اسم المستخدم',
      password: 'كلمة المرور',
      email: 'البريد الإلكتروني',
      rememberMe: 'تذكرني',
      forgotPassword: 'نسيت كلمة المرور؟',
      resetPassword: 'إعادة تعيين كلمة المرور',
      loginSuccess: 'تم تسجيل الدخول بنجاح',
      loginError: 'فشل في تسجيل الدخول',
      logoutSuccess: 'تم تسجيل الخروج بنجاح',
      invalidCredentials: 'اسم المستخدم أو كلمة المرور غير صحيحة',
      sessionExpired: 'انتهت صلاحية الجلسة',
      resetEmailSent: 'تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني',
      passwordResetSuccess: 'تم إعادة تعيين كلمة المرور بنجاح',
      showPassword: 'إظهار كلمة المرور',
      hidePassword: 'إخفاء كلمة المرور',
      enterCredentials: 'يرجى إدخال بيانات الدخول للمتابعة',
    },
    nav: {
      dashboard: 'لوحة التحكم',
      patients: 'المرضى',
      appointments: 'المواعيد',
      doctors: 'الأطباء',
      reports: 'التقارير',
      settings: 'الإعدادات',
      profile: 'الملف الشخصي',
      help: 'المساعدة',
    },
    dashboard: {
      welcome: 'مرحباً بك في عيادة حكيم',
      todayAppointments: 'مواعيد اليوم',
      totalPatients: 'إجمالي المرضى',
      totalDoctors: 'إجمالي الأطباء',
      revenue: 'الإيرادات',
      quickActions: 'إجراءات سريعة',
      recentActivity: 'النشاط الأخير',
    },
    patients: {
      patientList: 'قائمة المرضى',
      addPatient: 'إضافة مريض',
      editPatient: 'تعديل بيانات المريض',
      patientDetails: 'تفاصيل المريض',
      patientNumber: 'رقم المريض',
      firstName: 'الاسم الأول',
      lastName: 'اسم العائلة',
      dateOfBirth: 'تاريخ الميلاد',
      gender: 'الجنس',
      phone: 'رقم الهاتف',
      address: 'العنوان',
      nationalId: 'رقم الهوية',
      emergencyContact: 'جهة الاتصال للطوارئ',
      medicalHistory: 'التاريخ المرضي',
      allergies: 'الحساسية',
      male: 'ذكر',
      female: 'أنثى',
      patientAdded: 'تم إضافة المريض بنجاح',
      patientUpdated: 'تم تحديث بيانات المريض بنجاح',
      patientDeleted: 'تم حذف المريض بنجاح',
    },
    appointments: {
      appointmentList: 'قائمة المواعيد',
      addAppointment: 'حجز موعد',
      editAppointment: 'تعديل الموعد',
      appointmentDetails: 'تفاصيل الموعد',
      date: 'التاريخ',
      time: 'الوقت',
      duration: 'المدة',
      doctor: 'الطبيب',
      patient: 'المريض',
      reason: 'سبب الزيارة',
      status: 'الحالة',
      notes: 'ملاحظات',
      scheduled: 'مجدول',
      confirmed: 'مؤكد',
      inProgress: 'قيد التنفيذ',
      completed: 'مكتمل',
      cancelled: 'ملغى',
      appointmentBooked: 'تم حجز الموعد بنجاح',
      appointmentUpdated: 'تم تحديث الموعد بنجاح',
      appointmentCancelled: 'تم إلغاء الموعد بنجاح',
    },
    doctors: {
      doctorList: 'قائمة الأطباء',
      addDoctor: 'إضافة طبيب',
      editDoctor: 'تعديل بيانات الطبيب',
      doctorDetails: 'تفاصيل الطبيب',
      specialization: 'التخصص',
      licenseNumber: 'رقم الترخيص',
      experience: 'سنوات الخبرة',
      consultationFee: 'رسوم الاستشارة',
      workingHours: 'ساعات العمل',
      schedule: 'الجدول',
      availability: 'التوفر',
      doctorAdded: 'تم إضافة الطبيب بنجاح',
      doctorUpdated: 'تم تحديث بيانات الطبيب بنجاح',
    },
    validation: {
      required: 'هذا الحقل مطلوب',
      invalidEmail: 'البريد الإلكتروني غير صحيح',
      invalidPhone: 'رقم الهاتف غير صحيح',
      passwordTooShort: 'كلمة المرور قصيرة جداً',
      passwordsNotMatch: 'كلمات المرور غير متطابقة',
      invalidDate: 'التاريخ غير صحيح',
      invalidNumber: 'الرقم غير صحيح',
      maxLength: 'تجاوز الحد الأقصى للأحرف',
      minLength: 'لم يتم الوصول للحد الأدنى للأحرف',
    },
    errors: {
      networkError: 'خطأ في الاتصال بالشبكة',
      serverError: 'خطأ في الخادم',
      notFound: 'الصفحة غير موجودة',
      unauthorized: 'غير مخول للوصول',
      forbidden: 'غير مسموح',
      validationError: 'خطأ في التحقق من البيانات',
      unknownError: 'خطأ غير معروف',
    },
  },
  en: {
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      search: 'Search',
      filter: 'Filter',
      export: 'Export',
      import: 'Import',
      refresh: 'Refresh',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      reset: 'Reset',
      clear: 'Clear',
      confirm: 'Confirm',
      yes: 'Yes',
      no: 'No',
    },
    auth: {
      login: 'Login',
      logout: 'Logout',
      username: 'Username',
      password: 'Password',
      email: 'Email',
      rememberMe: 'Remember Me',
      forgotPassword: 'Forgot Password?',
      resetPassword: 'Reset Password',
      loginSuccess: 'Login successful',
      loginError: 'Login failed',
      logoutSuccess: 'Logout successful',
      invalidCredentials: 'Invalid username or password',
      sessionExpired: 'Session expired',
      resetEmailSent: 'Reset link sent to your email',
      passwordResetSuccess: 'Password reset successful',
      showPassword: 'Show Password',
      hidePassword: 'Hide Password',
      enterCredentials: 'Please enter your credentials to continue',
    },
    nav: {
      dashboard: 'Dashboard',
      patients: 'Patients',
      appointments: 'Appointments',
      doctors: 'Doctors',
      reports: 'Reports',
      settings: 'Settings',
      profile: 'Profile',
      help: 'Help',
    },
    dashboard: {
      welcome: 'Welcome to HakimClinic',
      todayAppointments: "Today's Appointments",
      totalPatients: 'Total Patients',
      totalDoctors: 'Total Doctors',
      revenue: 'Revenue',
      quickActions: 'Quick Actions',
      recentActivity: 'Recent Activity',
    },
    patients: {
      patientList: 'Patient List',
      addPatient: 'Add Patient',
      editPatient: 'Edit Patient',
      patientDetails: 'Patient Details',
      patientNumber: 'Patient Number',
      firstName: 'First Name',
      lastName: 'Last Name',
      dateOfBirth: 'Date of Birth',
      gender: 'Gender',
      phone: 'Phone',
      address: 'Address',
      nationalId: 'National ID',
      emergencyContact: 'Emergency Contact',
      medicalHistory: 'Medical History',
      allergies: 'Allergies',
      male: 'Male',
      female: 'Female',
      patientAdded: 'Patient added successfully',
      patientUpdated: 'Patient updated successfully',
      patientDeleted: 'Patient deleted successfully',
    },
    appointments: {
      appointmentList: 'Appointment List',
      addAppointment: 'Book Appointment',
      editAppointment: 'Edit Appointment',
      appointmentDetails: 'Appointment Details',
      date: 'Date',
      time: 'Time',
      duration: 'Duration',
      doctor: 'Doctor',
      patient: 'Patient',
      reason: 'Reason',
      status: 'Status',
      notes: 'Notes',
      scheduled: 'Scheduled',
      confirmed: 'Confirmed',
      inProgress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled',
      appointmentBooked: 'Appointment booked successfully',
      appointmentUpdated: 'Appointment updated successfully',
      appointmentCancelled: 'Appointment cancelled successfully',
    },
    doctors: {
      doctorList: 'Doctor List',
      addDoctor: 'Add Doctor',
      editDoctor: 'Edit Doctor',
      doctorDetails: 'Doctor Details',
      specialization: 'Specialization',
      licenseNumber: 'License Number',
      experience: 'Experience',
      consultationFee: 'Consultation Fee',
      workingHours: 'Working Hours',
      schedule: 'Schedule',
      availability: 'Availability',
      doctorAdded: 'Doctor added successfully',
      doctorUpdated: 'Doctor updated successfully',
    },
    validation: {
      required: 'This field is required',
      invalidEmail: 'Invalid email address',
      invalidPhone: 'Invalid phone number',
      passwordTooShort: 'Password is too short',
      passwordsNotMatch: 'Passwords do not match',
      invalidDate: 'Invalid date',
      invalidNumber: 'Invalid number',
      maxLength: 'Maximum length exceeded',
      minLength: 'Minimum length not met',
    },
    errors: {
      networkError: 'Network connection error',
      serverError: 'Server error',
      notFound: 'Page not found',
      unauthorized: 'Unauthorized access',
      forbidden: 'Access forbidden',
      validationError: 'Data validation error',
      unknownError: 'Unknown error',
    },
  },
};

// i18n Manager class
export class I18nManager {
  private currentLanguage: string;
  private currentTranslations: TranslationKeys;

  constructor() {
    this.currentLanguage = this.getSavedLanguage() || APP_CONFIG.DEFAULT_LANGUAGE;
    this.currentTranslations = translations[this.currentLanguage];
    this.updateDocumentDirection();
  }

  // Get saved language from localStorage
  private getSavedLanguage(): string | null {
    return localStorage.getItem(STORAGE_KEYS.LANGUAGE);
  }

  // Save language to localStorage
  private saveLanguage(languageCode: string): void {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, languageCode);
  }

  // Update document direction based on language
  private updateDocumentDirection(): void {
    const language = LANGUAGES.find(lang => lang.code === this.currentLanguage);
    if (language) {
      document.documentElement.dir = language.direction;
      document.documentElement.lang = language.code;
    }
  }

  // Get current language
  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  // Get current language info
  getCurrentLanguageInfo(): Language | undefined {
    return LANGUAGES.find(lang => lang.code === this.currentLanguage);
  }

  // Change language
  changeLanguage(languageCode: string): void {
    if (translations[languageCode]) {
      this.currentLanguage = languageCode;
      this.currentTranslations = translations[languageCode];
      this.saveLanguage(languageCode);
      this.updateDocumentDirection();
      
      // Trigger a custom event for components to listen to
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: languageCode } 
      }));
    }
  }

  // Get translation by key path
  translate(keyPath: string): string {
    const keys = keyPath.split('.');
    let result: any = this.currentTranslations;
    
    for (const key of keys) {
      result = result?.[key];
      if (result === undefined) {
        console.warn(`Translation key not found: ${keyPath}`);
        return keyPath; // Return the key path if translation not found
      }
    }
    
    return typeof result === 'string' ? result : keyPath;
  }

  // Get all translations for current language
  getAllTranslations(): TranslationKeys {
    return this.currentTranslations;
  }

  // Check if RTL language
  isRTL(): boolean {
    const language = LANGUAGES.find(lang => lang.code === this.currentLanguage);
    return language?.direction === 'rtl';
  }
}

// Create and export singleton instance
export const i18nManager = new I18nManager();

// Export translation function for easier use
export const t = (keyPath: string): string => i18nManager.translate(keyPath);