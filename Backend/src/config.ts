import { registerAs } from "@nestjs/config";

export const config = registerAs('config', () => {
    return {
      database: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        dbName: process.env.DATABASE_NAME,
        port: parseInt(process.env.DATABASE_PORT, 10),

      },
      jwtSecret: process.env.JWT_SECRET,
    }
  })