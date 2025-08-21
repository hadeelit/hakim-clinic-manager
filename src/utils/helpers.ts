import { DATE_FORMATS } from '@/constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date formatting utilities
export const dateUtils = {
  // Format date for display
  formatForDisplay: (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  },

  // Format date for API
  formatForAPI: (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toISOString().split('T')[0];
  },

  // Format datetime for display
  formatDateTimeForDisplay: (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  // Format time for display
  formatTimeForDisplay: (time: string): string => {
    return time;
  },

  // Get today's date
  getToday: (): string => {
    return new Date().toISOString().split('T')[0];
  },

  // Check if date is today
  isToday: (date: Date | string): boolean => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const today = new Date();
    return dateObj.toDateString() === today.toDateString();
  },

  // Calculate age from birth date
  calculateAge: (birthDate: Date | string): number => {
    const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  },
};

// String utilities
export const stringUtils = {
  // Capitalize first letter
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  // Convert to kebab case
  toKebabCase: (str: string): string => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  },

  // Convert to camel case
  toCamelCase: (str: string): string => {
    return str
      .replace(/[-_\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : '');
  },

  // Truncate string
  truncate: (str: string, length: number): string => {
    return str.length > length ? str.substring(0, length) + '...' : str;
  },

  // Generate random ID
  generateId: (prefix: string = ''): string => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2);
    return `${prefix}${timestamp}${randomStr}`;
  },

  // Format phone number
  formatPhoneNumber: (phone: string): string => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Format Saudi phone numbers
    if (cleaned.startsWith('966')) {
      return `+966 ${cleaned.substring(3, 5)} ${cleaned.substring(5, 8)} ${cleaned.substring(8)}`;
    } else if (cleaned.startsWith('05')) {
      return `${cleaned.substring(0, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6)}`;
    }
    
    return phone;
  },
};

// Number utilities
export const numberUtils = {
  // Format currency
  formatCurrency: (amount: number, currency: string = 'SAR'): string => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  },

  // Format number with thousands separator
  formatNumber: (num: number): string => {
    return new Intl.NumberFormat('ar-SA').format(num);
  },

  // Generate random number in range
  randomInRange: (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};

// Array utilities
export const arrayUtils = {
  // Remove duplicates from array
  removeDuplicates: <T>(array: T[]): T[] => {
    return [...new Set(array)];
  },

  // Shuffle array
  shuffle: <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  // Group array by key
  groupBy: <T, K extends keyof T>(array: T[], key: K): Record<string, T[]> => {
    return array.reduce((groups, item) => {
      const group = String(item[key]);
      groups[group] = groups[group] || [];
      groups[group].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  },

  // Sort array by key
  sortBy: <T, K extends keyof T>(array: T[], key: K, direction: 'asc' | 'desc' = 'asc'): T[] => {
    return [...array].sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];
      
      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  },
};

// Local storage utilities
export const storageUtils = {
  // Set item to localStorage with error handling
  setItem: (key: string, value: any): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error setting localStorage item:', error);
      return false;
    }
  },

  // Get item from localStorage with error handling
  getItem: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error('Error getting localStorage item:', error);
      return defaultValue || null;
    }
  },

  // Remove item from localStorage
  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing localStorage item:', error);
      return false;
    }
  },

  // Clear all localStorage
  clear: (): boolean => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },
};

// URL utilities
export const urlUtils = {
  // Build query string from object
  buildQueryString: (params: Record<string, any>): string => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.append(key, String(value));
      }
    });
    
    return searchParams.toString();
  },

  // Parse query string to object
  parseQueryString: (queryString: string): Record<string, string> => {
    const params = new URLSearchParams(queryString);
    const result: Record<string, string> = {};
    
    for (const [key, value] of params.entries()) {
      result[key] = value;
    }
    
    return result;
  },
};

// File utilities
export const fileUtils = {
  // Format file size
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Get file extension
  getFileExtension: (filename: string): string => {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
  },

  // Check if file is image
  isImage: (filename: string): boolean => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
    const extension = fileUtils.getFileExtension(filename).toLowerCase();
    return imageExtensions.includes(extension);
  },
};

// Performance utilities
export const performanceUtils = {
  // Debounce function
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  },

  // Throttle function
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let lastCall = 0;
    
    return (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        func.apply(null, args);
      }
    };
  },
};