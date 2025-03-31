import dotenv from 'dotenv';
dotenv.config();

interface ConfigType {
    MONGOOSE_CONNECTION_STRING: string;
    ADMIN_JWT_SECRET: string;
    USER_JWT_SECRET:  string;
}

type ConfigReadOnlyType = Readonly<ConfigType>;

export const config: ConfigReadOnlyType = {
    MONGOOSE_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING ?? 'mongodb://localhost:27017/default-db',
    ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET ?? 'default_admin_secret',
    USER_JWT_SECRET: process.env.USER_JWT_SECRET ?? 'default_user_secret',
};