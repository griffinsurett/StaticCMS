import { BuildMenus } from "./Utils/DynamicContent/MenuUtils";

// Define static menu structure
const Menus = [
  {
    id: 0,
    name: "Primary",
    items: [
      { title: "Home", slug: "/" }, // Static menu item
    ],
  },
  {
    id: 1,
    name: "Footer",
    items: [
      { title: "Privacy Policy", slug: "/privacy-policy" },
      { title: "Cookie Policy", slug: "/cookie-policy" },
    ],
  },
];

const generateContactMenu = (contactCollection) => {
  if (!contactCollection || !contactCollection.contactInfo) return null;

  return {
    id: Menus.length,
    name: "Contact Info",
    items: contactCollection.contactInfo.map((info) => ({
      title: info.label,
      link: info.href,
    })),
  };
};

const generateSocialMediaMenu = (contactCollection) => {
  if (!contactCollection || !contactCollection.socialMedia) return null;

  return {
    id: Menus.length + 1,
    name: "Social Media",
    items: contactCollection.socialMedia.map((social) => ({
      title: social.platform,
      link: social.href,
      icon: social.icon,
    })),
  };
};

const generateCTAMenu = (siteSettings) => {
    if (!siteSettings) {
      console.error("generateCTAMenu: siteSettings is undefined");
      return null;
    }
  
    return {
      id: Menus.length + 2,
      name: "CTA",
      items: [
        {
          title: siteSettings.CTAButton || "Get a Quote", // Fallback value
          link: siteSettings.CTALink || "/contact-us",   // Fallback value
        },
        {
          title: "Call Us",
          link: `tel:${siteSettings.contactNumber || "1234567890"}`, // Fallback phone number
        },
      ],
    };
  };    

export function generateMenus(processedCollections, siteSettings) {
  // Find the contact collection
  const contactCollection = processedCollections.find((col) => col.collection === "contact");

  // Generate dynamic menus
  const dynamicMenus = BuildMenus(processedCollections, Menus);

  // Add contact, social media, and CTA menus
  const contactMenu = generateContactMenu(contactCollection);
  const socialMediaMenu = generateSocialMediaMenu(contactCollection);
  const ctaMenu = generateCTAMenu(siteSettings, contactCollection);

  if (contactMenu) dynamicMenus.push(contactMenu);
  if (socialMediaMenu) dynamicMenus.push(socialMediaMenu);
  if (ctaMenu) dynamicMenus.push(ctaMenu);

  return dynamicMenus;
}
