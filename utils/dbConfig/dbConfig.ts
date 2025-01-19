import { createConnection } from "mongoose";
import { DATABASES } from "@/constants/constants";
import candidateSchema from "@/utils/dbConfig/models/candidateModel.js";
import hrUserSchema from "@/utils/dbConfig/models/hrUserModel";

export function connectToDB(database: string) {
    try {
        console.log(`${process.env.MONGO_URL!}/${database}`, `${process.env.MONGO_URL!}/${database}`);
        const connection = createConnection(`${process.env.MONGO_URL}/${database}`)

        let Model;

        if (database === DATABASES.candidates) {
            Model = connection.model(DATABASES.candidates, candidateSchema);
        }

        if (database === DATABASES.hrUsers) {
            Model = connection.model(DATABASES.hrUsers, hrUserSchema);
        }

        connection.on('connected', () => {
            console.log(`Connected to database ${database} successfully`);
        })

        connection.on('error', (err) => {
            console.log(`Cannot connect to database ${database}! Please make sure MongoDB is running ${err}.`);
            process.exit();
        })
        return Model;
    } catch (err) {
        console.log('Fatal error connecting to database', err);
    }
}