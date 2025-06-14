import React, { useState, useEffect, createContext, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userRole: string | null;
  userId: string | null;
  login: (credentials: any) => Promise<void>; // Replace 'any' with specific credential type later
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const login = async (credentials: any) => {
    // Simulate a backend login call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful login
        setIsLoggedIn(true);
        // Simulate different roles based on some condition, e.g., email
        if (credentials.email === 'parent@example.com') {
          setUserRole('parent');
          setUserId('parent-123');
        } else if (credentials.email === 'teacher@example.com') {
          setUserRole('teacher');
          setUserId('teacher-456');
        } else {
          setUserRole('student');
          setUserId('student-789');
        }
        resolve();
      }, 1000); // Simulate network delay
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserId(null);
    // Potentially clear data related to the logged-in user
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};