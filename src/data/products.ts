import type { Product, ProductVideo } from "@/types";

import photoCardHolder from "@/assets/products/CARD_HOLDER_150.jpg";
import photoClutchBag from "@/assets/products/Clutch_Bag_525.jpg";
import photoCoaster from "@/assets/products/COASTER_295.jpg";
import photoDiaryCover from "@/assets/products/DIARY_COVER_460.jpg";
import photoIpadCover from "@/assets/products/IPAD_COVER_750.jpg";
import photoKeycase from "@/assets/products/KEYCHAIN_200.jpg";
import photoLaptopCover from "@/assets/products/LAPTOP_COVER_1200.jpg";
import photoLogoKeychain from "@/assets/products/LOGO_KEY_CHAIN_150.jpg";
import photoMousePad from "@/assets/products/MOUSE_PAD_450.jpg";
import photoMultiPurpose from "@/assets/products/MULTI-PURPOSE_175.jpg";
import photoPencilStand from "@/assets/products/PENCIL_STAND_250.jpg";
import photoShoulderBag from "@/assets/products/Shoulder_Bag_675.jpg";
import photoSmartCard from "@/assets/products/SMARTCARD_150.jpg";
import photoSuspencePouch from "@/assets/products/SUSPENSE_POUCH_100.jpg";
import photoTagKeychain from "@/assets/products/TAG_KEYCHAIN_150.jpg";
import MenWallet from "@/assets/products/Men's_Wallet_1750.jpg";
import WeavingBag from "@/assets/products/Weaving_Bag_5200.jpg";
import SlingBag from "@/assets/products/Sling_Bag_3400.jpg";
import MouldedBag from "@/assets/products/Moulded_Bag_3600.jpg";
import CrossBodyBag from "@/assets/products/Cross_Body_Bag_3900.jpg";
import AirPodsCase from "@/assets/products/AirPods_Case_750.jpeg";
import Belt from "@/assets/products/Belt_1850.jpg";
import GuitarKeychain from "@/assets/products/Guitar_Keychain_450.jpg";
import LeafKeychain from "@/assets/products/Leaf_Keychain_390.jpg";
import laptopSleeveVideo from "@/assets/videos/LAPTOP_SLEEVE.mp4";
import Keychain_Video from "@/assets/videos/Keychain cum Card Holder Video.mp4";
import iPad_Sleeve_Video from "@/assets/videos/iPad Sleeve Video.mp4";
import Shoulder_Bag from "@/assets/videos/Shoulder Bag Video.mp4";
import Diary_Cover from "@/assets/videos/Diary Cover.mp4";

/**
 * Single source of truth for the catalogue.
 * Add a row below to publish a new product — every page reads from here.
 * Replace `images` with real photographs when they are supplied; the UI falls
 * back to a neutral placeholder while the array is empty.
 */
interface ProductSeed {
  sl: string;
  name: string;
  slug: string;
  categories: string[];
  short: string;
  full?: string;
  price: number | null;
  makerId: string;
  materials?: string[];
  dimensions?: string;
  weight?: string;
  colors?: string[];
  tags?: string[];
  featured?: boolean;
  bestseller?: boolean;
  newProduct?: boolean;
  popularity?: number;
  photos?: { url: string; alt: string }[];
  /** Video links: a YouTube/Vimeo URL or a direct .mp4/.webm file URL. */
  videos?: ProductVideo[];
}

