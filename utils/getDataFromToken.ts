import jwt from "jsonwebtoken";
import {cookies} from "next/headers";

export async function getDataFromToken() {
    const cookieStore = await cookies();
    try {
        const token = cookieStore.get("token")?.value || "";
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!)
        return decodedToken;
    } catch (error: any) {
        throw new Error(error.message);
    }
}