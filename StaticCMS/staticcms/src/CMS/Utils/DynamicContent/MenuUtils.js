/**
 * MenuUtils.js
 * Dynamically builds menus based on collections and pages.
 */

const BuildMenus = (collections, menus) => {
  const dynamicMenus = [...menus]; // Clone the existing menus

   // Create a Contact Info Menu
   const contactCollection = collections.find((col) => col.collection === "contact");
   if (contactCollection && contactCollection.contactInfo) {
     const contactMenu = {
       id: dynamicMenus.length,
       name: "Contact Info",
       items: contactCollection.contactInfo.map((info) => ({
         title: info.label,
         link: info.href,
       })),
     };
     dynamicMenus.push(contactMenu);
   }
 
   // Create a Social Media Menu
   if (contactCollection && contactCollection.socialMedia) {
     const socialMediaMenu = {
       id: dynamicMenus.length,
       name: "Social Media",
       items: contactCollection.socialMedia.map((social) => ({
         title: social.platform,
         link: social.href,
         icon: social.icon,
       })),
     };
     dynamicMenus.push(socialMediaMenu);
   }

  // Iterate through all collections to add dynamic menu items
  collections.forEach((collection) => {
    // Determine which menus the collection should be added to
    const targetMenus = Array.isArray(collection.addToMenu)
      ? collection.addToMenu
      : [collection.addToMenu];

    targetMenus.forEach((menuName) => {
      if (!menuName) return;

      // Find the target menu or create it if it doesn't exist
      let targetMenu = dynamicMenus.find((menu) => menu.name === menuName);
      if (!targetMenu) {
        targetMenu = { id: dynamicMenus.length, name: menuName, items: [] };
        dynamicMenus.push(targetMenu);
      }

      // Create a menu item for the collection
      const collectionMenuItem = {
        title: collection.title || collection.heading,
        slug: collection.slug,
        link: collection.link || null, // Fallback to link if no slug
        items: [], // Submenu for items (populated below if needed)
      };

      // If addItemsToMenu is true, add the collection's items as submenu items
      if (collection.addItemsToMenu && Array.isArray(collection.items)) {
        collection.items.forEach((item) => {
          collectionMenuItem.items.push({
            title: item.title || item.name,
            slug: item.slug,
            link: item.link || null, // Fallback to link if no slug
          });
        });
      }

      // Add the collection menu item to the target menu
      if (collection.putItemsInSubMenu && collection.putItemsInSubMenu === menuName) {
        // Add as a dropdown/submenu in the same menu
        const subMenuParent = targetMenu.items.find((menuItem) => menuItem.title === collection.title);

        if (subMenuParent) {
          subMenuParent.items = [...subMenuParent.items, ...collectionMenuItem.items];
        } else {
          // Add the entire collection as a new dropdown
          targetMenu.items.push(collectionMenuItem);
        }
      } else {
        // Add as a standalone menu item
        targetMenu.items.push(collectionMenuItem);
      }
    });
  });

  return dynamicMenus;
};

export { BuildMenus };
