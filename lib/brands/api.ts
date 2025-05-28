import { BrandConfig, BrandApiResponse, BrandFilters, BrandCategory, StyleIntensity } from './types';

// In-memory cache for brands (you could replace this with Redis, etc.)
let brandsCache: BrandConfig[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Sample brand configurations (this would come from your database/CMS)
const SAMPLE_BRAND_CONFIGS: BrandConfig[] = [
  // Gaming brands
  { name: "Razer", id: "razer", category: "gaming", intensity: "extreme", primaryColor: "#44D62C", isDark: true },
  { name: "Alienware", id: "alienware", category: "gaming", intensity: "bold", primaryColor: "#00D4FF", isDark: true },
  { name: "ASUS ROG", id: "asus-rog", category: "gaming", intensity: "bold", primaryColor: "#FF0050", isDark: true },
  { name: "Corsair", id: "corsair", category: "gaming", intensity: "moderate", primaryColor: "#FFD800", isDark: true },
  { name: "SteelSeries", id: "steelseries", category: "gaming", intensity: "bold", primaryColor: "#FF6600", isDark: true },
  
  // Enterprise brands
  { name: "Microsoft", id: "microsoft", category: "enterprise", intensity: "moderate", primaryColor: "#0078D4", isDark: false },
  { name: "IBM", id: "ibm", category: "enterprise", intensity: "subtle", primaryColor: "#1261FE", isDark: false },
  { name: "Salesforce", id: "salesforce", category: "enterprise", intensity: "moderate", primaryColor: "#00A1E0", isDark: false },
  { name: "Oracle", id: "oracle", category: "enterprise", intensity: "subtle", primaryColor: "#F80000", isDark: false },
  { name: "SAP", id: "sap", category: "enterprise", intensity: "subtle", primaryColor: "#0FAAFF", isDark: false },
  
  // Minimal brands
  { name: "Apple", id: "apple", category: "minimal", intensity: "subtle", primaryColor: "#1d1d1f", isDark: false },
  { name: "Linear", id: "linear", category: "minimal", intensity: "moderate", primaryColor: "#5E6AD2", isDark: false },
  { name: "Notion", id: "notion", category: "minimal", intensity: "subtle", primaryColor: "#000000", isDark: false },
  { name: "Arc Browser", id: "arc", category: "minimal", intensity: "moderate", primaryColor: "#FF6B6B", isDark: false },
  { name: "Raycast", id: "raycast", category: "minimal", intensity: "moderate", primaryColor: "#FF6363", isDark: false },
  
  // Creative brands
  { name: "Adobe", id: "adobe", category: "creative", intensity: "moderate", primaryColor: "#FF0000", isDark: false },
  { name: "Figma", id: "figma", category: "creative", intensity: "bold", primaryColor: "#F24E1E", isDark: false },
  { name: "Dribbble", id: "dribbble", category: "creative", intensity: "bold", primaryColor: "#EA4C89", isDark: false },
  { name: "Behance", id: "behance", category: "creative", intensity: "bold", primaryColor: "#1769FF", isDark: false },
  { name: "Canva", id: "canva", category: "creative", intensity: "bold", primaryColor: "#00C4CC", isDark: false },
  
  // Luxury brands
  { name: "Rolex", id: "rolex", category: "luxury", intensity: "extreme", primaryColor: "#A37E2C", isDark: true },
  { name: "Tesla", id: "tesla", category: "luxury", intensity: "bold", primaryColor: "#CC0000", isDark: true },
  { name: "Porsche", id: "porsche", category: "luxury", intensity: "bold", primaryColor: "#D5001C", isDark: false },
  { name: "Louis Vuitton", id: "louis-vuitton", category: "luxury", intensity: "extreme", primaryColor: "#8B4513", isDark: true },
  { name: "Gucci", id: "gucci", category: "luxury", intensity: "extreme", primaryColor: "#006B3C", isDark: true },
  
  // Tech brands
  { name: "GitHub", id: "github", category: "tech", intensity: "moderate", primaryColor: "#24292F", isDark: false },
  { name: "Vercel", id: "vercel", category: "tech", intensity: "subtle", primaryColor: "#000000", isDark: false },
  { name: "Stripe", id: "stripe", category: "tech", intensity: "moderate", primaryColor: "#635BFF", isDark: false },
  { name: "OpenAI", id: "openai", category: "tech", intensity: "moderate", primaryColor: "#10A37F", isDark: false },
  { name: "Anthropic", id: "anthropic", category: "tech", intensity: "subtle", primaryColor: "#D4A574", isDark: false },
  
  // Healthcare brands
  { name: "Philips Healthcare", id: "philips-health", category: "healthcare", intensity: "moderate", primaryColor: "#00629B", isDark: false },
  { name: "Teladoc", id: "teladoc", category: "healthcare", intensity: "subtle", primaryColor: "#5B2C87", isDark: false },
  { name: "Epic Systems", id: "epic", category: "healthcare", intensity: "moderate", primaryColor: "#2E8B57", isDark: false },
  { name: "Cerner", id: "cerner", category: "healthcare", intensity: "subtle", primaryColor: "#FF4B00", isDark: false },
  { name: "Allscripts", id: "allscripts", category: "healthcare", intensity: "subtle", primaryColor: "#0067B1", isDark: false },
  
  // Finance brands
  { name: "Goldman Sachs", id: "goldman", category: "finance", intensity: "subtle", primaryColor: "#002D72", isDark: false },
  { name: "Robinhood", id: "robinhood", category: "finance", intensity: "moderate", primaryColor: "#00C805", isDark: false },
  { name: "Coinbase", id: "coinbase", category: "finance", intensity: "moderate", primaryColor: "#0052FF", isDark: false },
  { name: "JPMorgan Chase", id: "jpmorgan", category: "finance", intensity: "subtle", primaryColor: "#0066B2", isDark: false },
  { name: "PayPal", id: "paypal", category: "finance", intensity: "moderate", primaryColor: "#0070BA", isDark: false },
  
  // Retail brands
  { name: "Shopify", id: "shopify", category: "retail", intensity: "moderate", primaryColor: "#7AB55C", isDark: false },
  { name: "Amazon", id: "amazon", category: "retail", intensity: "subtle", primaryColor: "#FF9900", isDark: false },
  { name: "Target", id: "target", category: "retail", intensity: "bold", primaryColor: "#CC0000", isDark: false },
  { name: "Walmart", id: "walmart", category: "retail", intensity: "moderate", primaryColor: "#0071CE", isDark: false },
  { name: "eBay", id: "ebay", category: "retail", intensity: "bold", primaryColor: "#E53238", isDark: false },
  
  // Education brands
  { name: "Khan Academy", id: "khan", category: "education", intensity: "moderate", primaryColor: "#14BF96", isDark: false },
  { name: "Coursera", id: "coursera", category: "education", intensity: "moderate", primaryColor: "#0056D3", isDark: false },
  { name: "Duolingo", id: "duolingo", category: "education", intensity: "bold", primaryColor: "#58CC02", isDark: false },
  { name: "edX", id: "edx", category: "education", intensity: "moderate", primaryColor: "#02262B", isDark: false },
  { name: "Udemy", id: "udemy", category: "education", intensity: "bold", primaryColor: "#A435F0", isDark: false },
];

// Utility function to filter brands
function filterBrands(brands: BrandConfig[], filters: BrandFilters): BrandConfig[] {
  let filtered = [...brands];

  // Filter by categories
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(brand => filters.categories!.includes(brand.category));
  }

  // Filter by intensities
  if (filters.intensities && filters.intensities.length > 0) {
    filtered = filtered.filter(brand => filters.intensities!.includes(brand.intensity));
  }

  // Filter by search term
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(brand => 
      brand.name.toLowerCase().includes(searchTerm) ||
      brand.category.toLowerCase().includes(searchTerm) ||
      brand.id.toLowerCase().includes(searchTerm)
    );
  }

  return filtered;
}

