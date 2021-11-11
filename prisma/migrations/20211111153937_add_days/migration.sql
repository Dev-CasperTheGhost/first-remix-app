-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Week" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "start" DATETIME NOT NULL,
    "earnings" REAL NOT NULL,
    "hours" REAL NOT NULL,
    "days" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_Week" ("earnings", "hours", "id", "start") SELECT "earnings", "hours", "id", "start" FROM "Week";
DROP TABLE "Week";
ALTER TABLE "new_Week" RENAME TO "Week";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
