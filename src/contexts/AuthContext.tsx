import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { logSecurityEvent } from '@/utils/error-handler';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Log security events
        if (event === 'SIGNED_IN') {
          logSecurityEvent('user_signed_in', { userId: session?.user?.id });
        } else if (event === 'SIGNED_OUT') {
          logSecurityEvent('user_signed_out', { timestamp: new Date().toISOString() });
        } else if (event === 'TOKEN_REFRESHED') {
          logSecurityEvent('token_refreshed', { userId: session?.user?.id });
        }

        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      // Clear any sensitive data from localStorage/sessionStorage
      const sensitiveKeys = ['user-preferences', 'cached-data'];
      sensitiveKeys.forEach(key => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      });

      await supabase.auth.signOut();
      logSecurityEvent('manual_signout', { timestamp: new Date().toISOString() });
    } catch (error) {
      logSecurityEvent('signout_error', { error: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    }
  };

  const value = {
    user,
    session,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};