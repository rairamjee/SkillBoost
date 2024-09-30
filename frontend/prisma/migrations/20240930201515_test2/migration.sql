/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `designation` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('Employee', 'Admin');

-- CreateEnum
CREATE TYPE "Domain" AS ENUM ('DataEngineering', 'FullStack', 'DataScience', 'DevOps', 'SoftSkills');

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
DROP COLUMN "username",
ADD COLUMN     "designation" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'Employee',
ADD COLUMN     "userId" SERIAL NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- CreateTable
CREATE TABLE "Training" (
    "trainingId" SERIAL NOT NULL,
    "trainingName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "domainName" "Domain" NOT NULL,
    "duration" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("trainingId")
);

-- CreateTable
CREATE TABLE "Response" (
    "responseId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "trainingId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "responseDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("responseId")
);

-- CreateTable
CREATE TABLE "Domains" (
    "domainId" SERIAL NOT NULL,
    "domainName" "Domain" NOT NULL,
    "domainDescription" TEXT NOT NULL,

    CONSTRAINT "Domains_pkey" PRIMARY KEY ("domainId")
);

-- CreateTable
CREATE TABLE "Retention" (
    "id" SERIAL NOT NULL,
    "trainingId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "isRetained" BOOLEAN NOT NULL,

    CONSTRAINT "Retention_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("trainingId") ON DELETE RESTRICT ON UPDATE CASCADE;
