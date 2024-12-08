/**
 * AutoSlug.js
 * Utility to generate automatic slugs for collections and items.
 * Automatically prefixes item slugs with their parent collection name.
 */
const generateSlug = (title) => {
  if (!title) return ""; // Handle cases where no title is provided
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove special characters
    .trim()
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
};

const autoSlug = (collections) => {
  collections.forEach((collection) => {
    // Generate a slug for the collection if it doesn't already have one
    if (!collection.slug) {
      collection.slug = `/${generateSlug(collection.title || collection.heading)}`;
    }

    // Process items for collections
    if (Array.isArray(collection.items)) {
      const parentSlug = collection.slug ? collection.slug.replace(/\/$/, "") : "";

      collection.items.forEach((item) => {
        const itemSlug = generateSlug(item.title || item.name);
        if (!item.slug) {
          item.slug = `${parentSlug}/${itemSlug}`;
        } else if (!item.slug.startsWith(parentSlug)) {
          item.slug = `${parentSlug}/${item.slug.replace(/^\//, "")}`;
        }
      });
    }
  });

  return collections; // Return updated collections
};

export default autoSlug;