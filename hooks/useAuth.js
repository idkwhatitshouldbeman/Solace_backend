import React, { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/config/supabase';
import { useRouter } from 'next/router';

// Create auth context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const router = useRouter();

  // Initialize auth state
  useEffect(() => {
    // Get current session
    const getSession = async () => {
      setLoading(true);
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setAuthError(error.message);
        }
        
        if (session) {
          const { data: { user }, error: userError } = await supabase.auth.getUser();
          if (userError) {
            console.error('Error getting user:', userError);
            setAuthError(userError.message);
          } else {
            setUser(user);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Unexpected error during auth initialization:', error);
        setAuthError('An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          const { data: { user }, error: userError } = await supabase.auth.getUser();
          if (userError) {
            console.error('Error getting user:', userError);
            setAuthError(userError.message);
          } else {
            setUser(user);
            setAuthError(null);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Clean up subscription
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // Sign up function
  const signUp = async (email, password) => {
    setLoading(true);
    setAuthError(null);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // Ensure redirectTo uses the current origin or the configured site URL
          emailRedirectTo: typeof window !== 'undefined' 
            ? `${window.location.origin}/auth/callback` 
            : `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
        }
      });
      
      if (error) {
        setAuthError(error.message);
        return { success: false, error: error.message };
      }
      
      // Check if email confirmation is required
      if (data?.user && !data?.session) {
        return { 
          success: true, 
          requiresEmailConfirmation: true,
          message: 'Please check your email for a confirmation link.'
        };
      }
      
      return { success: true };
    } catch (error) {
      console.error('Unexpected error during sign up:', error);
      setAuthError('An unexpected error occurred. Please try again.');
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Sign in function
  const signIn = async (email, password) => {
    setLoading(true);
    setAuthError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        // Check for specific error types to provide better feedback
        if (error.message.includes('Email not confirmed')) {
          setAuthError('Please confirm your email address before signing in. Check your inbox for a confirmation link.');
          return { 
            success: false, 
            error: 'Please confirm your email address before signing in.',
            requiresEmailConfirmation: true
          };
        }
        
        setAuthError(error.message);
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (error) {
      console.error('Unexpected error during sign in:', error);
      setAuthError('An unexpected error occurred. Please try again.');
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Error signing out:', error);
        setAuthError(error.message);
        return { success: false, error: error.message };
      }
      
      router.push('/');
      return { success: true };
    } catch (error) {
      console.error('Unexpected error during sign out:', error);
      setAuthError('An unexpected error occurred. Please try again.');
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (email) => {
    setLoading(true);
    setAuthError(null);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: typeof window !== 'undefined' 
          ? `${window.location.origin}/reset-password` 
          : `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`
      });
      
      if (error) {
        setAuthError(error.message);
        return { success: false, error: error.message };
      }
      
      return { 
        success: true,
        message: 'Password reset instructions have been sent to your email.'
      };
    } catch (error) {
      console.error('Unexpected error during password reset:', error);
      setAuthError('An unexpected error occurred. Please try again.');
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Update password function
  const updatePassword = async (newPassword) => {
    setLoading(true);
    setAuthError(null);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) {
        setAuthError(error.message);
        return { success: false, error: error.message };
      }
      
      return { success: true, message: 'Password updated successfully.' };
    } catch (error) {
      console.error('Unexpected error during password update:', error);
      setAuthError('An unexpected error occurred. Please try again.');
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Resend confirmation email
  const resendConfirmationEmail = async (email) => {
    setLoading(true);
    setAuthError(null);
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: typeof window !== 'undefined' 
            ? `${window.location.origin}/auth/callback` 
            : `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
        }
      });
      
      if (error) {
        setAuthError(error.message);
        return { success: false, error: error.message };
      }
      
      return { 
        success: true,
        message: 'Confirmation email has been resent. Please check your inbox.'
      };
    } catch (error) {
      console.error('Unexpected error resending confirmation email:', error);
      setAuthError('An unexpected error occurred. Please try again.');
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Clear auth error
  const clearAuthError = () => {
    setAuthError(null);
  };

  // Auth context value
  const value = {
    user,
    loading,
    authError,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    resendConfirmationEmail,
    clearAuthError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
