import { VALIDATION_RULES } from '@/constants';
import { i18nManager } from '@/i18n';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export class ValidationUtils {
  // Validate required field
  static required(value: any): ValidationResult {
    const isValid = value !== null && value !== undefined && value !== '';
    return {
      isValid,
      message: isValid ? undefined : i18nManager.translate('validation.required'),
    };
  }

  // Validate email format
  static email(value: string): ValidationResult {
    if (!value) return { isValid: true }; // Optional field
    
    const isValid = VALIDATION_RULES.EMAIL_PATTERN.test(value);
    return {
      isValid,
      message: isValid ? undefined : i18nManager.translate('validation.invalidEmail'),
    };
  }

  // Validate phone number
  static phone(value: string): ValidationResult {
    if (!value) return { isValid: true }; // Optional field
    
    const isValid = VALIDATION_RULES.PHONE_PATTERN.test(value);
    return {
      isValid,
      message: isValid ? undefined : i18nManager.translate('validation.invalidPhone'),
    };
  }

  // Validate password length
  static password(value: string): ValidationResult {
    if (!value) return { isValid: true }; // Let required validator handle empty values
    
    const isValid = value.length >= VALIDATION_RULES.PASSWORD_MIN_LENGTH;
    return {
      isValid,
      message: isValid ? undefined : i18nManager.translate('validation.passwordTooShort'),
    };
  }

  // Validate username length
  static username(value: string): ValidationResult {
    if (!value) return { isValid: true }; // Let required validator handle empty values
    
    const isValid = value.length >= VALIDATION_RULES.USERNAME_MIN_LENGTH;
    return {
      isValid,
      message: isValid ? undefined : i18nManager.translate('validation.minLength'),
    };
  }

  // Validate national ID
  static nationalId(value: string): ValidationResult {
    if (!value) return { isValid: true }; // Optional field
    
    const isValid = value.length === VALIDATION_RULES.NATIONAL_ID_LENGTH && /^\d+$/.test(value);
    return {
      isValid,
      message: isValid ? undefined : i18nManager.translate('validation.invalidNumber'),
    };
  }

  // Validate date
  static date(value: string): ValidationResult {
    if (!value) return { isValid: true }; // Optional field
    
    const date = new Date(value);
    const isValid = !isNaN(date.getTime());
    return {
      isValid,
      message: isValid ? undefined : i18nManager.translate('validation.invalidDate'),
    };
  }

  // Validate number
  static number(value: string | number): ValidationResult {
    if (!value && value !== 0) return { isValid: true }; // Optional field
    
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    const isValid = !isNaN(numValue);
    return {
      isValid,
      message: isValid ? undefined : i18nManager.translate('validation.invalidNumber'),
    };
  }

  // Validate minimum length
  static minLength(value: string, minLength: number): ValidationResult {
    if (!value) return { isValid: true }; // Optional field
    
    const isValid = value.length >= minLength;
    return {
      isValid,
      message: isValid ? undefined : i18nManager.translate('validation.minLength'),
    };
  }

  // Validate maximum length
  static maxLength(value: string, maxLength: number): ValidationResult {
    if (!value) return { isValid: true }; // Optional field
    
    const isValid = value.length <= maxLength;
    return {
      isValid,
      message: isValid ? undefined : i18nManager.translate('validation.maxLength'),
    };
  }

  // Validate multiple rules
  static validateField(value: any, rules: Array<(value: any) => ValidationResult>): ValidationResult {
    for (const rule of rules) {
      const result = rule(value);
      if (!result.isValid) {
        return result;
      }
    }
    
    return { isValid: true };
  }

  // Validate form object
  static validateForm<T extends Record<string, any>>(
    formData: T,
    validationRules: Record<keyof T, Array<(value: any) => ValidationResult>>
  ): { isValid: boolean; errors: Record<keyof T, string> } {
    const errors: Record<keyof T, string> = {} as Record<keyof T, string>;
    let isValid = true;

    for (const [field, rules] of Object.entries(validationRules) as Array<[keyof T, Array<(value: any) => ValidationResult>]>) {
      const fieldResult = this.validateField(formData[field], rules);
      if (!fieldResult.isValid) {
        errors[field] = fieldResult.message || '';
        isValid = false;
      }
    }

    return { isValid, errors };
  }
}

// Validation rule creators for common patterns
export const createValidationRules = {
  required: () => ValidationUtils.required,
  email: () => ValidationUtils.email,
  phone: () => ValidationUtils.phone,
  password: () => ValidationUtils.password,
  username: () => ValidationUtils.username,
  nationalId: () => ValidationUtils.nationalId,
  date: () => ValidationUtils.date,
  number: () => ValidationUtils.number,
  minLength: (length: number) => (value: string) => ValidationUtils.minLength(value, length),
  maxLength: (length: number) => (value: string) => ValidationUtils.maxLength(value, length),
};