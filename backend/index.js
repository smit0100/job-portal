const express = require('express');

const ServerConfig = require('./src/config/serverConfig');
const connectDB = require('./src/config/dbConfig');


const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${ServerConfig.PORT}`);
    
    console.log(res)
});