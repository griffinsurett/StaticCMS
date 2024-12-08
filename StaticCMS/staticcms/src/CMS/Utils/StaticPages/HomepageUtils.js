/**
 * HomepageUtils.js
 * Handles homepage generation and integration logic.
 */
import { processStaticPages } from "./StaticPageUtils";

/**
 * Processes pages and applies a homepage override if defined.
 * @param {Array} defaultPages - Array of default pages to process.
 * @param {Object|null} homepageOverride - Optional homepage override object.
 * @returns {Array} - Array of processed pages including the homepage.
 */
export const processHomepage = (defaultPages, homepageOverride = null) => {
  // Process static pages first
  const staticPages = processStaticPages(defaultPages);

  // Find the default homepage from static pages
  const defaultHomepage = staticPages.find((page) => page.id === "home");

  // Ensure a valid homepage exists in the static pages
  if (!defaultHomepage) {
    console.warn("Default homepage not found in static pages.");
    return staticPages; // Return static pages without a homepage
  }

  // Generate the homepage, applying override sections if provided
  const homepage = {
    ...defaultHomepage,
    sections: homepageOverride?.sections || defaultHomepage.sections || [],
  };

  // Return all pages with the generated/overridden homepage
  return [
    ...staticPages.filter((page) => page.id !== "home"), // Exclude default homepage
    homepage, // Add the processed homepage
  ];
};
