/*
  Warnings:

  - Added the required column `active` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Active" AS ENUM ('YES', 'NO');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "active" "Active" NOT NULL;
