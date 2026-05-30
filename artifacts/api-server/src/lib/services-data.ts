export const SERVICES = [
  {
    id: "carpet",
    name: "Carpet Cleaning",
    slug: "carpet-cleaning",
    description: "Professional hot water extraction carpet cleaning using industry-leading equipment.",
    startingFrom: 2800,
    icon: "sparkles",
    features: ["Hot water extraction", "Stain treatment included", "Dries in 2-4 hours", "Odour neutralisation"],
  },
  {
    id: "sofa",
    name: "Sofa Cleaning",
    slug: "sofa-cleaning",
    description: "Deep upholstery cleaning for sofas, armchairs and fabric furniture.",
    startingFrom: 3000,
    icon: "armchair",
    features: ["Upholstery shampoo", "Stain removal", "Fabric protection available", "Safe for all fabrics"],
  },
  {
    id: "rug",
    name: "Rug Cleaning",
    slug: "rug-cleaning",
    description: "Specialist rug cleaning for all types including Persian, wool and silk rugs.",
    startingFrom: 2000,
    icon: "rectangle-horizontal",
    features: ["Specialist treatment", "Hand-finished", "Safe for delicate fibres", "Colour restoration"],
  },
  {
    id: "mattress",
    name: "Mattress Cleaning",
    slug: "mattress-cleaning",
    description: "Hygienic mattress cleaning to eliminate dust mites, allergens and bacteria.",
    startingFrom: 2800,
    icon: "bed",
    features: ["Anti-allergen treatment", "UV sanitisation", "Stain removal", "Odour elimination"],
  },
  {
    id: "deep",
    name: "Deep Cleaning",
    slug: "deep-cleaning",
    description: "Comprehensive deep clean combining carpet, upholstery and fabric treatments.",
    startingFrom: 8000,
    icon: "shield-check",
    features: ["Full property clean", "All fabrics treated", "Sanitisation included", "Same-day available"],
  },
  {
    id: "eot",
    name: "End of Tenancy",
    slug: "end-of-tenancy-cleaning",
    description: "Complete end of tenancy carpet and upholstery clean to secure your deposit.",
    startingFrom: 8000,
    icon: "home",
    features: ["Deposit protection", "Landlord certificate", "Full property", "Priority availability"],
  },
];

