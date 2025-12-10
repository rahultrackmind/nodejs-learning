import dotenv from 'dotenv';
dotenv.config({ path: '.env' })
import express from 'express';
import connectDB from './db/db.js';
const app = express();
const PORT = process.env.PORT || 3000;




connectDB();




// ; (async () => {
//     try {
//         await mongoose.connect(`${env.process.MONGO_URI}/?appName=${DB_NAME}`);
//         app.on("error", () => {
//             console.log("Error", error);
//             throw error
//         });
//            app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
// });
//     } catch (error) {
//         throw new Error(error.message)
//     }
// })();


