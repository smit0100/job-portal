module.exports = {
    PORT:process.env.PORT,
    DB_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    jWT_REFERESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,



    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_API_KEY: process.env.CLOUD_API_KEY,
    CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,


    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    
}