import { useState } from "react";

/**
 * Maps well-known company names to their domains for accurate logo fetching.
 * Falls back to a simple heuristic for unknown companies.
 */
const COMPANY_DOMAIN_MAP: Record<string, string> = {
  // Big Tech
  "google": "google.com",
  "alphabet": "abc.xyz",
  "meta": "meta.com",
  "facebook": "facebook.com",
  "apple": "apple.com",
  "amazon": "amazon.com",
  "microsoft": "microsoft.com",
  "netflix": "netflix.com",
  "tesla": "tesla.com",
  "nvidia": "nvidia.com",
  "intel": "intel.com",
  "ibm": "ibm.com",
  "oracle": "oracle.com",
  "salesforce": "salesforce.com",
  "adobe": "adobe.com",
  "uber": "uber.com",
  "lyft": "lyft.com",
  "airbnb": "airbnb.com",
  "spotify": "spotify.com",
  "twitter": "twitter.com",
  "x": "x.com",
  "snap": "snap.com",
  "snapchat": "snap.com",
  "tiktok": "tiktok.com",
  "bytedance": "bytedance.com",
  "linkedin": "linkedin.com",
  "pinterest": "pinterest.com",
  "reddit": "reddit.com",
  "stripe": "stripe.com",
  "square": "squareup.com",
  "block": "block.xyz",
  "paypal": "paypal.com",
  "shopify": "shopify.com",
  "zoom": "zoom.us",
  "slack": "slack.com",
  "dropbox": "dropbox.com",
  "twitch": "twitch.tv",
  "discord": "discord.com",
  "palantir": "palantir.com",
  "snowflake": "snowflake.com",
  "databricks": "databricks.com",
  "cloudflare": "cloudflare.com",
  "crowdstrike": "crowdstrike.com",
  "datadog": "datadoghq.com",
  "servicenow": "servicenow.com",
  "workday": "workday.com",
  "intuit": "intuit.com",
  "docusign": "docusign.com",
  "twilio": "twilio.com",
  "okta": "okta.com",
  "atlassian": "atlassian.com",
  "hubspot": "hubspot.com",
  "zendesk": "zendesk.com",
  "asana": "asana.com",
  "monday.com": "monday.com",
  "notion": "notion.so",
  "figma": "figma.com",
  "canva": "canva.com",
  "plaid": "plaid.com",
  "robinhood": "robinhood.com",
  "coinbase": "coinbase.com",
  "ripple": "ripple.com",
  "samsung": "samsung.com",
  "sony": "sony.com",
  "dell": "dell.com",
  "hp": "hp.com",
  "cisco": "cisco.com",
  "vmware": "vmware.com",
  "broadcom": "broadcom.com",
  "qualcomm": "qualcomm.com",
  "amd": "amd.com",
  "arm": "arm.com",
  
  // Consulting & Professional Services
  "deloitte": "deloitte.com",
  "pwc": "pwc.com",
  "pricewaterhousecoopers": "pwc.com",
  "ey": "ey.com",
  "ernst & young": "ey.com",
  "ernst and young": "ey.com",
  "kpmg": "kpmg.com",
  "mckinsey": "mckinsey.com",
  "mckinsey & company": "mckinsey.com",
  "bain": "bain.com",
  "bain & company": "bain.com",
  "bcg": "bcg.com",
  "boston consulting group": "bcg.com",
  "accenture": "accenture.com",
  "booz allen hamilton": "boozallen.com",
  "booz allen": "boozallen.com",
  "capgemini": "capgemini.com",
  "cognizant": "cognizant.com",
  "infosys": "infosys.com",
  "wipro": "wipro.com",
  "tata consultancy services": "tcs.com",
  "tcs": "tcs.com",
  "marsh mclennan": "marshmclennan.com",
  "oliver wyman": "oliverwyman.com",
  
  // Finance & Banking
  "jpmorgan": "jpmorgan.com",
  "jpmorgan chase": "jpmorganchase.com",
  "jp morgan": "jpmorgan.com",
  "j.p. morgan": "jpmorgan.com",
  "goldman sachs": "goldmansachs.com",
  "morgan stanley": "morganstanley.com",
  "bank of america": "bankofamerica.com",
  "citigroup": "citigroup.com",
  "citi": "citi.com",
  "citibank": "citi.com",
  "wells fargo": "wellsfargo.com",
  "capital one": "www.capitalone.com",
  "american express": "americanexpress.com",
  "amex": "americanexpress.com",
  "visa": "visa.com",
  "mastercard": "mastercard.com",
  "charles schwab": "schwab.com",
  "fidelity": "fidelity.com",
  "fidelity investments": "fidelity.com",
  "vanguard": "vanguard.com",
  "blackrock": "blackrock.com",
  "state street": "statestreet.com",
  "hsbc": "hsbc.com",
  "barclays": "barclays.com",
  "ubs": "ubs.com",
  "credit suisse": "credit-suisse.com",
  "deutsche bank": "db.com",
  "bnp paribas": "bnpparibas.com",
  
  // Healthcare & Pharma
  "johnson & johnson": "jnj.com",
  "j&j": "jnj.com",
  "pfizer": "pfizer.com",
  "moderna": "modernatx.com",
  "merck": "merck.com",
  "abbvie": "abbvie.com",
  "amgen": "amgen.com",
  "gilead": "gilead.com",
  "eli lilly": "lilly.com",
  "bristol-myers squibb": "bms.com",
  "novartis": "novartis.com",
  "roche": "roche.com",
  "astrazeneca": "astrazeneca.com",
  "unitedhealth group": "unitedhealthgroup.com",
  "unitedhealth": "unitedhealthgroup.com",
  "kaiser permanente": "kaiserpermanente.org",
  "kaiser": "kaiserpermanente.org",
  "anthem": "anthem.com",
  "cigna": "cigna.com",
  "humana": "humana.com",
  "cvs health": "cvshealth.com",
  "cvs": "cvshealth.com",
  "walgreens": "walgreens.com",
  "medtronic": "medtronic.com",
  "abbott": "abbott.com",
  "stryker": "stryker.com",
  "edwards lifesciences": "edwards.com",
  
  // Retail & Consumer
  "walmart": "walmart.com",
  "target": "target.com",
  "costco": "costco.com",
  "home depot": "homedepot.com",
  "the home depot": "homedepot.com",
  "lowes": "lowes.com",
  "nike": "nike.com",
  "adidas": "adidas.com",
  "starbucks": "starbucks.com",
  "mcdonald's": "mcdonalds.com",
  "mcdonalds": "mcdonalds.com",
  "coca-cola": "coca-colacompany.com",
  "pepsi": "pepsico.com",
  "pepsico": "pepsico.com",
  "procter & gamble": "pg.com",
  "p&g": "pg.com",
  "unilever": "unilever.com",
  "nestle": "nestle.com",
  "disney": "disney.com",
  "walt disney": "disney.com",
  "the walt disney company": "disney.com",
  
  // Automotive & Transportation
  "ford": "ford.com",
  "general motors": "gm.com",
  "gm": "gm.com",
  "toyota": "toyota.com",
  "honda": "honda.com",
  "bmw": "bmw.com",
  "mercedes-benz": "mercedes-benz.com",
  "volkswagen": "volkswagen.com",
  "rivian": "rivian.com",
  "lucid": "lucidmotors.com",
  "lucid motors": "lucidmotors.com",
  "fedex": "fedex.com",
  "ups": "ups.com",
  "dhl": "dhl.com",
  
  // Aerospace & Defense
  "boeing": "boeing.com",
  "lockheed martin": "lockheedmartin.com",
  "raytheon": "rtx.com",
  "northrop grumman": "northropgrumman.com",
  "general dynamics": "gd.com",
  "spacex": "spacex.com",
  "blue origin": "blueorigin.com",
  
  // Media & Entertainment
  "warner bros": "warnerbros.com",
  "warner bros.": "warnerbros.com",
  "paramount": "paramount.com",
  "nbcuniversal": "nbcuniversal.com",
  "nbc": "nbcuniversal.com",
  "fox": "fox.com",
  "viacom": "viacom.com",
  "sony pictures": "sonypictures.com",
  
  // Telecom
  "at&t": "att.com",
  "att": "att.com",
  "verizon": "verizon.com",
  "t-mobile": "t-mobile.com",
  "comcast": "comcast.com",
  
  // Energy
  "exxonmobil": "exxonmobil.com",
  "exxon": "exxonmobil.com",
  "chevron": "chevron.com",
  "shell": "shell.com",
  "bp": "bp.com",
  "conocophillips": "conocophillips.com",
  
  // Real Estate & Construction
  "cbre": "cbre.com",
  "jones lang lasalle": "jll.com",
  "jll": "jll.com",
  "cushman & wakefield": "cushmanwakefield.com",
  
  // Insurance & Financial Services
  "pimco": "pimco.com",
  "pacific life": "pacificlife.com",
  "protiviti": "protiviti.com",
  "optum": "optum.com",
  "docusign": "docusign.com",
  "amazon web services": "aws.amazon.com",
  "aws": "aws.amazon.com",
  "smith.ai": "smith.ai",
  "oneschema": "oneschema.co",
  "internal revenue service": "irs.gov",
  "irs": "irs.gov",
  "western digital": "westerndigital.com",
  "checkr": "checkr.com",
  "teradata": "teradata.com",
  "headspace": "headspace.com",
  "newegg": "newegg.com",
  "macy's": "macys.com",
  "macys": "macys.com",
  "james hardie": "jameshardie.com",
  "ehealth": "ehealth.com",
  "demandbase": "demandbase.com",
  
  // Education (UC System)
  "university of california": "universityofcalifornia.edu",
  "uc irvine": "uci.edu",
  "uci": "uci.edu",
  "ucla": "ucla.edu",
  "uc berkeley": "berkeley.edu",
  "stanford": "stanford.edu",
  "mit": "mit.edu",
  "harvard": "harvard.edu",
};

// Companies/values that should not get a logo (freelancers, generic terms, etc.)
const SKIP_COMPANIES = new Set([
  "self-employed",
  "self employed",
  "freelance",
  "freelancer",
  "n/a",
  "none",
  "unemployed",
  "student",
  "retired",
  "private",
  "",
]);

/**
 * Converts a company name into a domain for logo lookup.
 */
export function getCompanyDomain(company: string): string {
  if (!company) return "";
  
  const normalized = company
    .trim()
    .toLowerCase()
    .replace(/,?\s*(inc\.?|llc\.?|corp\.?|co\.?|ltd\.?|l\.p\.?|plc|group|holdings?)$/i, "")
    .trim();
  
  if (SKIP_COMPANIES.has(normalized)) return "";
  
  // Check exact match first
  if (COMPANY_DOMAIN_MAP[normalized]) {
    return COMPANY_DOMAIN_MAP[normalized];
  }
  
  // Check if any key is contained in the company name
  for (const [key, domain] of Object.entries(COMPANY_DOMAIN_MAP)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return domain;
    }
  }
  
  // Heuristic fallback: strip common suffixes, join with nothing, add .com
  const cleaned = normalized
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "")
    .trim();
  
  return cleaned ? `${cleaned}.com` : "";
}

/**
 * Returns the Google Favicon URL for a company domain.
 * Uses the Google S2 Favicons service which is free and highly reliable.
 */