// Utility function to paginate results
function paginateResults<T>(items: T[], page: number = 1, limit: number = 50): { 
  data: T[], 
  pagination: { page: number, limit: number, total: number, hasMore: boolean } 
} {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = items.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    pagination: {
      page,
      limit,
      total: items.length,
      hasMore: endIndex < items.length
    }
  };
}

// Mock API functions (replace these with your actual API calls)

/**
 * Fetch brands with filtering and pagination
 */
export async function fetchBrands(filters: BrandFilters = {}): Promise<BrandApiResponse> {
  // Check cache first
  const now = Date.now();
  if (brandsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    const filtered = filterBrands(brandsCache, filters);
    const paginated = paginateResults(filtered, filters.page, filters.limit);
    
    return {
      ...paginated,
      categories: Array.from(new Set(brandsCache.map(b => b.category)))
    };
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));

  // In a real implementation, this would be a database query or external API call
  const allBrands = SAMPLE_BRAND_CONFIGS;
  
  // Update cache
  brandsCache = allBrands;
  cacheTimestamp = now;

  // Apply filters and pagination
  const filtered = filterBrands(allBrands, filters);
  const paginated = paginateResults(filtered, filters.page, filters.limit);

  return {
    ...paginated,
    categories: Array.from(new Set(allBrands.map(b => b.category)))
  };
}

/**
 * Fetch a single brand by ID
 */
export async function fetchBrandById(id: string): Promise<BrandConfig | null> {
  const brands = await fetchBrands();
  return brands.data.find(brand => brand.id === id) || null;
}

/**
 * Get all available categories
 */
export async function fetchCategories(): Promise<BrandCategory[]> {
  const brands = await fetchBrands();
  return brands.categories || [];
}

/**
 * Get popular/featured brands (for homepage, etc.)
 */
export async function fetchFeaturedBrands(limit: number = 6): Promise<BrandConfig[]> {
  const brands = await fetchBrands();
  
  // Return a mix of different categories and intensities
  const featured = brands.data.filter(brand => 
    ['apple', 'razer', 'spotify', 'adobe', 'tesla', 'stripe'].includes(brand.id)
  );
  
  return featured.slice(0, limit);
}

/**
 * Search brands by name
 */
export async function searchBrands(query: string, limit: number = 10): Promise<BrandConfig[]> {
  const brands = await fetchBrands({ search: query, limit });
  return brands.data;
}

/**
 * Get brands by category
 */
export async function fetchBrandsByCategory(category: BrandCategory, limit?: number): Promise<BrandConfig[]> {
  const brands = await fetchBrands({ categories: [category], limit });
  return brands.data;
}

/**
 * Clear the brands cache (useful for testing or when data changes)
 */
export function clearBrandsCache(): void {
  brandsCache = null;
  cacheTimestamp = 0;
}

// Add Spotify to the sample data since it was referenced
SAMPLE_BRAND_CONFIGS.push(
  { name: "Spotify", id: "spotify", category: "creative", intensity: "bold", primaryColor: "#1DB954", isDark: true }
); 