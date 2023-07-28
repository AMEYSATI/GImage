import mongoose from 'mongoose';

const connectDB = (url) => {
    mongoose.set('strictQuery', true);

    mongoose.connect(url)
        .then(() => console.log("Connected to Mongoose"))
        .catch((error) => console.log(error)); // Use "error" instead of "err"
}

export default connectDB;
