-- CreateEnum
CREATE TYPE "Age" AS ENUM ('PUPPY', 'ADULT');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- CreateEnum
CREATE TYPE "EnergyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "IndependenceLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "RequiredSpace" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT,
    "age" "Age" NOT NULL,
    "size" "Size" NOT NULL,
    "energyLevel" "EnergyLevel" NOT NULL,
    "independenceLevel" "IndependenceLevel" NOT NULL,
    "requiredSpace" "RequiredSpace" NOT NULL,
    "pictureUrls" TEXT[],
    "adoptionRequirements" TEXT[],
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");
