import envConfig from './config.json' with { type: "json" };

export const config = {
    HTTP: {
        PORT: envConfig.HTTP.PORT,
        TIMEOUT: envConfig.HTTP.TIMEOUT
    },
    SERVICENAME: envConfig.SERVICENAME,
    MONGO: {
        URL: envConfig.MONGO.URL
    },
}
