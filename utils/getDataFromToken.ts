import * as jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function getDataFromToken() {
  const cookieStore = await cookies();
  try {
    const token = cookieStore.get('token')?.value || '';

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as jwt.JwtPayload;
    return decodedToken;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error: unknown) {
    console.log('Token not found!');
  }
}
