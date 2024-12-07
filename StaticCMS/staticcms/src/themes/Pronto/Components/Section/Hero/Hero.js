// Theme/Components/Sections/Hero.js
// HomeHero.js
import React from "react";
import ContentTemplate from "../../ContentTemplate";

const HomeHero = ({ data }) => {
  if (!data || !data.siteTitle || !data.siteDescription) {
    console.error("HomeHero: Missing data for homepage");
    return <p>Something went wrong. Homepage hero data is missing.</p>;
  }

  return (
    <ContentTemplate
      title={data.siteTitle}
      className="home-hero"
      sectionButtonText="Get Started"
    >
      <p>{data.siteDescription}</p>
    </ContentTemplate>
  );
};

export default HomeHero;
