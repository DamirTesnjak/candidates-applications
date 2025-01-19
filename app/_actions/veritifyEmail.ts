import {connectToDB} from "@/utils/dbConfig/dbConfig";
import {DATABASES} from "@/constants/constants";
import {redirect} from "next/navigation";

export async function verifyEmail(token: string) {
    try {
        const Model = connectToDB(DATABASES.hrUsers);

        if (!Model) {
            console.log('Cannot connect to DB');
            return {
                error: "Something went wrong, please try again later or contact support",
            }
        }

        const user = await Model?.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() },
        })

        if (!user) {
            return { error: "Invalid token" };
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        const updatedUser = await user.save();

        if (updatedUser !== user) {
            return {
                error: "Something went wrong during verification process, please try again or contact support",
            }
        }
        redirect('/login');
    } catch (error) {
        console.log('Cannot connect to DB. Please check if MongoDB is running!');
        console.log('error', error);
        return {
            error: "Something went wrong, please try again later or contact support",
        }
    }
}