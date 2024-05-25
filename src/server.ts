import mongoose from "mongoose";
import app from "./app"
import config from "./app/config"



async function main() {
    try {
        await mongoose.connect(config.db_url as string);
        app.listen(config.port, () => {
            console.log(`PH university backend on port ${config.port}`)
        })
    } catch (error) {
        console.log("Error from main:", error)
    }
}


main();