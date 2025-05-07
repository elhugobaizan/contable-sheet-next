-- CreateTable
CREATE TABLE "banco" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "capital" REAL NOT NULL,
    "duedate" DATETIME NOT NULL,
    "logo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "period" DATETIME NOT NULL,
    "tna" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "fijo" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "capital" INTEGER NOT NULL,
    "client" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "period" DATETIME NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "gasto" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "amount" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "detail" TEXT NOT NULL,
    "type" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "principal" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "available" INTEGER NOT NULL,
    "expenses" INTEGER NOT NULL,
    "inbanks" INTEGER NOT NULL,
    "indebt" INTEGER NOT NULL,
    "investments" INTEGER NOT NULL,
    "max" INTEGER NOT NULL,
    "monthly" INTEGER NOT NULL,
    "nextmonth" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "wallet" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "capital" INTEGER NOT NULL,
    "logo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "period" DATETIME NOT NULL,
    "tna" INTEGER NOT NULL
);
