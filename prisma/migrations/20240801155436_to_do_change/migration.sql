/*
  Warnings:

  - You are about to drop the column `date` on the `ToDo` table. All the data in the column will be lost.
  - Added the required column `day` to the `ToDo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `ToDo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `ToDo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ToDo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "isComplete" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "ToDo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ToDo" ("created_at", "description", "id", "isComplete", "title", "type", "updated_at", "userId") SELECT "created_at", "description", "id", "isComplete", "title", "type", "updated_at", "userId" FROM "ToDo";
DROP TABLE "ToDo";
ALTER TABLE "new_ToDo" RENAME TO "ToDo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
