'use server'

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function logoutHrUser() {
    const cookieStore = await cookies();
    cookieStore.set({
        name: "token",
        value: "",
        httpOnly: true,
    });
    redirect('/');
    return { message: "Logout successful" };
}