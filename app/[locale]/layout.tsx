import { ReactNode } from 'react';
import type { Metadata } from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

import { Roboto } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme/theme';

import '../../styles/global/scssReset.css';
import styles from '../../styles/mainLayout/container.module.scss';
import globalStyles from '../../styles/global/globals.module.scss';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

import Sidebar from '@/components/Sidebar/Sidebar';
import StoreProvider from '@/app/StoreProvider';
import Header from '@/components/Header/Header';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: { locale: string }
}>) {
  const { locale } = await params;
  console.log('locale', locale);

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const sidebarLinks = [
    { link: '/candidates', text: 'candidates' },
    { link: '/settings', text: 'settings' },
    { link: '/about', text: 'about' },
  ];
  return (
    <html lang={locale}>
      <body className={globalStyles.body}>
      <NextIntlClientProvider messages={messages}>
        <AppRouterCacheProvider options={{ enableCssLayer: false }}>
          <ThemeProvider theme={theme}>
            <StoreProvider>
              <div className={styles.container}>
                <Sidebar sidebarLinks={sidebarLinks} />
                <Header />
                {children}
              </div>
            </StoreProvider>
            <div id='modal' />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </NextIntlClientProvider>
      </body>
    </html>
  );
}
