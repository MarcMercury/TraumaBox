/*
  Warnings:

  - Added the required column `updatedAt` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "RevenueLedger" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contentId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "totalTokens" INTEGER NOT NULL,
    "creatorShare" INTEGER NOT NULL,
    "platformFee" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RevenueLedger_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Payout" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "tokenAmount" INTEGER NOT NULL,
    "usdAmount" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "stripePayoutId" TEXT,
    "requestedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME,
    CONSTRAINT "Payout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Content" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseFileId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "series" TEXT NOT NULL DEFAULT 'Uncategorized',
    "tokenCost" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "classification" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "description" TEXT NOT NULL DEFAULT '',
    "sideEffects" TEXT NOT NULL DEFAULT '',
    "consumptionTime" TEXT NOT NULL DEFAULT '',
    "body" TEXT NOT NULL DEFAULT '',
    "filePath" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "creatorId" TEXT,
    CONSTRAINT "Content_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Content" ("caseFileId", "classification", "consumptionTime", "createdAt", "description", "id", "series", "sideEffects", "status", "title", "tokenCost") SELECT "caseFileId", "classification", "consumptionTime", "createdAt", "description", "id", "series", "sideEffects", "status", "title", "tokenCost" FROM "Content";
DROP TABLE "Content";
ALTER TABLE "new_Content" RENAME TO "Content";
CREATE UNIQUE INDEX "Content_caseFileId_key" ON "Content"("caseFileId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "displayName" TEXT NOT NULL DEFAULT 'SUBJECT_UNKNOWN',
    "tokenBalance" INTEGER NOT NULL DEFAULT 0,
    "role" TEXT NOT NULL DEFAULT 'READER',
    "bio" TEXT NOT NULL DEFAULT '',
    "stripeCustomerId" TEXT,
    "stripeConnectId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "displayName", "email", "id", "stripeCustomerId", "tokenBalance", "updatedAt") SELECT "createdAt", "displayName", "email", "id", "stripeCustomerId", "tokenBalance", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");
CREATE UNIQUE INDEX "User_stripeConnectId_key" ON "User"("stripeConnectId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
