/**
 * MenuUtils.js
 * Dynamically builds menus based on collections and pages.
 */

const BuildMenus = (collections, menus) => {
  const dynamicMenus = [...menus]; // Clone the existing menus

  // General logic for adding collections to menus
  collections.forEach((collection) => {
    const targetMenus = Array.isArray(collection.addToMenu)
      ? collection.addToMenu
      : [collection.addToMenu];

    targetMenus.forEach((menuName) => {
      if (!menuName) return;

      let targetMenu = dynamicMenus.find((menu) => menu.name === menuName);
      if (!targetMenu) {
        targetMenu = { id: dynamicMenus.length, name: menuName, items: [] };
        dynamicMenus.push(targetMenu);
      }

      const collectionMenuItem = {
        title: collection.title || collection.heading,
        slug: collection.slug,
        link: collection.link || null,
        items: [],
      };

      if (collection.addItemsToMenu && Array.isArray(collection.items)) {
        collection.items.forEach((item) => {
          collectionMenuItem.items.push({
            title: item.title || item.name,
            slug: item.slug,
            link: item.link || null,
          });
        });
      }

      if (collection.putItemsInSubMenu && collection.putItemsInSubMenu === menuName) {
        const subMenuParent = targetMenu.items.find((menuItem) => menuItem.title === collection.title);
        if (subMenuParent) {
          subMenuParent.items = [...subMenuParent.items, ...collectionMenuItem.items];
        } else {
          targetMenu.items.push(collectionMenuItem);
        }
      } else {
        targetMenu.items.push(collectionMenuItem);
      }
    });
  });

  return dynamicMenus;
};

export { BuildMenus };
