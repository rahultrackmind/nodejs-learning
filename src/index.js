import connectDB from './db/db.js';
import { app } from './app.js';
connectDB().then(() => {
    app.on("error", () => {
        console.log("Error", error);
        throw error
    });
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at ${process.env.PORT} port`)
    });
}).catch((err) => {
    console.log("Mongo db connection failed !!!", err)
});


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