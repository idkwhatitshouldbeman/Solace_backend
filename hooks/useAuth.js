import React from 'react';
import styled from 'styled-components';
import theme from '../config/theme';

const useAuth = () => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  
  React.useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const supabase = require('../config/supabase').default;
      
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      
      if (session) {
        setUser(session.user);
      }
      
      setLoading(false);
      
      // Set up auth state change listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === 'SIGNED_IN' && session) {
            setUser(session.user);
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
          }
        }
      );
      
      return () => {
        subscription.unsubscribe();
      };
    };
    
    checkSession();
  }, []);
  
  const signUp = async (email, password) => {
    try {
      const supabase = require('../config/supabase').default;
      const validation = require('../utils/validation').default;
      
      // Validate email and password
      if (!validation.isValidEmail(email)) {
        throw new Error('Invalid email format');
      }
      
      const passwordValidation = validation.validatePassword(password);
      if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.feedback);
      }
      
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Create user record in users table
      if (data.user) {
        await supabase
          .from('users')
          .insert([{
            id: data.user.id,
            email: data.user.email,
          }]);
      }
      
      return { success: true, user: data.user };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };
  
  const signIn = async (email, password) => {
    try {
      const supabase = require('../config/supabase').default;
      
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Update last_active in users table
      if (data.user) {
        await supabase
          .from('users')
          .update({ last_active: new Date() })
          .eq('id', data.user.id);
      }
      
      return { success: true, user: data.user };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };
  
  const signOut = async () => {
    try {
      const supabase = require('../config/supabase').default;
      
      setLoading(true);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };
  
  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut
  };
};

export default useAuth;
