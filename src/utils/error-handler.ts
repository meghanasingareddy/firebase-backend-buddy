import { AuthError } from '@supabase/supabase-js';

export const getSecureErrorMessage = (error: AuthError | Error): string => {
  // Map internal error messages to user-friendly ones
  const errorMap: Record<string, string> = {
    'Invalid login credentials': 'The email or password you entered is incorrect.',
    'User already registered': 'An account with this email already exists. Please sign in instead.',
    'Email not confirmed': 'Please check your email and click the confirmation link before signing in.',
    'Signup disabled': 'New account registration is currently disabled.',
    'Email rate limit exceeded': 'Too many attempts. Please wait a few minutes before trying again.',
    'Captcha verification failed': 'Please complete the security verification.',
    'Password should be at least 6 characters': 'Password must be at least 8 characters long.',
  };

  if (error.message in errorMap) {
    return errorMap[error.message];
  }

  // For security, don't expose internal errors to users
  if (error.message.includes('JWT') || error.message.includes('token')) {
    return 'Session expired. Please sign in again.';
  }

  if (error.message.includes('network') || error.message.includes('fetch')) {
    return 'Network error. Please check your connection and try again.';
  }

  // Generic fallback for unknown errors
  return 'Something went wrong. Please try again later.';
};

export const logSecurityEvent = (event: string, details: Record<string, unknown>) => {
  // In production, this would send to a security logging service
  if (process.env.NODE_ENV === 'development') {
    console.warn(`Security Event: ${event}`, details);
  }
};