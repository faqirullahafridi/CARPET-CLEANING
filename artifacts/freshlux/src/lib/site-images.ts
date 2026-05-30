export const SITE_IMAGES = {
  hero: "/images/carpet-hero.png",
  beforeAfter: "/images/carpet-before-after.png",
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

export function getServiceImage(serviceId: string): string {
  return (
    SITE_IMAGES.services[serviceId as keyof typeof SITE_IMAGES.services] ??
    SITE_IMAGES.services.carpet
  );
}
