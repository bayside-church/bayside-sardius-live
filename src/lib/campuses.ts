import { CampusConfig } from "./types";

export const SARDIUS_ACCOUNT_ID = process.env.NEXT_PUBLIC_SARDIUS_ACCOUNT_ID || "005aD180855507C";

export const campuses: CampusConfig[] = [
  {
    slug: "granite-bay",
    code: "GB",
    label: "Granite Bay",
    fullName: "Bayside Church Granite Bay",
    pid: "GB-PRIMARY",
    chatUrl: "https://gbchatonly.sardius.live",
    onDemandUrl: "https://granitebay.baysideonline.com/services/",
    website: "https://granitebay.baysideonline.com",
    social: {
      facebook: "https://www.facebook.com/baborchurch",
      instagram: "https://www.instagram.com/baysidechurch/",
      youtube: "https://www.youtube.com/@BaysideChurch",
    },
  },
  {
    slug: "blue-oaks",
    code: "BO",
    label: "Blue Oaks",
    fullName: "Bayside Church Blue Oaks",
    pid: "BO_PRIMARY",
    onDemandUrl: "https://blueoaks.baysideonline.com/services/",
    website: "https://blueoaks.baysideonline.com",
    social: {
      facebook: "https://www.facebook.com/BaysideBlueOaks/",
      instagram: "https://www.instagram.com/baysideblueoaks/",
      youtube: "https://www.youtube.com/@BaysideBlueOaks",
    },
  },
  {
    slug: "folsom",
    code: "FO",
    label: "Folsom",
    fullName: "Bayside Church Folsom",
    pid: "FO_PRIMARY",
    onDemandUrl: "https://folsom.baysideonline.com/services/",
    website: "https://folsom.baysideonline.com",
    social: {
      facebook: "https://www.facebook.com/BaysideFolsom/",
      instagram: "https://www.instagram.com/baysidefolsom/",
      youtube: "https://www.youtube.com/@BaysideFolsom",
    },
  },
  {
    slug: "el-dorado-hills",
    code: "EDH",
    label: "El Dorado Hills",
    fullName: "Bayside Church El Dorado Hills",
    pid: "f561EAB2854f9CAC5B4d6Fe6BEb6",
    onDemandUrl: "https://eldoradohills.baysideonline.com/services/",
    website: "https://eldoradohills.baysideonline.com",
    social: {
      facebook: "https://www.facebook.com/BaysideEDH/",
      instagram: "https://www.instagram.com/baysideedh/",
      youtube: "https://www.youtube.com/@BaysideEDH",
    },
  },
  {
    slug: "adventure",
    code: "AD",
    label: "Adventure",
    fullName: "Bayside Church Adventure",
    pid: "AD_PRIMARY",
    onDemandUrl: "https://adventure.baysideonline.com/services/",
    website: "https://adventure.baysideonline.com",
    social: {
      facebook: "https://www.facebook.com/BaysideAdventure/",
      instagram: "https://www.instagram.com/baysideadventure/",
      youtube: "https://www.youtube.com/@BaysideAdventure",
    },
  },
  {
    slug: "santa-rosa",
    code: "SR",
    label: "Santa Rosa",
    fullName: "Bayside Church Santa Rosa",
    pid: "SR-PRIMARY",
    onDemandUrl: "https://santarosa.baysideonline.com/services/",
    website: "https://santarosa.baysideonline.com",
    social: {
      facebook: "https://www.facebook.com/BaysideSantaRosa/",
      instagram: "https://www.instagram.com/baysidechurchsr/",
      youtube: "https://www.youtube.com/@BaysideSantaRosa",
    },
  },
  {
    slug: "orange-county",
    code: "OC",
    label: "Orange County",
    fullName: "Bayside Church Orange County",
    pid: "OC-PRIMARY",
    onDemandUrl: "https://orangecounty.baysideonline.com/services/",
    website: "https://orangecounty.baysideonline.com",
    social: {
      facebook: "https://www.facebook.com/BaysideOC/",
      instagram: "https://www.instagram.com/baysideoc/",
      youtube: "https://www.youtube.com/@BaysideOC",
    },
  },
  {
    slug: "auburn",
    code: "AB",
    label: "Auburn",
    fullName: "Bayside Church Auburn",
    pid: "cC128671DfAD120cB5F50242DAd2",
    onDemandUrl: "https://auburn.baysideonline.com/services/",
    website: "https://auburn.baysideonline.com",
    social: {
      facebook: "https://www.facebook.com/BaysideAuburn/",
      instagram: "https://www.instagram.com/baysideauburn/",
      youtube: "https://www.youtube.com/@BaysideAuburn",
    },
  },
];

export function getCampusBySlug(slug: string): CampusConfig | undefined {
  return campuses.find((c) => c.slug === slug);
}

export function getCampusByCode(code: string): CampusConfig | undefined {
  return campuses.find((c) => c.code === code);
}
