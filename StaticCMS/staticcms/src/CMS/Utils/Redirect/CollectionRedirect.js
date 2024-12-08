// CMS/Utils/CollectionRedirect.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import Content from "../../Content";

/**
 * Generate redirect routes from unprefixed slugs to prefixed slugs.
 * This handles dynamic redirections based on the collection structure.
 */
const generateRedirectRoutes = () => {
  const redirects = [];

  Content.collections
    .filter((collection) => collection.itemsHasPage && Array.isArray(collection.items))
    .forEach((collection) => {
      const collectionSlug = collection.slug.replace(/\/$/, ""); // Ensure no trailing slash
      collection.items.forEach((item) => {
        if (!item.slug) return;

        // Unprefixed and prefixed slugs
        const unprefixedSlug = `/${item.slug.split("/").pop()}`; // Extract item name
        const prefixedSlug = item.slug;

        // Add redirect for unprefixed → prefixed
        redirects.push(
          <Route
            key={`${unprefixedSlug}-to-${prefixedSlug}`}
            path={unprefixedSlug}
            element={<Navigate to={prefixedSlug} replace />}
          />
        );
      });
    });

  return redirects;
};

export default generateRedirectRoutes;
