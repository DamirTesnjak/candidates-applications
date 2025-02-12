'use server';

import { cookies } from 'next/headers';

export async function logoutHrUser() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'token',
    value: '',
    httpOnly: true,
  });
  return { success: true };
}
