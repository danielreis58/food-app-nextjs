'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    // Simulating an API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Set a fake token cookie
    document.cookie = 'token=fake-jwt-token;path=/';
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Welcome Back</h1>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              defaultValue="john.doe@example.com"
              className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              readOnly
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              defaultValue="password123"
              className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              readOnly
            />
          </div>

          <button
            onClick={handleSignIn}
            disabled={isLoading}
            className="w-full bg-[#7B1FA2] text-white py-2 px-4 rounded-md hover:bg-[#6a1b9a] transition-colors duration-200 disabled:opacity-70"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </div>
    </main>
  );
}
