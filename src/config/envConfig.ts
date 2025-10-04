import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: number;
  DB_URL: string;
  FRONTEND_URL: string;
  JWT: {
    SECRET: string;
    SALT_ROUND: number;
    EXPIRES_IN: string;
  };
  CLOUDINARY: {
    NAME: string;
    API_KEY: string;
    SECRET_KEY: string;
  };
  ADMIN: {
    NAME: string;
    EMAIL: string;
    PASSWORD: string;
  };
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariables: string[] = [
    "PORT",
    "DB_URL",
    "FRONTEND_URL",
    "JWT_SECRET",
    "JWT_SALT_ROUND",
    "JWT_EXPIRES_IN",
    "CLOUDINARY_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_SECRET_KEY",
    "ADMIN_NAME",
    "ADMIN_EMAIL",
    "ADMIN_PASSWORD",
  ];

  requiredEnvVariables.forEach((envVariable) => {
    if (!process.env[envVariable]) {
      throw new Error(`Missing environment variable: ${envVariable}`);
    }
  });

  return {
    PORT: Number(process.env.PORT),
    DB_URL: process.env.DB_URL as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
    JWT: {
      SECRET: process.env.JWT_SECRET as string,
      SALT_ROUND: Number(process.env.JWT_SALT_ROUND),
      EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
    },
    CLOUDINARY: {
      NAME: process.env.CLOUDINARY_NAME as string,
      API_KEY: process.env.CLOUDINARY_API_KEY as string,
      SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY as string,
    },
    ADMIN: {
      NAME: process.env.ADMIN_NAME as string,
      EMAIL: process.env.ADMIN_EMAIL as string,
      PASSWORD: process.env.ADMIN_PASSWORD as string,
    },
  };
};

export const envConfig = loadEnvVariables();
