import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'sl', "hr"],

  // Used when no locale matches
  defaultLocale: 'en',
  /*pathnames: {
    '/': '/[locale]',
    '/candidateProfile': {
      en: '/candidate-profile',
      hr: '/profil-kandidata',
      sl: '/profil-kandidata',
    },
    '/candidateProfile/[id]/editCandidate': {
      en: '/candidate-profile/[id]/editCandidate',
      hr: '/profil-kandidata/[id]/uredi-kandidata',
      sl: '/profil-kandidata/[id]/uredi-kandidata',
    },
    '/candidates': {
      en: '/candidates',
      hr: '/kandidati',
      sl: '/kandidati',
    },
    '/candidates/createCandidate': {
      en: '/candidates/create-candidate',
      hr: '/kandidati/stvori-kandidata',
      sl: '/kandidati/ustvari-kandidata',
    },
    '/hrUserProfile': {
      en: '/user-profile',
      hr: '/koristnicki-profil',
      sl: '/profil-uporabnika',
    },
    '/hrUserProfile/editHrUserProfile': {
      en: '/user-profile/edit-user-profile',
      hr: '/koristnicki-profil/uredi-koristnicki-profil',
      sl: '/profil-uporabnika/uredi-profil-uporabnika',
    },
    '/login': {
      en: '/login',
      hr: '/upis',
      sl: '/vpis',
    },
    '/register': {
      en: '/register',
      hr: '/registracija',
      sl: '/registracija',
    },
    '/settings': {
      en: '/settings',
      hr: '/postavke',
      sl: '/nastavitve',
    },
    '/settings/companyEmailConfiguration': {
      en: '/settings/company-email-configuration',
      hr: '/postavke/konfiguracija-emaila-tvrtke',
      sl: '/nastavitve/epostna-konfiguracija-podjetja',
    },
    '/settings/emailType/[id]': {
      en: '/settings/email-type|/[id]',
      hr: '/postavke/vrsta-emaila/[id]',
      sl: '/nastavitve/tip-emaila/[id]',
    },
    '/settings/mapTemplateMessages': {
      en: '/settings/map-template-messages',
      hr: '/postavke/mapiraj-predloske-epostnih-poruka',
      sl: '/nastavitve/mapiraj-predloge-epostnih-sporocil',
    },
    '/settings/overviewEmailTemplateMessages': {
      en: '/settings/overview-email-template-messages',
      hr: '/postavke/pregled-predlozaka-epostnih-poruka',
      sl: '/nastavitve/pregled-predlogov-epostnih-sporocil',
    },
    '/settings/setupEmailTemplateMessages': {
      en: '/settings/setup-email-template-messages',
      hr: '/postavke/postavi-predlozke-epostnih-poruka',
      sl: '/nastavitve/nastavi-predloge-epostnih-sporocil',
    },
}*/
});

export type Locale = (typeof routing.locales)[number];

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);