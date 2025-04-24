// src/config/navigation.ts
// Centralized navigation configuration for the entire application

// --- Main Navigation Config ---
export const menuNavigationConfig = [
  { href: "/conseil-central", translationKey: "navConseil" },
  {
    href: "#", // Main link is just a toggle
    translationKey: "navSurveillance",
    subItems: [
      { href: "/surveillance/sub1", translationKey: "subNavSurveillance1" },
      { href: "/surveillance/sub2", translationKey: "subNavSurveillance2" },
    ],
  },
  { href: "/avis", translationKey: "navAvis" },
  { href: "/droit-de-plainte", translationKey: "navDroit" },
  { href: "/publications", translationKey: "navPublications" },
  { href: "/mecanisme-prevention", translationKey: "navMecanisme" },
];

// --- Secondary Navigation Config ---
export const secondaryMenuNavigationConfig = [
  { href: "/actualites", translationKey: "navActualites" },
  { href: "/jurisprudence", translationKey: "navJurisprudence" },
  { href: "/job", translationKey: "navJob" },
  { href: "/contact", translationKey: "navContact" },
  { href: "/liens-utiles", translationKey: "navLiens" },
];

// --- Footer Quick Links ---
export const quickLinksCol1 = [
  { href: "/conseil-central", key: "navConseil" },
  {
    href: "#",
    key: "navSurveillance",
    subItems: [
      { href: "/ccsp", key: "subNavSurveillance1" },
      { href: "/commissions", key: "subNavSurveillance2" },
    ],
  },
  { href: "/avis", key: "navAvis" },
  { href: "/droit-de-plainte", key: "navDroit" },
  { href: "/publications", key: "navPublications" },
  { href: "/mecanisme-prevention", key: "navMecanisme" },
  { href: "/je-suis-detenu", key: "mainAction" },
];

export const quickLinksCol2 = [
  { href: "/actualites", key: "navActualites" },
  { href: "/jurisprudence", key: "navJurisprudence" },
  { href: "/devenir-membre", key: "footerDevenirMembre" },
  { href: "/contact", key: "navContact" },
  { href: "/liens-utiles", key: "navLiens" },
];

// --- Legal Links ---
export const legalLinks = [
  { href: "/politique-confidentialite", key: "footerPolicyConfidentiality" },
  { href: "/politique-cookies", key: "footerPolicyCookies" },
  { href: "/conditions", key: "footerTerms" },
];

// --- Social Media Links ---
export const socialLinks = [
  {
    platform: "LinkedIn",
    url: "https://linkedin.com", // Replace with actual URL
    icon: "IconLinkedIn",
    ariaKey: "linkedinAria",
  },
  {
    platform: "YouTube",
    url: "https://youtube.com", // Replace with actual URL
    icon: "IconYoutube",
    ariaKey: "youtubeAria",
  },
];
