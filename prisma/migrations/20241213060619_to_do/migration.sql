/*
  Warnings:

  - You are about to drop the column `userId` on the `ToDo` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `ToDo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ToDo" DROP CONSTRAINT "ToDo_userId_fkey";

-- AlterTable
ALTER TABLE "ToDo" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ToDo" ADD CONSTRAINT "ToDo_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
