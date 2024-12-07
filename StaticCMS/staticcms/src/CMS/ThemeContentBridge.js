// ThemeContentBridge.js
// ThemeContentBridge.js
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPageStructure } from "./Utils/GetPageStructure";
import { getSiteSettings } from "./Utils/GetContent/GetSettings";
import { setTitle } from "./Utils/SetTitle";
import Content from "./Content"; // Access menus directly

const useThemeContent = (pageId) => {
  const location = useLocation();
  const [content, setContent] = useState({
    pageStructure: null,
    siteSettings: null,
    loading: true,
  });

  useEffect(() => {
    const fetchContent = () => {
      const pageStructure = getPageStructure(pageId);
      const siteSettings = { ...getSiteSettings(), menus: Content.menus }; // Add menus

      if (pageStructure && siteSettings) {
        // Dynamically set the document title
        setTitle({
          pageTitle: pageStructure.title,
          siteTitle: siteSettings.siteTitle,
        });
      }

      setContent({
        pageStructure,
        siteSettings,
        loading: false,
      });
    };

    setContent({ pageStructure: null, siteSettings: null, loading: true });
    fetchContent();
  }, [location, pageId]);

  return content;
};

export default useThemeContent;