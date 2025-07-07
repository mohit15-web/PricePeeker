// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        mapUser(session.user);
      }
      setIsLoading(false);
    };

    getSession();

    const { data: subscription } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        mapUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  const mapUser = (supabaseUser: SupabaseUser) => {
    const userData: User = {
      id: supabaseUser.id,
      name: supabaseUser.user_metadata.full_name || supabaseUser.email || '',
      email: supabaseUser.email || '',
      picture: supabaseUser.user_metadata.avatar_url,
    };
    setUser(userData);
  };

  const loginWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast({ title: 'Login failed', description: error.message });
    } else if (data.session?.user) {
      mapUser(data.session.user);
      toast({ title: 'Login successful', description: `Welcome ${data.session.user.email}` });
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    toast({
      title: "Logged out",
      description: "You've been logged out successfully",
      duration: 3000,
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, loginWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
