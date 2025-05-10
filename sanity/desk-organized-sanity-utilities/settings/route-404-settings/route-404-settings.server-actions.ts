import { sanityFetch } from "@/sanity/lib/live";
import { route404SettingsQuery } from "./route-404-settings.query";


export const fetchRoute404Settings = async () => {
  try {
    const { data } = await sanityFetch({
      query: `*[_type == "route404Settings"][0]{${route404SettingsQuery}}`,
      perspective: "published",
    });
    return data || {};
  } catch (error) {
    console.error("Error fetching 404 settings:", error);
    return {};
  }
}; 