export function getCompanyLogoUrl(company: string, size: number = 128): string {
  const domain = getCompanyDomain(company);
  if (!domain) return "";
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
}

/**
 * Gets the initials of a company name (up to 2 characters).
 */
function getCompanyInitials(company: string): string {
  if (!company) return "?";
  const words = company.trim().split(/\s+/);
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
}

interface CompanyLogoProps {
  company: string;
  size?: number;
  className?: string;
  showFallback?: boolean;
}

/**
 * Displays a company logo from Clearbit with a graceful fallback to initials.
 */
const CompanyLogo = ({ company, size = 20, className = "", showFallback = true }: CompanyLogoProps) => {
  const [hasError, setHasError] = useState(false);
  const logoUrl = getCompanyLogoUrl(company);
  
  if (!company || !logoUrl || hasError) {
    if (!showFallback) return null;
    return (
      <div
        className={`inline-flex items-center justify-center rounded-sm bg-cream-200 dark:bg-neutral-800 text-taupe-600 dark:text-taupe-400 font-mono text-[10px] font-semibold flex-shrink-0 ${className}`}
        style={{ width: size, height: size }}
        title={company}
      >
        {getCompanyInitials(company)}
      </div>
    );
  }

  return (
    <img
      src={logoUrl}
      alt={`${company} logo`}
      width={size}
      height={size}
      className={`rounded-sm object-contain flex-shrink-0 ${className}`}
      onError={() => setHasError(true)}
      loading="lazy"
    />
  );
};

export default CompanyLogo;