const seeds: ProductSeed[] = [
  {
    sl: "001",
    name: "Laptop Sleeve",
    slug: "laptop-sleeve",
    categories: ["office-accessories", "leather-accessories", "travel-accessories"],
    short: "A padded, hand-stitched sleeve that protects laptop.",
    price: 1200,
    makerId: "M-01",
    dimensions: "36 x 26 x 2 cm",
    weight: "420 g",
    featured: true,
    bestseller: true,
    popularity: 96,
    tags: ["laptop", "work", "sleeve"],

    photos: [
      {
        url: photoLaptopCover,
        alt: "Black, red and stone leather laptop sleeves with envelope flaps, stacked",
      },
    ],

    videos: [
      {
        src: laptopSleeveVideo,
        title: "Laptop Sleeve product video",
        type: "video/mp4",
        poster: photoLaptopCover,
      },
    ],
  },

  {
    sl: "002",
    name: "iPad Sleeve",
    slug: "ipad-sleeve",
    categories: ["office-accessories", "leather-accessories"],
    short: "A slim tablet sleeve with a soft lining and clean burnished edges.",
    price: 750,
    makerId: "M-01",
    dimensions: "27 x 20 x 1.5 cm",
    weight: "240 g",
    featured: true,
    popularity: 88,
    tags: ["ipad", "tablet"],
    photos: [
      {
        url: photoIpadCover,
        alt: "Tan and black grained leather iPad sleeves with flap closures",
      },
    ],
    videos: [
      {
        src: iPad_Sleeve_Video,
        title: "iPad Sleeve product video",
        type: "video/mp4",
        poster: photoIpadCover,
      },
    ],
  },

  {
    sl: "003",
    name: "Clutch",
    slug: "clutch",
    categories: ["bags", "lifestyle-products"],
    short: "An evening clutch with a structured body and hand-set zip.",
    price: 525,
    makerId: "M-03",
    dimensions: "26 x 15 x 4 cm",
    weight: "310 g",
    popularity: 74,
    tags: ["clutch", "evening"],
    photos: [
      {
        url: photoClutchBag,
        alt: "Black leather envelope clutch bag with a metal press stud",
      },
    ],
  },

  {
    sl: "004",
    name: "Keychain cum Card Holder",
    slug: "keychain-cum-card-holder",
    categories: ["keychains", "wallets", "handmade-gifts"],
    short: "Two everyday carries in one compact leather piece.",
    price: 200,
    makerId: "M-05",
    dimensions: "10 x 7 cm",
    weight: "45 g",
    bestseller: true,
    popularity: 91,
    tags: ["keychain", "cards", "gift"],
    photos: [
      {
        url: photoKeycase,
        alt: "Three leather key cases in brown, yellow and red, each holding a row of key hooks",
      },
    ],
    videos: [
      {
        src: Keychain_Video,
        title: "Keychain cum Card Holder product video",
        type: "video/mp4",
        poster: photoKeycase,
      },
    ],
  },

  {
    sl: "005",
    name: "Feature Keychain",
    slug: "feature-keychain",
    categories: ["keychains", "handmade-gifts"],
    short: "A sculpted keychain finished with a solid brass ring.",
    price: 150,
    makerId: "M-05",
    dimensions: "9 x 3 cm",
    weight: "25 g",
    popularity: 68,
    tags: ["keychain", "gift"],
    photos: [
      {
        url: photoLogoKeychain,
        alt: "Brown leather tag keychain with a stitched edge and metal clasp",
      },
    ],
  },

  {
    sl: "006",
    name: "AirPods Case",
    slug: "airpods-case",
    categories: ["leather-accessories", "lifestyle-products"],
    short: "A snug moulded case that ages beautifully with daily use.",
    price: 750,
    makerId: "M-05",
    dimensions: "6 x 5.5 x 3 cm",
    weight: "35 g",
    newProduct: true,
    popularity: 82,
    tags: ["airpods", "case"],
    photos: [
      {
        url: AirPodsCase,
        alt: "Black leather AirPods case with gold speckled grain, a pearl press stud and a swivel clasp",
      },
    ],
  },

  {
    sl: "007",
    name: "Leaf Keychain",
    slug: "leaf-keychain",
    categories: ["keychains", "handmade-gifts"],
    short: "A hand-cut leaf silhouette with a burnished edge.",
    price: 390,
    makerId: "M-05",
    dimensions: "8 x 4 cm",
    weight: "22 g",
    popularity: 61,
    tags: ["keychain", "leaf"],
    photos: [
      {
        url: LeafKeychain,
        alt: "Tan and black leaf-shaped leather keychains with brass swivel clasps and split rings",
      },
    ],
  },

  {
    sl: "008",
    name: "Card Holder — Type 01",
    slug: "card-holder-type-01",
    categories: ["wallets", "leather-accessories"],
    short: "A two-pocket card holder in a single folded panel.",
    price: 150,
    makerId: "M-02",
    dimensions: "10 x 7 cm",
    weight: "40 g",
    popularity: 70,
    tags: ["card holder", "wallet"],
    photos: [
      {
        url: photoCardHolder,
        alt: "Black grained leather card holder with contrast stitching and a metal press stud",
      },
    ],
  },

  {
    sl: "009",
    name: "Card Holder — Type 02",
    slug: "card-holder-type-02",
    categories: ["wallets", "leather-accessories"],
    short: "A four-slot holder with a central note pocket.",
    price: 150,
    makerId: "M-02",
    dimensions: "10.5 x 7.5 cm",
    weight: "48 g",
    popularity: 66,
    tags: ["card holder"],
    photos: [
      {
        url: photoSmartCard,
        alt: "Four slim leather card sleeves in navy, brown, red and orange with white stitching",
      },
    ],
  },

  {
    sl: "010",
    name: "Card Holder — Type 03",
    slug: "card-holder-type-03",
    categories: ["wallets", "office-accessories"],
    short: "A vertical business-card holder for desk and pocket.",
    price: 720,
    makerId: "M-02",
    dimensions: "7 x 10.5 cm",
    weight: "50 g",
    popularity: 58,
    tags: ["card holder", "business"],
    photos: [
      {
        url: photoSmartCard,
        alt: "Four slim leather card sleeves in navy, brown, red and orange with white stitching",
      },
    ],
  },

  {
    sl: "011",
    name: "Card Holder — Type 04",
    slug: "card-holder-type-04",
    categories: ["wallets"],
    short: "A contrast-stitched holder with a pull tab.",
    price: 760,
    makerId: "M-02",
    dimensions: "10 x 7.5 cm",
    weight: "52 g",
    popularity: 55,
    tags: ["card holder"],
    photos: [
      {
        url: photoSmartCard,
        alt: "Four slim leather card sleeves in navy, brown, red and orange with white stitching",
      },
    ],
  },

  {
    sl: "012",
    name: "Card Holder — Type 05",
    slug: "card-holder-type-05",
    categories: ["wallets", "handmade-gifts"],
    short: "A minimal sleeve holder sized for six cards.",
    price: 640,
    makerId: "M-02",
    dimensions: "10 x 7 cm",
    weight: "42 g",
    popularity: 53,
    tags: ["card holder", "gift"],
    photos: [
      {
        url: photoSmartCard,
        alt: "Four slim leather card sleeves in navy, brown, red and orange with white stitching",
      },
    ],
  },

  {
    sl: "013",
    name: "Multipurpose Pouch",
    slug: "multipurpose-pouch",
    categories: ["pouches", "travel-accessories"],
    short: "A zipped pouch for cables, cosmetics or stationery.",
    price: 175,
    makerId: "M-03",
    dimensions: "22 x 13 x 6 cm",
    weight: "180 g",
    featured: true,
    popularity: 79,
    tags: ["pouch", "organiser"],
    photos: [
      {
        url: photoMultiPurpose,
        alt: "Orange grained leather multipurpose zip pouch for cables and stationery",
      },
    ],
  },

  {
    sl: "014",
    name: "Mouse Pad",
    slug: "mouse-pad",
    categories: ["office-accessories", "lifestyle-products"],
    short: "A weighted desk pad with a smooth, sealed surface.",
    price: 450,
    makerId: "M-01",
    dimensions: "25 x 20 cm",
    weight: "160 g",
    popularity: 49,
    tags: ["desk", "office"],
    photos: [
      {
        url: photoMousePad,
        alt: "Three round leather mouse pads stacked in blue, black and yellow",
      },
    ],
  },

  {
    sl: "015",
    name: "Moulded Bag",
    slug: "moulded-bag",
    categories: ["bags"],
    short: "A wet-moulded body that holds its shape for years.",
    price: 4600,
    makerId: "M-03",
    dimensions: "30 x 22 x 10 cm",
    weight: "820 g",
    featured: true,
    popularity: 85,
    tags: ["bag", "moulded"],
    photos: [
      {
        url: MouldedBag,
        alt: "Cream wet-moulded leather shoulder bag with a curved flap and slim strap",
      },
    ],
  },

  {
    sl: "016",
    name: "Weaving Bag",
    slug: "weaving-bag",
    categories: ["bags", "lifestyle-products"],
    short: "Hand-woven leather strips over a structured frame.",
    price: 5200,
    makerId: "M-03",
    dimensions: "32 x 24 x 12 cm",
    weight: "900 g",
    bestseller: true,
    popularity: 89,
    tags: ["bag", "woven"],
    photos: [
      {
        url: WeavingBag,
        alt: "Hand-woven bag in a green and natural zigzag weave with a slim curved handle",
      },
    ],
  },

  {
    sl: "017",
    name: "Sling Bag",
    slug: "sling-bag",
    categories: ["bags", "travel-accessories"],
    short: "A compact sling with an adjustable webbing strap.",
    price: 3400,
    makerId: "M-03",
    dimensions: "24 x 18 x 7 cm",
    weight: "560 g",
    newProduct: true,
    popularity: 87,
    tags: ["sling", "bag"],
    photos: [
      {
        url: SlingBag,
        alt: "Black grained leather sling bag with a wide woven strap and gold clasps",
      },
    ],
  },

  {
    sl: "018",
    name: "Cross Body Bag",
    slug: "cross-body-bag",
    categories: ["bags", "travel-accessories"],
    short: "An everyday cross body with a magnetic flap closure.",
    price: 3900,
    makerId: "M-03",
    dimensions: "26 x 20 x 8 cm",
    weight: "640 g",
    popularity: 83,
    tags: ["cross body", "bag"],
    photos: [
      {
        url: CrossBodyBag,
        alt: "Tan grained leather cross body bag with twin zip pockets and an adjustable webbing strap",
      },
    ],
  },

  {
    sl: "019",
    name: "Guitar Keychain",
    slug: "guitar-keychain",
    categories: ["keychains", "handmade-gifts"],
    short: "A miniature guitar cut, layered and hand-burnished.",
    price: 450,
    makerId: "M-05",
    dimensions: "9 x 3 cm",
    weight: "26 g",
    popularity: 60,
    tags: ["keychain", "music", "gift"],
    photos: [
      {
        url: GuitarKeychain,
        alt: "Red grained leather keychains cut in an anchor silhouette with steel split rings",
      },
    ],
  },

  {
    sl: "020",
    name: "Suspence Pouch",
    slug: "suspence-pouch",
    categories: ["pouches", "lifestyle-products"],
    short: "A suspended-body pouch that opens flat on a desk.",
    price: 100,
    makerId: "M-03",
    dimensions: "20 x 12 x 6 cm",
    weight: "170 g",
    popularity: 52,
    tags: ["pouch"],
    photos: [
      {
        url: photoSuspencePouch,
        alt: "Six small zipped leather coin pouches in yellow, grey, red, olive, cream and tan",
      },
    ],
  },

  {
    sl: "021",
    name: "Pencil Stand",
    slug: "pencil-stand",
    categories: ["office-accessories", "lifestyle-products"],
    short: "A firm leather desk stand for pens and tools.",
    price: 250,
    makerId: "M-04",
    dimensions: "10 x 10 x 12 cm",
    weight: "240 g",
    popularity: 47,
    tags: ["desk", "stand"],
    photos: [
      {
        url: photoPencilStand,
        alt: "Black and red leather pencil stands with slit detailing, filled with pens and tools",
      },
    ],
  },

  {
    sl: "022",
    name: "Tag Keychain",
    slug: "tag-keychain",
    categories: ["keychains", "handmade-gifts"],
    short: "A luggage-style tag keychain, easy to personalise.",
    price: 150,
    makerId: "M-05",
    dimensions: "8.5 x 4 cm",
    weight: "24 g",
    popularity: 64,
    tags: ["keychain", "tag", "gift"],
    photos: [
      {
        url: photoTagKeychain,
        alt: "Black and red leather loop keychains with white stitching and metal clasps",
      },
    ],
  },

  {
    sl: "023",
    name: "Belt",
    slug: "belt",
    categories: ["leather-accessories"],
    short: "A full-grain belt cut to length with a brushed buckle.",
    price: 1850,
    makerId: "M-04",
    dimensions: 'Waist 28"–42", 3.5 cm wide',
    weight: "280 g",
    popularity: 76,
    tags: ["belt"],
    photos: [
      {
        url: Belt,
        alt: "Dark brown full-grain leather belt coiled beside a brushed antique-gold pin buckle",
      },
    ],
  },

  {
    sl: "024",
    name: "Men's Wallet",
    slug: "mens-wallet",
    categories: ["wallets", "handmade-gifts"],
    short: "A bifold wallet with six card slots and a note section.",
    price: 1750,
    makerId: "M-02",
    dimensions: "11.5 x 9.5 x 2 cm",
    weight: "120 g",
    featured: true,
    bestseller: true,
    popularity: 93,
    tags: ["wallet", "bifold", "gift"],
    photos: [
      {
        url: MenWallet,
        alt: "Dark brown bifold leather wallet with contrast stitching, resting on an open book",
      },
    ],
  },

  {
    sl: "025",
    name: "Diary Cover",
    slug: "diary-cover",
    categories: ["office-accessories", "handmade-gifts"],
    short: "A refillable leather diary cover with a press-stud strap.",
    price: 460,
    makerId: "M-01",
    dimensions: "24 x 18 cm",
    weight: "180 g",
    popularity: 72,
    tags: ["diary", "office", "gift"],
    photos: [
      {
        url: photoDiaryCover,
        alt: "Red grained leather diary cover with a press-stud strap, shown with a pen and glasses",
      },
    ],
    videos: [
      {
        src: Diary_Cover,
        title: "Diary Cover product video",
        type: "video/mp4",
        poster: photoDiaryCover,
      },
    ],
  },

  {
    sl: "026",
    name: "Coaster Set",
    slug: "coaster-set",
    categories: ["lifestyle-products", "handmade-gifts"],
    short: "A stitched leather coaster set with a matching stand.",
    price: 295,
    makerId: "M-04",
    dimensions: "10 x 10 cm",
    weight: "150 g",
    newProduct: true,
    popularity: 57,
    tags: ["coaster", "home", "gift"],
    photos: [
      {
        url: photoCoaster,
        alt: "Red grained leather coasters resting in a matching leather holder",
      },
    ],
  },

  {
    sl: "027",
    name: "Shoulder Bag",
    slug: "shoulder-bag",
    categories: ["bags", "travel-accessories"],
    short: "A compact shoulder bag with a long adjustable strap.",
    price: 675,
    makerId: "M-03",
    dimensions: "18 x 12 x 4 cm",
    weight: "260 g",
    featured: true,
    popularity: 81,
    tags: ["shoulder", "bag", "sling"],
    photos: [
      {
        url: photoShoulderBag,
        alt: "Small red leather shoulder bag with a long strap and press-stud flap",
      },
    ],
     videos: [
    {
      src: Shoulder_Bag,
      title: "Diary Cover",
      type: "video/mp4",
      poster: photoLaptopCover,
    },
  ],
  },
];
const defaultProcess = [
  "Material selection",
  "Pattern cutting",
  "Skiving and edge preparation",
  "Stitching",
  "Assembly",
  "Edge finishing and polish",
  "Quality check",
];

