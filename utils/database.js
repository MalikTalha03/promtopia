import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log('using existing connection');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'promptopia',
        });
        isConnected = true;
    }
    catch (error) {
        console.log('DB connection error:', error);
    }
}

