// Content.js
import processDynamicContent from "./Utils/DynamicContent/DynamicContentUtils";
import defaultPages from "./DefaultPages";
import { processHomepage } from "./Utils/StaticPages/HomepageUtils";
import RelationalUtil from "./Utils/Relations/RelationsUtil";
import { BuildMenus } from "./Utils/DynamicContent/MenuUtils";
import { setLogo } from "./Utils/SEO/SetLogo";

import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faEnvelope,
  faTools,
  faWrench,
  faTruck,
  faHardHat,
  faHouseUser,
  faHammer,
  faBuilding,
  faTractor,
  faPaintRoller,
  faTrash,
  faSnowplow,
  faRoad,
  faShower,
  faRulerCombined,
  faHome,
  faWater,
  faTree,
  faLeaf,
  faCubes,
  faScrewdriver,
  faWarehouse,
  faPlusSquare,
  faWindowRestore,
  faLayerGroup,
  faDungeon,
  faMonument,
  faChair,
  faGavel,
  faRibbon,
} from "@fortawesome/free-solid-svg-icons";

const Logo = `${process.env.PUBLIC_URL}/transparent-bg-pronto.png`;

// Site Settings
const siteSettings = {
  siteTitle: "Pronto Construction and Demolition",
  siteTagline: "Serving Middlesex County, NJ and More",
  siteDescription:
    "Providing expert construction, renovation, and demolition services to Middlesex County and beyond, ensuring quality and reliability at every step.",
  siteLogo: Logo,
  siteCompany: "Pronto Construction and Demolition",
  businessOwner: "Anthony Gonzalez",
  ownerDateOfBirth: "2004-12-30",
  BusinessName: "Pronto Construction LLC",
  CTAButton: "Get Quote",
  CTALink: "/contact-us",
  get Copyright() {
    const currentYear = new Date().getFullYear();
    return `Copyright © ${currentYear} ${this.BusinessName}`;
  },
  get ownerAge() {
    const today = new Date();
    const birthDate = new Date(this.ownerDateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }
    return age;
  },
};

setLogo(siteSettings.siteLogo);

