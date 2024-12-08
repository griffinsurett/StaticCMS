// CMS/Utils/GetPageStructure.js
import Content from "../../Content";
import { getCollection } from "../GetContent/GetCollection";
import { RelationalUtil } from "../Relations/RelationsUtil"; // Import relational utility

const relationalUtil = new RelationalUtil(Content);

/**
 * Fetches the new page structure based on the provided `pageId`.
 * Ensures all content is dynamically fetched and related entities are reset.
 * @param {string} pageId - The identifier for the page.
 * @returns {object} - The structured data for the page.
 */
export const getPageStructure = (pageId) => {
  const page = Content.pages.find((p) => p.id === pageId);
  if (!page) {
    console.error(`[getPageStructure] Page '${pageId}' not found in CMS.`);
    return null;
  }

  // Determine if the page is a collection or an item within a collection
  const isCollectionPage = page.isCollection;
  const collection = isCollectionPage ? getCollection(pageId) : null;
  const isItemPage =
    collection &&
    Array.isArray(collection.items) &&
    collection.items.some((item) => item.slug === pageId);

  // Handle individual item pages
  const item = isItemPage
    ? collection.items.find((i) => i.slug === pageId)
    : null;

  // Resolve title, description, and content
  const title =
    item?.title ||
    item?.name ||
    page.title ||
    collection?.title ||
    "Untitled Page";
  const description =
    item?.description || collection?.paragraph || page.description || "";
  const content = page.content || item?.content || "";

  let sections = [];

  if (isCollectionPage && !isItemPage && collection) {
    // Handle collection-level pages
    const aggregatedRelations = {};

    if (Array.isArray(collection.items)) {
      collection.items.forEach((item) => {
        Object.keys(item).forEach((relationKey) => {
          if (relationKey.startsWith("relatedTo")) {
            const relatedCollectionName = relationKey
              .replace("relatedTo", "")
              .toLowerCase();
            const relatedSlugs = item[relationKey] || [];

            const relatedItems = relatedSlugs
              .map((slug) =>
                relationalUtil.findEntityBySlug(relatedCollectionName, slug)
              )
              .filter(Boolean);

            aggregatedRelations[relatedCollectionName] =
              aggregatedRelations[relatedCollectionName] || [];
            aggregatedRelations[relatedCollectionName].push(...relatedItems);
          }
        });
      });

      // Deduplicate aggregated relations
      Object.keys(aggregatedRelations).forEach((key) => {
        aggregatedRelations[key] = [
          ...new Map(
            aggregatedRelations[key].map((item) => [item.slug, item])
          ).values(),
        ];
      });
    }

    sections = page.sections.map((sectionKey) => {
      let sectionData;

      if (sectionKey === collection.collection) {
        sectionData = collection; // Direct collection data
      } else if (sectionKey in collection) {
        sectionData = collection[sectionKey]; // Collection-specific property
      } else {
        sectionData = {
          ...(getCollection(sectionKey) || {}),
          items: aggregatedRelations[sectionKey] || [],
        }; // Fallback to general collection
      }

      return { key: sectionKey, data: sectionData };
    });
  } else if (isItemPage && collection) {
    // Handle item pages
    sections = page.sections.map((sectionKey) => {
      const sectionData =
        sectionKey === collection.collection
          ? item
          : getCollection(sectionKey, pageId);

      return { key: sectionKey, data: sectionData };
    });
  } else {
    // Handle static pages or homepage
    sections = page.sections.map((sectionKey) => {
      const sectionData = getCollection(sectionKey, pageId);
      return { key: sectionKey, data: sectionData };
    });
  }

  // Construct and return the final page structure
  const pageStructure = { title, description, content, sections };
  return pageStructure;
};
