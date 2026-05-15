import { Session, User } from '@supabase/supabase-js';
import * as Notifications from 'expo-notifications';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  session: Session | null;
  user: User | null;
  loading: boolean;
  isOffline: boolean;
  setIsOffline: (value: boolean) => void;
  refreshConnection: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  const fetchSession = async () => {
    try {
      setLoading(true);
      // Define a timeout for the session fetch to detect offline database
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Database connection timeout')), 8000)
      );

      const sessionPromise = supabase.auth.getSession();

      const { data: { session: currentSession }, error } = await Promise.race([sessionPromise, timeoutPromise]) as any;

      if (error) throw error;

      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsOffline(false);
      setLoading(false);
    } catch (error) {
      console.error('Connection/Auth check error:', error);
      setIsOffline(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    signIn: async (email: string, password: string) => {
      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        // Increment login count
        await supabase.rpc('increment_login_count');

        // Increment xp
        await supabase.rpc('increment_xp');

        // Schedule notification on successful login
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Login Bem-sucedido! 🚀",
            body: "Bom te ver de novo!",
            sound: 'default',
            data: { rota: "Home" },
          },
          trigger: { type: 'timeInterval', seconds: 1 },
        });
      } catch (error: any) {
        if (error.message?.includes('FetchError') || error.message?.includes('Network request failed')) {
          setIsOffline(true);
        }
        throw error;
      }
    },
    logout: async () => {
      await supabase.auth.signOut();
    },
    session,
    user,
    loading,
    isOffline,
    setIsOffline,
    refreshConnection: fetchSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};