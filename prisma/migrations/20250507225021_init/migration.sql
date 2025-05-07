-- CreateTable
CREATE TABLE `banco` (
    `_id` INTEGER NOT NULL AUTO_INCREMENT,
    `capital` DOUBLE NOT NULL,
    `duedate` DATETIME(3) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `period` DATETIME(3) NOT NULL,
    `tna` DOUBLE NOT NULL,

    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fijo` (
    `_id` INTEGER NOT NULL AUTO_INCREMENT,
    `capital` INTEGER NOT NULL,
    `client` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `period` DATETIME(3) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gasto` (
    `_id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DOUBLE NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `detail` VARCHAR(191) NOT NULL,
    `type` INTEGER NOT NULL,

    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `principal` (
    `_id` INTEGER NOT NULL AUTO_INCREMENT,
    `available` INTEGER NOT NULL,
    `expenses` INTEGER NOT NULL,
    `inbanks` INTEGER NOT NULL,
    `indebt` INTEGER NOT NULL,
    `investments` INTEGER NOT NULL,
    `max` INTEGER NOT NULL,
    `monthly` INTEGER NOT NULL,
    `nextmonth` INTEGER NOT NULL,

    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wallet` (
    `_id` INTEGER NOT NULL AUTO_INCREMENT,
    `capital` INTEGER NOT NULL,
    `logo` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `period` DATETIME(3) NOT NULL,
    `tna` INTEGER NOT NULL,

    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