// Collections
const collections = [
  {
    id: 1,
    collection: "about",
    heading: "About Pronto Construction and Demolition",
    title: "About Us",
    addToMenu: "Primary", // Add to Primary menu
    hasPage: true,
    slug: "/about-us",
    sections: ["hero", "about", "purpose"],
    redirectFrom: ["/about"],
    paragraphs: [
      "At Pronto Construction and Demolition, we specialize in delivering high-quality renovation, construction, and demolition services. With a commitment to excellence and over 10 years of industry experience, we serve Middlesex County, NJ, and surrounding areas.",
      "Our team is skilled in a wide range of services, from interior renovations to complete demolition projects. Whether you need a new kitchen, a repaired deck, or an entire building torn down, we're here to get the job done right.",
    ],
    button: { text: "Learn More", link: "#" },
    aboutInfo: [
      {
        title: "Who We Are",
        heading: "Founded By Teens on a Mission for Success...",
        description: `Founded in 2022 by ${siteSettings.ownerAge}-year-old Anthony Gonzalez and his team, Pronto Construction and Demolition is a dynamic company built on a passion for construction and dedication to excellence. We combine youthful energy with industry expertise to deliver exceptional results for our clients.`,
      },
      {
        title: "What We Do",
        description:
          "We specialize in construction, renovation, and demolition services. Our team tackles projects of all sizes, from interior upgrades and exterior enhancements to complete structure demolitions. Whatever your vision, we turn it into reality.",
      },
    ],
    purpose: {
      title: "Our Purpose",
      heading: "Mission and Vision",
      description:
        "At Pronto Construction and Demolition, our purpose is to deliver exceptional results and build lasting trust with our clients. Below are the principles that guide everything we do:",
      items: [
        {
          title: "Mission",
          description:
            "To provide reliable, efficient, and high-quality construction and demolition services that meet the unique needs of our clients.",
        },
        {
          title: "Vision",
          description:
            "To be the most trusted construction and demolition company in Middlesex County, known for unparalleled service and exceptional results.",
        },
      ],
    },
    aboutHeading: "About Us", // Added a dedicated heading for the About section
    teamImages: [
      "https://picsum.photos/400/300?random=1",
      "https://picsum.photos/400/300?random=2",
    ],
  },
  {
    id: 2,
    collection: "contact",
    heading: "Contact Us.",
    title: "Contact Us",
    paragraph: `Discover answers to common questions about ${siteSettings.siteTitle}.`,
    hasPage: true,
    slug: "/contact-us",
    addToMenu: "Primary",
    sections: ["hero", "contact"],
    redirectFrom: ["/contact"],
    contactInfo: [
      {
        icon: faPhone,
        label: "Phone",
        value: "(732) 939-1309",
        get href() {
          return `tel:${this.value.replace(/\D/g, "")}`; // Removes non-numeric characters
        },
      },
      {
        icon: faEnvelope,
        label: "Email",
        value: "prontonj@gmail.com",
        get href() {
          return `mailto:${this.value}`;
        },
      },
    ],
    socialMedia: [
      {
        platform: "Facebook",
        href: "https://facebook.com/griffinswebservices",
        icon: faFacebook,
      },
      {
        platform: "X",
        href: "https://twitter.com/griffinswebservices",
        icon: faXTwitter,
      },
      {
        platform: "LinkedIn",
        href: "https://linkedin.com/company/griffins-web-services",
        icon: faLinkedin,
      },
      {
        platform: "Instagram",
        href: "https://instagram.com/griffinswebservices",
        icon: faInstagram,
      },
    ],
    formFields: [
      { name: "firstName", placeholder: "First Name" },
      { name: "lastName", placeholder: "Last Name" },
      { name: "email", placeholder: "Email" },
      { name: "phone", placeholder: "Phone Number" },
      { name: "subject", placeholder: "Subject" },
      { name: "message", placeholder: "Message" },
    ],
    button: { text: "Submit", link: "#" },
  },
  {
    id: 3,
    collection: "services",
    heading: "Our Services",
    title: "Services",
    hasPage: true,
    itemsHasPage: true,
    slug: "/services",
    redirectFrom: ["/service"],
    sections: ["hero", "services", "benefits", "projects", "testimonials"],
    itemSections: ["hero", "projects", "testimonials"],
    addToMenu: ["Primary"], // Add to multiple menus
    addItemsToMenu: "Primary",
    putItemsInSubMenu: "Primary",
    paragraph:
      "Explore our wide range of services designed to meet your needs.",
    items: [
      {
        icon: faTools,
        title: "Construction Work",
        description: "Comprehensive construction services for all your needs.",
      },
      {
        icon: faHardHat,
        title: "Roofing",
        description:
          "Professional roofing services to keep your home protected.",
      },
      {
        icon: faRoad,
        title: "Paving",
        description: "Durable and attractive paving solutions.",
      },
      {
        icon: faHammer,
        title: "Kitchen Renovation, Construction, Repair",
        description:
          "Transform your kitchen with expert renovation and repair services.",
      },
      {
        icon: faShower,
        title: "Bathroom Renovation, Construction, Repair",
        description: "Upgrade your bathroom with our specialized services.",
      },
      {
        icon: faRulerCombined,
        title: "Interior Renovation, Construction, Repair",
        description:
          "Revitalize your home's interior with our expert craftsmanship.",
      },
      {
        icon: faHome,
        title: "Exterior Renovation, Construction, Repair",
        description:
          "Enhance your home's exterior with quality renovation services.",
      },
      {
        icon: faWater,
        title: "Gutter Work",
        description:
          "Reliable gutter installation, maintenance, and repair services.",
      },
      {
        icon: faPaintRoller,
        title: "Painting (Interior/Exterior)",
        description: "High-quality painting services to transform your space.",
        slug: "/painting",
      },
      {
        icon: faGavel,
        title: "Concrete and Masonry",
        description: "Expert concrete and masonry work for lasting results.",
      },
      {
        icon: faTree,
        title: "Landscaping Design",
        description:
          "Creative landscaping solutions for a beautiful outdoor space.",
      },
      {
        icon: faLeaf,
        title: "Brush Removal",
        description: "Efficient brush removal services to clear your property.",
      },
      {
        icon: faCubes,
        title: "Hardscaping",
        description: "Durable and attractive hardscaping solutions.",
      },
      {
        icon: faBuilding,
        title: "Brick and Stone",
        description: "Specialized brick and stone work for custom designs.",
      },
      {
        icon: faTruck,
        title: "Excavation",
        description: "Professional excavation services for your projects.",
      },
      {
        icon: faScrewdriver,
        title: "Structural Framework Repair",
        description: "Repair and strengthen your building's framework.",
      },
      {
        icon: faWarehouse,
        title: "Small-Medium Structures Building",
        description:
          "Construction services for small to medium-sized structures.",
      },
      {
        icon: faPlusSquare,
        title: "First Floor Home Additions",
        description:
          "Expand your home with expertly built first-floor additions.",
      },
      {
        icon: faWindowRestore,
        title: "Windows Installation",
        description: "Professional window installation services for your home.",
      },
      {
        icon: faLayerGroup,
        title: "Siding and Trims",
        description: "High-quality siding and trim installation services.",
      },
      {
        icon: faDungeon,
        title: "Basement Renovation",
        description:
          "Transform your basement into a functional and beautiful space.",
      },
      {
        icon: faMonument,
        title: "Attic Renovation",
        description:
          "Make the most of your attic space with our renovation services.",
      },
      {
        icon: faChair,
        title: "Deck/Patio Remodeling",
        description:
          "Upgrade your outdoor space with our deck and patio remodeling services.",
      },
      {
        icon: faHammer,
        title: "Demolition (Interior)",
        description: "Efficient and safe interior demolition services.",
      },
      {
        icon: faGavel,
        title: "Demolition (Exterior)",
        description:
          "Professional exterior demolition for structures of all sizes.",
      },
      {
        icon: faTrash,
        title: "Small Structure Demolition",
        description:
          "Specialized demolition for decks, patios, pools, and sheds.",
      },
      {
        icon: faBuilding,
        title: "Medium-Sized Building Demolition",
        description: "Expert demolition for garages and house extensions.",
      },
    ],
  },
  {
    id: 4,
    collection: "projects",
    heading: "Our Projects",
    title: "Projects",
    hasPage: true,
    itemsHasPage: true,
    addToMenu: "Primary", // Add to Primary menu
    slug: "/projects",
    sections: ["hero", "projects", "testimonials"],
    itemSections: ["hero", "services", "testimonials"],
    paragraph: "See how we’ve helped clients transform their spaces.",
    items: [
      {
        id: 1,
        name: "Residential Kitchen Remodel",
        description:
          "A complete renovation of a family kitchen to modern standards.",
        slug: "/kitchen-remodel",
        image: "https://example.com/kitchen.jpg",
      },
      {
        id: 2,
        name: "Garage Demolition",
        description: "Efficiently demolished a medium-sized garage structure.",
        slug: "/garage-demolition",
        image: "https://example.com/garage.jpg",
      },
    ],
  },
  {
    id: 5,
    collection: "testimonials",
    heading: "What Our Clients Say",
    title: "Testimonials",
    hasPage: true,
    addToMenu: "Primary", // Add to Primary menu
    slug: "/testimonials",
    sections: ["hero", "testimonials"],
    items: [
      {
        name: "John Doe",
        quote:
          "Pronto Construction did an amazing job with our home renovation. Highly recommend!",
        position: "Homeowner, Middlesex County",
      },
      {
        name: "Jane Smith",
        quote:
          "Their demolition services were efficient and thorough. Very professional team.",
        position: "Business Owner, NJ",
      },
    ],
  },
  {
    id: 6,
    collection: "faq",
    heading: "Frequently Asked Questions",
    title: "FAQ",
    hasPage: true,
    addToMenu: "Primary", // Add to Primary menu
    slug: "/faq",
    sections: ["hero", "faq"],
    redirectFrom: ["/questions"],
    items: [
      {
        question: "What services do you offer?",
        answer:
          "We offer a wide range of construction, renovation, and demolition services. From kitchen remodeling to complete building demolition, we have the expertise to handle any project.",
      },
      {
        question: "How long have you been in business?",
        answer:
          "Pronto Construction and Demolition has been serving Middlesex County and surrounding areas for over 10 years. Our team brings a wealth of experience and expertise to every project.",
      },
      {
        question: "Do you provide free estimates?",
        answer:
          "Yes, we offer free estimates for all our services. Contact us to discuss your project and receive a detailed estimate tailored to your needs.",
      },
      {
        question: "Are you licensed and insured?",
        answer:
          "Yes, we are fully licensed and insured to provide construction, renovation, and demolition services in Middlesex County and beyond. Our team adheres to all safety regulations and industry standards.",
      },
      {
        question: "What areas do you serve?",
        answer:
          "We proudly serve Middlesex County, NJ, and surrounding areas. Contact us to discuss your project and learn more about our service area.",
      },
    ],
  },
  {
    id: 7,
    collection: "Benefits",
    heading: "Benefits of Choosing Pronto",
    title: "Benefits of Choosing Pronto",
    hasPage: false,
    sections: ["hero", "blog"],
    items: [
      {
        title: "Satifaction Guarantee",
        icon: faRibbon,
        description: "We guarantee your satisfaction with our services.",
      },
      {
        title: "Quick and Efficient",
        icon: faTruck,
        description:
          "We pride ourselves on our swift and efficient junk removal process, guaranteeing a hassle-free experience that minimizes disruption to your day.",
      },
    ],
  },
];

// Homepage Override
const homepageOverride = {
  sections: [
    "hero",
    "about",
    "services",
    "benefits",
    "projects",
    "testimonials",
    "contact",
  ],
};

// Process Pages
const pages = processHomepage(defaultPages, homepageOverride);
// Process collections to generate slugs and pages
const { processedCollections, processedPages } = processDynamicContent({
  pages,
  collections,
});

// Add relationships
const relationalUtil = new RelationalUtil({
  collections: processedCollections,
});
// Define relationships
relationalUtil.relate("services", "/painting", "projects", "/kitchen-remodel");
relationalUtil.relate(
  "projects",
  "/kitchen-remodel",
  "testimonials",
  "/john-doe"
);

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

console.log("Menus: ", Menus);

// Generate menus dynamically
const dynamicMenus = BuildMenus(processedCollections, Menus);
console.log(dynamicMenus);

// Export menus along with the rest of the content
const Content = {
  siteSettings,
  collections: processedCollections,
  pages: processedPages,
  menus: dynamicMenus,
};

export default Content;
