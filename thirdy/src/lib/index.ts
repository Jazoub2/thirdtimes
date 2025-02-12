// place files you want to import through the `$lib` alias in this folder.
import { PrismaClient } from "@prisma/client";
export let prisma = new PrismaClient();