export const SERVICE_ITEMS: Record<string, Array<{
  id: string;
  name: string;
  category: string;
  priceGbp: number;
  unit: string;
  description: string | null;
}>> = {
  carpet: [
    { id: "carpet-small-bedroom",   name: "Small Bedroom",      category: "Bedroom",   priceGbp: 28, unit: "per room",     description: null },
    { id: "carpet-medium-bedroom",  name: "Medium Bedroom",     category: "Bedroom",   priceGbp: 38, unit: "per room",     description: null },
    { id: "carpet-large-bedroom",   name: "Large Bedroom",      category: "Bedroom",   priceGbp: 48, unit: "per room",     description: null },
    { id: "carpet-living-room",     name: "Living Room",        category: "Reception", priceGbp: 55, unit: "per room",     description: null },
    { id: "carpet-hallway",         name: "Hallway",            category: "Hallway",   priceGbp: 22, unit: "per area",     description: null },
    { id: "carpet-landing",         name: "Landing",            category: "Hallway",   priceGbp: 18, unit: "per area",     description: null },
    { id: "carpet-stairs-landing",  name: "Stairs & Landing",   category: "Stairs",    priceGbp: 55, unit: "per flight",   description: null },
    { id: "package-studio",         name: "Studio Flat",        category: "Package",   priceGbp: 75, unit: "full property", description: "Complete studio flat" },
    { id: "package-1bed",           name: "1 Bedroom Flat",     category: "Package",   priceGbp: 99, unit: "full property", description: null },
    { id: "package-2bed",           name: "2 Bedroom Flat",     category: "Package",   priceGbp: 135, unit: "full property", description: null },
    { id: "package-3bed-house",     name: "3 Bedroom House",    category: "Package",   priceGbp: 175, unit: "full property", description: null },
    { id: "package-4bed-house",     name: "4 Bedroom House",    category: "Package",   priceGbp: 230, unit: "full property", description: null },
  ],
  sofa: [
    { id: "sofa-armchair",    name: "Armchair",       category: "Chair", priceGbp: 30,  unit: "per item", description: null },
    { id: "sofa-dining-chair",name: "Dining Chair",   category: "Chair", priceGbp: 8,   unit: "per item", description: null },
    { id: "sofa-2seater",     name: "2 Seater Sofa",  category: "Sofa",  priceGbp: 60,  unit: "per item", description: null },
    { id: "sofa-3seater",     name: "3 Seater Sofa",  category: "Sofa",  priceGbp: 75,  unit: "per item", description: null },
    { id: "sofa-corner",      name: "Corner Sofa",    category: "Sofa",  priceGbp: 110, unit: "per item", description: null },
    { id: "sofa-ushape",      name: "U-Shape Sofa",   category: "Sofa",  priceGbp: 145, unit: "per item", description: null },
  ],
  rug: [
    { id: "rug-small",   name: "Small Rug",    category: "Rug",          priceGbp: 20, unit: "per item", description: "Up to 2m²" },
    { id: "rug-medium",  name: "Medium Rug",   category: "Rug",          priceGbp: 32, unit: "per item", description: "2m² – 4m²" },
    { id: "rug-large",   name: "Large Rug",    category: "Rug",          priceGbp: 48, unit: "per item", description: "4m²+" },
    { id: "rug-persian", name: "Persian Rug",  category: "Specialist",   priceGbp: 22, unit: "per m²",   description: "Hand-knotted specialist treatment" },
    { id: "rug-wool",    name: "Wool Rug",     category: "Specialist",   priceGbp: 12, unit: "per m²",   description: "Gentle wool-safe treatment" },
    { id: "rug-silk",    name: "Silk Rug",     category: "Specialist",   priceGbp: 16, unit: "per m²",   description: "Delicate silk-safe treatment" },
  ],
  mattress: [
    { id: "mattress-single", name: "Single Mattress", category: "Mattress", priceGbp: 28, unit: "per item", description: null },
    { id: "mattress-double", name: "Double Mattress", category: "Mattress", priceGbp: 42, unit: "per item", description: null },
    { id: "mattress-king",   name: "King Mattress",   category: "Mattress", priceGbp: 55, unit: "per item", description: null },
  ],
  deep: [
    { id: "package-studio",     name: "Studio Flat",     category: "Package", priceGbp: 80,  unit: "full property", description: null },
    { id: "package-1bed",       name: "1 Bedroom Flat",  category: "Package", priceGbp: 110, unit: "full property", description: null },
    { id: "package-2bed",       name: "2 Bedroom Flat",  category: "Package", priceGbp: 145, unit: "full property", description: null },
    { id: "package-3bed-house", name: "3 Bedroom House", category: "Package", priceGbp: 185, unit: "full property", description: null },
    { id: "package-4bed-house", name: "4 Bedroom House", category: "Package", priceGbp: 245, unit: "full property", description: null },
  ],
  eot: [
    { id: "package-studio",     name: "Studio Flat",     category: "Package", priceGbp: 80,  unit: "full property", description: null },
    { id: "package-1bed",       name: "1 Bedroom Flat",  category: "Package", priceGbp: 110, unit: "full property", description: null },
    { id: "package-2bed",       name: "2 Bedroom Flat",  category: "Package", priceGbp: 145, unit: "full property", description: null },
    { id: "package-3bed-house", name: "3 Bedroom House", category: "Package", priceGbp: 185, unit: "full property", description: null },
    { id: "package-4bed-house", name: "4 Bedroom House", category: "Package", priceGbp: 245, unit: "full property", description: null },
  ],
};

export const ADDONS = [
  { id: "addon-stain-protection",  name: "Stain Protection",          priceGbp: 12 },
  { id: "addon-pet-odor",          name: "Pet Odour Removal",         priceGbp: 15 },
  { id: "addon-deep-sanitization", name: "Deep Sanitisation",         priceGbp: 18 },
  { id: "addon-scotchgard",        name: "Scotchgard Protection",     priceGbp: 15 },
  { id: "addon-heavy-stain",       name: "Heavy Stain Removal",       priceGbp: 20 },
  { id: "addon-same-day",          name: "Same-Day Emergency Booking", priceGbp: 20 },
];

export const MINIMUM_BOOKING_FEE = 85;
