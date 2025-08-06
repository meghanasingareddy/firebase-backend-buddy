import { useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const WARNING_TIME = 5 * 60 * 1000; // 5 minutes before timeout

export const useSessionTimeout = () => {
  const { user, signOut } = useAuth();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const warningRef = useRef<NodeJS.Timeout>();

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningRef.current) clearTimeout(warningRef.current);

    if (user) {
      // Show warning 5 minutes before timeout
      warningRef.current = setTimeout(() => {
        toast({
          title: 'Session Expiring',
          description: 'Your session will expire in 5 minutes. Please save your work.',
          variant: 'destructive',
        });
      }, SESSION_TIMEOUT - WARNING_TIME);

      // Auto logout after timeout
      timeoutRef.current = setTimeout(() => {
        toast({
          title: 'Session Expired',
          description: 'You have been automatically signed out for security.',
          variant: 'destructive',
        });
        signOut();
      }, SESSION_TIMEOUT);
    }
  };

  useEffect(() => {
    if (user) {
      resetTimer();

      // Reset timer on user activity
      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
      const resetOnActivity = () => resetTimer();

      events.forEach(event => {
        document.addEventListener(event, resetOnActivity, true);
      });

      return () => {
        events.forEach(event => {
          document.removeEventListener(event, resetOnActivity, true);
        });
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (warningRef.current) clearTimeout(warningRef.current);
      };
    }
  }, [user, signOut]);

  return { resetTimer };
};