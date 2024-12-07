import React from "react";

const AboutInfo = ({ title, data }) => {
  if (!data || data.length === 0) {
    console.error("AboutInfo: Missing or empty data");
    return <p>No information available.</p>;
  }

  return (
    <section className="about-info">
      {title && <h2>{title}</h2>}
      <ul>
        {data.map((info, index) => (
          <li key={index}>
            <h3>{info.title}</h3>
            <p>{info.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AboutInfo;
