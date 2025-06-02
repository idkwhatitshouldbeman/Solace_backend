import React from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/config/supabase';

// This page handles auth callbacks from Supabase
export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Handle the auth callback
    const handleAuthCallback = async () => {
      setLoading(true);
      
      try {
        // Get the hash from the URL if it exists
        const hash = window.location.hash;
        
        if (hash) {
          // Process the callback
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error('Error processing auth callback:', error);
            setError(error.message);
          } else if (data?.session) {
            // Successfully authenticated, redirect to dashboard
            router.push('/dashboard');
          } else {
            // No session but no error, something went wrong
            setError('Authentication failed. Please try again.');
          }
        } else {
          // No hash in URL, redirect to home
          router.push('/');
        }
      } catch (err) {
        console.error('Unexpected error during auth callback:', err);
        setError('An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="auth-callback-container">
      {loading ? (
        <p>Processing authentication...</p>
      ) : error ? (
        <div>
          <p>Error: {error}</p>
          <button onClick={() => router.push('/')}>Return to Home</button>
        </div>
      ) : null}
    </div>
  );
}
