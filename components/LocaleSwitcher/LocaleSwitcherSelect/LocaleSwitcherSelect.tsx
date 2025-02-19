'use client';

import { useParams } from 'next/navigation';
import LanguageIcon from '@mui/icons-material/Language';
import { ChangeEvent, ReactNode, useTransition } from 'react';
import { Locale, usePathname, useRouter } from '@/i18n/routing';
import Button from '@/UI/Button/Button';

type Props = {
  children: ReactNode;
  defaultValue: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  }

  return (
    <Button
      className='primaryTextButton'
      type='button'
      startIcon={<LanguageIcon />}
      component={
        <select
          style={{
            backgroundColor: '#f7f7f7',
            textTransform: 'uppercase',
            fontWeight: 500,
            color: '#727cf5',
            fontSize: '12px',
          }}
          defaultValue={defaultValue}
          disabled={isPending}
          onChange={onSelectChange}
        >
          {children}
        </select>
      }
    />
  );
}
