'use server'

import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/dbConfig/dbConfig";
import {DATABASES} from "@/constants/constants";

export async function getHrUserProfile() {
    try {
        const tokenData = await getDataFromToken();

        const Model = connectToDB(DATABASES.hrUsers);

        const user = await Model?.findOne({id: tokenData.id})
            .select("-password");
        return {
            message: "User found",
            data: user,
        };
    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 400}
        )
    }
}