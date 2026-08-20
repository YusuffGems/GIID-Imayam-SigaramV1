import type { Maker } from "@/types";
import makerProfile01 from "@/assets/Makers/Maker Profile 01.jpg";

/**
 * Placeholder maker profiles. Replace names, stories and photos with the real
 * details supplied by the institute — the structure stays the same.
 */
export const makers: Maker[] = [
  {
  makerId: "M-01",
  name: "Balaji",
  photo: makerProfile01,
  role: "Leather Craft Artisan",
  skills: ["Cutting", "Skiving", "Hand stitching", "Edge finishing"],
  training: "Certified in Leather Goods Making — 480 training hours",
  experience: "3 years on the production floor",
  story:
    "Learned pattern cutting in the institute workshop and now leads the cutting table for sleeves and pouches, setting the standard other trainees follow.",
  achievements: ["Cutting table lead", "Exhibited at 4 craft fairs"],
  socialImpact: "Earns a monthly income from every batch produced.",
  craftSpecialisation: "Flat goods and sleeves",
 
},
  {
    makerId: "M-02",
    photo: makerProfile01,
    name: "Maker Profile 02",
    role: "Stitching Specialist",
    skills: ["Saddle stitching", "Machine stitching", "Assembly"],
    training: "Certified in Hand Stitching Techniques — 360 training hours",
    experience: "2 years",
    story:
      "Known in the workshop for an unhurried, perfectly even saddle stitch, and now trains newer members on thread tension and spacing.",
    achievements: ["Peer trainer", "Zero-rework record for two quarters"],
    socialImpact: "Mentors three new trainees each cycle.",
    craftSpecialisation: "Hand stitched wallets and card holders",
  },
  {
    makerId: "M-03",
    name: "Maker Profile 03",
    role: "Bag Maker",
    skills: ["Moulding", "Weaving", "Lining", "Hardware fitting"],
    training: "Certified in Bag Construction — 520 training hours",
    experience: "4 years",
    story:
      "Moved from simple keychains to fully constructed sling and cross body bags, and now prototypes new shapes with the design team.",
    achievements: ["Designed the weaving bag pattern", "Exhibition demonstrator"],
    socialImpact: "Runs a small independent order book alongside workshop work.",
    craftSpecialisation: "Moulded and woven bags",
  },
  {
    makerId: "M-04",
    name: "Maker Profile 04",
    role: "Finishing & Quality Artisan",
    skills: ["Burnishing", "Painting edges", "Polishing", "Quality check"],
    training: "Certified in Finishing & QC — 300 training hours",
    experience: "2 years",
    story:
      "Handles the last stage of every product, checking edges, stitch lines and hardware before a piece is allowed to carry the label.",
    achievements: ["Final QC sign-off", "Reduced finishing time by a third"],
    socialImpact: "Holds a supervisory role within the unit.",
    craftSpecialisation: "Edge finishing and quality control",
  },
  {
    makerId: "M-05",
    name: "Maker Profile 05",
    role: "Small Goods Artisan",
    skills: ["Punching", "Riveting", "Embossing", "Assembly"],
    training: "Certified in Small Leather Goods — 280 training hours",
    experience: "1.5 years",
    story:
      "Specialises in the small pieces that need the steadiest hands — keychains, tags and AirPods cases produced in matched sets.",
    achievements: ["Fastest accurate assembly in the unit"],
    socialImpact: "First salaried role, now saving independently.",
    craftSpecialisation: "Keychains and small accessories",
  },
  {
    makerId: "M-06",
    name: "Maker Profile 06",
    role: "Material & Design Assistant",
    skills: ["Material selection", "Pattern making", "Colour matching"],
    training: "Certified in Leather Material Studies — 340 training hours",
    experience: "3 years",
    story:
      "Selects hides, matches colours across a batch and translates design sketches into working patterns for the floor.",
    achievements: ["Built the in-house pattern library"],
    socialImpact: "Represents the unit at buyer meetings.",
    craftSpecialisation: "Material selection and patterns",
  },
];

export const makerById = (id: string) => makers.find((m) => m.makerId === id);