export const SITE_IMAGES = {
  hero: "/images/carpet-hero.png",
  beforeAfter: "/images/carpet-before-after.png",
  gallery: {
    stairs: "/images/gallery-stairs.png",
    bedroom: "/images/gallery-bedroom.png",
    office: "/images/gallery-office.png",
    teamVan: "/images/gallery-team-van.png",
    stainTreatment: "/images/gallery-stain-treatment.png",
    hallway: "/images/gallery-hallway.png",
  },
  services: {
    carpet: "/images/carpet-service.png",
    sofa: "/images/sofa-service.png",
    rug: "/images/rug-service.png",
    mattress: "/images/mattress-service.png",
    deep: "/images/deep-clean-service.png",
    eot: "/images/tenancy-service.png",
    stain: "/images/carpet-service.png",
  },
} as const;

export const GALLERY_ITEMS = [
  { src: SITE_IMAGES.gallery.hallway, alt: "Freshly cleaned hallway carpet", caption: "Hallway refresh" },
  { src: SITE_IMAGES.gallery.stairs, alt: "Clean stairs and landing carpet", caption: "Stairs & landing" },
  { src: SITE_IMAGES.gallery.bedroom, alt: "Clean bedroom carpet", caption: "Bedroom deep clean" },
  { src: SITE_IMAGES.beforeAfter, alt: "Before and after carpet cleaning", caption: "Visible results" },
  { src: SITE_IMAGES.gallery.stainTreatment, alt: "Professional stain treatment", caption: "Stain treatment" },
  { src: SITE_IMAGES.gallery.office, alt: "Commercial office carpet cleaning", caption: "Office carpets" },
  { src: SITE_IMAGES.gallery.teamVan, alt: "Carpet cleaning service van", caption: "Nationwide service" },
  { src: SITE_IMAGES.services.sofa, alt: "Upholstery cleaning", caption: "Sofa & upholstery" },
] as const;

export function getServiceImage(serviceId: string): string {
  return (
    SITE_IMAGES.services[serviceId as keyof typeof SITE_IMAGES.services] ??
    SITE_IMAGES.services.carpet
  );
}
