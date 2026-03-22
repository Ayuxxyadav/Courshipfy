import { PrismaClient } from "./src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv"
dotenv.config() ;

if (!process.env.DATABASE_URL) {
console.log("DATABASE_URL is not defined ");
}

const adapter = new PrismaPg({
connectionString: process.env.DATABASE_URL
});

export const prisma = new PrismaClient({
adapter,
});