'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';

export default function HomePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  if (!user) {
    // Show login and signup forms
    return (
      <div>
        <LoginForm />
        <SignupForm />
      </div>
    );
  }

  // Show main page for logged-in user
  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      <button onClick={() => signOut(auth)}>Logout</button>
      {/* Here you will display family members and add/remove UI */}
    </div>
  );
}