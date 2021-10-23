-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "githubId" INTEGER NOT NULL,
    "avatarUrl" TEXT NOT NULL
);
