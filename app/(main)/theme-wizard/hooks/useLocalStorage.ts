'use client';

import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';

// Type for the setter function - matches useState API
type SetValue<T> = Dispatch<SetStateAction<T>>;

/**
 * Custom hook for persistent storage using localStorage
 * @param key The localStorage key to store the data under
 * @param initialValue The initial value if no value is found in storage
 * @returns A stateful value and a function to update it (like useState)
 */
export function useLocalStorage<T>(
  key: string, 
  initialValue: T
): [T, SetValue<T>] {
  // State to store our value - initialized with a function to avoid unnecessary computation
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Don't run this during server-side rendering
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      // Get stored item
      const item = window.localStorage.getItem(key);
      // Parse stored json or return initialValue if none
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });
  
  // Create a stable setValue function that doesn't re-create on every render
  const setValue = useCallback((value: SetStateAction<T>) => {
    try {
      // Save state
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Set to state first (this is important - we update React state first)
      setStoredValue(valueToStore);
      
      // Then update localStorage (if browser environment)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);
  
  // Update local state if localStorage is updated in another tab
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Function to handle storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          // Only update state if the value actually changed
          const newValue = JSON.parse(e.newValue) as T;
          setStoredValue(newValue);
        } catch (error) {
          console.warn(`Error parsing localStorage change for key "${key}":`, error);
        }
      }
    };
    
    // Listen for storage events (from other tabs)
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);
  
  return [storedValue, setValue];
} 