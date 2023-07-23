require("dotenv").config();
const moongose = require("mongoose");

const connectDB = async () => {
    try {
        
        const connection = await moongose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser : true,
            useUnifiedTopology : true
        });

        // comprobacion del host
        /* console.log(connection.connection.host);
        console.log(connection.connection.port); */

        const url = `${connection.connection.host}:${connection.connection.port}`


    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDB;