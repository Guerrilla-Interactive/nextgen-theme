'use client';

import { useState, useEffect, useMemo } from 'react';
import { BrandConfig, BrandDefinition, BrandFilters, BrandCategory } from './types';
import { generateBrand } from './generator';
import { 
  fetchBrands, 
  fetchBrandById, 
  fetchCategories, 
  fetchFeaturedBrands,
  searchBrands,
  fetchBrandsByCategory 
} from './api';

// Custom hook for fetching and managing brands
export function useBrands(filters: BrandFilters = {}) {
  const [brandConfigs, setBrandConfigs] = useState<BrandConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<BrandCategory[]>([]);

  // Generate full brand definitions from configs
  const brands = useMemo(() => {
    return brandConfigs.map(config => generateBrand(config));
  }, [brandConfigs]);

  // Fetch brands on mount or when filters change
  useEffect(() => {
    let mounted = true;
    
    async function loadBrands() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetchBrands(filters);
        
        if (mounted) {
          setBrandConfigs(response.data);
          setCategories(response.categories || []);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load brands');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadBrands();

    return () => {
      mounted = false;
    };
  }, [filters.categories, filters.intensities, filters.search, filters.page, filters.limit]);

  return {
    brands,
    brandConfigs,
    loading,
    error,
    categories,
    refresh: () => {
      setLoading(true);
      // This will trigger the useEffect to reload
    }
  };
}

// Custom hook for a single brand
export function useBrand(brandId: string) {
  const [brandConfig, setBrandConfig] = useState<BrandConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Generate full brand definition from config
  const brand = useMemo(() => {
    return brandConfig ? generateBrand(brandConfig) : null;
  }, [brandConfig]);

  useEffect(() => {
    let mounted = true;
    
    async function loadBrand() {
      try {
        setLoading(true);
        setError(null);
        
        const config = await fetchBrandById(brandId);
        
        if (mounted) {
          setBrandConfig(config);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load brand');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    if (brandId) {
      loadBrand();
    }

    return () => {
      mounted = false;
    };
  }, [brandId]);

  return {
    brand,
    brandConfig,
    loading,
    error
  };
}

// Custom hook for featured brands
export function useFeaturedBrands(limit: number = 6) {
  const [brandConfigs, setBrandConfigs] = useState<BrandConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const brands = useMemo(() => {
    return brandConfigs.map(config => generateBrand(config));
  }, [brandConfigs]);

  useEffect(() => {
    let mounted = true;
    
    async function loadFeaturedBrands() {
      try {
        setLoading(true);
        setError(null);
        
        const configs = await fetchFeaturedBrands(limit);
        
        if (mounted) {
          setBrandConfigs(configs);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load featured brands');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadFeaturedBrands();

    return () => {
      mounted = false;
    };
  }, [limit]);

  return {
    brands,
    brandConfigs,
    loading,
    error
  };
}

// Custom hook for search
export function useBrandSearch(query: string, limit: number = 10) {
  const [brandConfigs, setBrandConfigs] = useState<BrandConfig[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const brands = useMemo(() => {
    return brandConfigs.map(config => generateBrand(config));
  }, [brandConfigs]);

  useEffect(() => {
    let mounted = true;
    
    async function searchBrandsData() {
      if (!query.trim()) {
        setBrandConfigs([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const configs = await searchBrands(query, limit);
        
        if (mounted) {
          setBrandConfigs(configs);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to search brands');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    // Debounce the search
    const timeoutId = setTimeout(searchBrandsData, 300);

    return () => {
      clearTimeout(timeoutId);
      mounted = false;
    };
  }, [query, limit]);

  return {
    brands,
    brandConfigs,
    loading,
    error
  };
}

// Custom hook for brands by category
export function useBrandsByCategory(category: BrandCategory, limit?: number) {
  const [brandConfigs, setBrandConfigs] = useState<BrandConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const brands = useMemo(() => {
    return brandConfigs.map(config => generateBrand(config));
  }, [brandConfigs]);

  useEffect(() => {
    let mounted = true;
    
    async function loadBrandsByCategory() {
      try {
        setLoading(true);
        setError(null);
        
        const configs = await fetchBrandsByCategory(category, limit);
        
        if (mounted) {
          setBrandConfigs(configs);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load brands by category');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadBrandsByCategory();

    return () => {
      mounted = false;
    };
  }, [category, limit]);

  return {
    brands,
    brandConfigs,
    loading,
    error
  };
}

// Custom hook for categories
export function useCategories() {
  const [categories, setCategories] = useState<BrandCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    
    async function loadCategories() {
      try {
        setLoading(true);
        setError(null);
        
        const categoryList = await fetchCategories();
        
        if (mounted) {
          setCategories(categoryList);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load categories');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadCategories();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    categories,
    loading,
    error
  };
} 