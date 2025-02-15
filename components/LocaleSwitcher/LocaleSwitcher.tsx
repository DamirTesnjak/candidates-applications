import { useLocale, useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import LocaleSwitcherSelect from './LocaleSwitcherSelect/LocaleSwitcherSelect';

export default function LocaleSwitcher() {
  const translation = useTranslations('localeSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={translation('changeLanguage')}>
      {routing.locales.map((cur) => (
        <option key={cur} value={cur}>
          {translation('locale', { locale: cur })}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
