const mongoose = require("mongoose");//It manages relationships between data and provides a simple way to interact with MongoDB.

const dbConnect = async () => { //it handle database connection in a non blocking way.
    try {
        await mongoose.connect(process.env.MONGO_URI, { // The dbConnect function is an asynchronous function that establishes a connection 
            useNewUrlParser: true,                      //to the MongoDB database using the URI stored in process.env.MONGO_URI.
            useUnifiedTopology: true,
        })
        console.log('Database Connected'); 
    } catch (err) {     // error handling 
        console.log(err); // If the connection fails, the error is logged, and the process exits with a failure code (process.exit(1)).
        process.exit(1);
    }
}

module.exports = { dbConnect };
//it can be used in other parts of the application.