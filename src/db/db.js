import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () => {
    try {
        const mongoConnectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/?appName=${DB_NAME}`);
        console.log(`\n Mongo DB connected:!! DB HOST:  ${mongoConnectionInstance.connection.host}`)
    } catch (error) {
        console.log('Mongo connection FAILED', error);
        process.exit(1);
    }
}

export default connectDB