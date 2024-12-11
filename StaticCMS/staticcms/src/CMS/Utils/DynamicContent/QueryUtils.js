/**
 * MenuUtils.js
 * Dynamically builds menus based on collections and pages.
 */

const BuildQueries = (collections, queries) => {
  const dynamicQueries = [...queries]; // Clone the existing queries

  // General logic for adding collections to queries
  collections.forEach((collection) => {
    const targetQueries = Array.isArray(collection.addToQuery)
      ? collection.addToQuery
      : [collection.addToQuery];

    targetQueries.forEach((queryName) => {
      if (!queryName) return;

      let targetQuery = dynamicQueries.find((query) => query.name === queryName);
      if (!targetQuery) {
        targetQuery = { id: dynamicQueries.length, name: queryName, items: [] };
        dynamicQueries.push(targetQuery);
      }

      const collectionQueryItem = {
        title: collection.title || collection.heading,
        slug: collection.slug,
        link: collection.link || null,
        items: [],
      };

      if (collection.addItemsToQuery && Array.isArray(collection.items)) {
        collection.items.forEach((item) => {
          collectionQueryItem.items.push({
            title: item.title || item.name,
            slug: item.slug,
            link: item.link || null,
          });
        });
      }

      if (collection.putItemsInSubQuery && collection.putItemsInSubQuery === queryName) {
        const subQueryParent = targetQuery.items.find((queryItem) => queryItem.title === collection.title);
        if (subQueryParent) {
          subQueryParent.items = [...subQueryParent.items, ...collectionQueryItem.items];
        } else {
          targetQuery.items.push(collectionQueryItem);
        }
      } else {
        targetQuery.items.push(collectionQueryItem);
      }
    });
  });

  return dynamicQueries;
};

export { BuildQueries };
