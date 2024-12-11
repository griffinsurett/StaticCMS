/**
 * Dynamically sets the document title based on the page and site settings.
 * @param {Object} options - Options for setting the title.
 * @param {string} [options.pageTitle] - The title of the current page.
 * @param {string} options.siteTitle - The default site title.
 */
export const setTitle = ({ pageTitle, siteTitle }) => {
    if (!siteTitle) {
      console.error("Site title is required to set the document title.");
      return;
    }
  
    const newTitle =
      pageTitle && pageTitle !== "Untitled Page"
        ? `${pageTitle} - ${siteTitle}`
        : siteTitle;
    document.title = newTitle;
  };
  