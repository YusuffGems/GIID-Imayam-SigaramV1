import logo from "@/assets/lssc-logo.png";

export const site = {
  name: "GIID Imayam Sigaram",
  tagline: "Crafting Ability Into Opportunity",
  supportingLine: "Handcrafted Products. Empowered Lives.",

  whatsappNumber: "919962021547",
  displayPhone: "+91 99620 21547",
  email: "works.moganapriya@gmail.com",

  logoUrl: logo,

  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3078.4973026783687!2d80.13676023676248!3d12.939623900097466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f0160fdf1%3A0xc359e40fb157d261!2sGovernment%20Institute%20for%20Intellectually%20Differently%20abled!5e1!3m2!1sen!2sin!4v1786534399296!5m2!1sen!2sin",

  mapLink: "https://share.google/HVkRoaFbp0acPYlNt",

  address: "Government Institute for Intellectually Differently Abled, Chennai, Tamil Nadu, India",
} as const;

/** Impact statistics — edit these values in one place. */
export const impactStats = [
  { label: "Skills Developed", value: "18+" },
  { label: "Products Created", value: "2,400+" },
  { label: "Makers Empowered", value: "60+" },
  { label: "Training Hours", value: "9,600+" },
  { label: "Events & Exhibitions", value: "24" },
];

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/products" },
  { label: "Categories", to: "/categories" },
  { label: "Our Story", to: "/our-story" },
  { label: "Makers", to: "/makers" },
  { label: "Gallery", to: "/gallery" },
  { label: "Events", to: "/events" },
  { label: "Contact", to: "/contact" },
];

export const mobileNavLinks = [
  ...navLinks.slice(0, 5),
  { label: "Making Process", to: "/making-process" },
  { label: "Gallery", to: "/gallery" },
  { label: "Events", to: "/events" },
  { label: "Impact", to: "/impact" },
  { label: "Contact", to: "/contact" },
];
