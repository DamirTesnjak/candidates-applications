import {getRequestConfig} from 'next-intl/server';
import {cookies} from 'next/headers';
import {routing} from './routing';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();

  // This typically corresponds to the `[locale]` segment
  const COOKIE_NAME = 'NEXT_LOCALE';
  let locale = cookieStore.get(COOKIE_NAME)?.value || "en";

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});