const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`We're connected to the database cloud!`);
    }

    catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit()
    }
}


module.exports = connectDB