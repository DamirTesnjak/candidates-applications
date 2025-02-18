import {redirect} from 'next/navigation';
import { cookies } from 'next/headers';

// This page only renders when the app is built statically (output: 'export')
export default async function RootPage() {
  const cookieStore = await cookies();

  const COOKIE_NAME = 'NEXT_LOCALE';
  const locale = cookieStore.get(COOKIE_NAME)?.value || "en";

  redirect(`/${locale}`);
}