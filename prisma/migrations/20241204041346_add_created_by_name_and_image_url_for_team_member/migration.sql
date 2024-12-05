/*
  Warnings:

  - Added the required column `createdByName` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdByName` to the `SongCollection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "createdByName" TEXT NOT NULL,
ADD COLUMN     "updatedByName" TEXT;

-- AlterTable
ALTER TABLE "SongCollection" ADD COLUMN     "createdByName" TEXT NOT NULL,
ADD COLUMN     "updatedByName" TEXT;

-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "imageUrl" TEXT;