export const products: Product[] = seeds.map((s, index) => ({
  id: `GIS-${s.sl}`,
  serialNumber: s.sl,
  slug: s.slug,
  name: s.name,
  category: s.categories[0] ?? "leather-accessories",
  categories: s.categories,
  shortDescription: s.short,
  fullDescription:
    s.full ??
    `${s.name} is cut, stitched and finished by hand in our leather unit. ${s.short} Every piece is made in small batches, so small variations in grain and tone are part of the craft rather than a defect.`,
  price: s.price,
  priceLabel: s.price ? `₹${s.price.toLocaleString("en-IN")}` : "Enquire for Price",
  currency: "INR",
  featured: Boolean(s.featured),
  bestseller: Boolean(s.bestseller),
  newProduct: Boolean(s.newProduct),
  available: true,
  stockStatus: "Made to Order",
  materials: s.materials ?? ["Full-grain leather", "Waxed polyester thread", "Brass hardware"],
  dimensions: s.dimensions ?? "Contact us for dimensions",
  weight: s.weight ?? "—",
  colors: s.colors ?? ["Tan", "Brown", "Black"],
  careInstructions:
    "Wipe with a dry cloth. Keep away from prolonged moisture and direct heat. Condition lightly every few months.",
  customizationAvailable: true,
  customizationDetails:
    "Name or initials embossing, colour selection and bulk corporate gifting available on request.",
  images: s.photos ?? [],
  videos: s.videos ?? [],
  makerId: s.makerId,
  skillsUsed: ["Cutting", "Stitching", "Edge finishing", "Assembly"],
  productionProcess: defaultProcess,
  impactStory:
    "Each unit sold funds paid production hours and continued skill training for the maker who built it.",
  tags: s.tags ?? [],
  seoTitle: `${s.name} — Handcrafted Leather | GIID Imayam Sigaram`,
  seoDescription: `${s.short} Handmade by trained artisans at GIID Imayam Sigaram. Order on WhatsApp.`,
  popularity: s.popularity ?? 50,
  createdAt: new Date(2026, 0, 1 + index).toISOString(),
}));

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const productsByMaker = (makerId: string) => products.filter((p) => p.makerId === makerId);
