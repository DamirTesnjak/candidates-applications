import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import {redirect} from '@/i18n/routing';
import {getLocale} from 'next-intl/server';

export async function getDataFromToken() {
  const locale = await getLocale();
  const cookieStore = await cookies();
  try {
    const token = cookieStore.get('token')?.value || '';
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken;
  } catch (error: any) {
    redirect({
      href: "/",
      locale,
    });
  }
}
