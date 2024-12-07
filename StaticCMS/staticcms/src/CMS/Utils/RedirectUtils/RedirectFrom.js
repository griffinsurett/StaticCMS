// CMS/Utils/RedirectFromLogic.js
// CMS/Utils/RedirectFromLogic.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import Content from "../../Content";

/**
 * Generate routes for `redirectFrom` entries in collections and items.
 */
const generateRedirectFromRoutes = () => {
  const redirects = [];

  // Process collection-level redirects
  Content.collections.forEach((collection) => {
    if (collection.redirectFrom) {
      collection.redirectFrom.forEach((redirectPath) => {
        // console.log(
        //   `Collection Redirect: ${redirectPath} -> ${collection.slug}`
        // );
        redirects.push(
          <Route
            key={`redirect-collection-${redirectPath}`}
            path={redirectPath}
            element={<Navigate to={collection.slug} replace />}
          />
        );
      });
    }

    // Process item-level redirects
    if (collection.itemsHasPage && Array.isArray(collection.items)) {
      collection.items.forEach((item) => {
        if (item.redirectFrom) {
          item.redirectFrom.forEach((redirectPath) => {
            // console.log(`It`em Redirect: ${redirectPath} -> ${item.slug}`);
            redirects.push(
              <Route
                key={`redirect-item-${redirectPath}`}
                path={redirectPath}
                element={<Navigate to={item.slug} replace />}
              />
            );
          });
        }
      });
    }
  });

  return redirects;
};

export default generateRedirectFromRoutes;
