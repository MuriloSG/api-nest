-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_app_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "role" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL
);
INSERT INTO "new_app_users" ("city", "createdAt", "email", "id", "name", "password", "phone", "updateAt") SELECT "city", "createdAt", "email", "id", "name", "password", "phone", "updateAt" FROM "app_users";
DROP TABLE "app_users";
ALTER TABLE "new_app_users" RENAME TO "app_users";
CREATE UNIQUE INDEX "app_users_email_key" ON "app_users"("email");
CREATE UNIQUE INDEX "app_users_phone_key" ON "app_users"("phone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
