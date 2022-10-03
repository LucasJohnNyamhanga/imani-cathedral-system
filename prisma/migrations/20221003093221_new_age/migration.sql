-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NULL,
    `name` TEXT NOT NULL,
    `tareheYaKuzaliwa` DATETIME(3) NOT NULL,
    `bahasha` TEXT NULL,
    `jinsia` VARCHAR(191) NOT NULL,
    `haliYandoa` VARCHAR(191) NOT NULL,
    `ainaYaNdoa` VARCHAR(191) NULL,
    `tareheYaNdoa` DATETIME(3) NULL,
    `jinaLaMwenza` VARCHAR(191) NULL,
    `nambaYaSimu` INTEGER NOT NULL,
    `nambaYaSimuMwenza` INTEGER NULL,
    `jumuiyaId` INTEGER NOT NULL,
    `mtaa` VARCHAR(191) NOT NULL,
    `kata` VARCHAR(191) NOT NULL,
    `wilaya` VARCHAR(191) NOT NULL,
    `kazi` VARCHAR(191) NOT NULL,
    `elimu` VARCHAR(191) NOT NULL,
    `fani` VARCHAR(191) NOT NULL,
    `ubatizo` BOOLEAN NOT NULL,
    `kipaimara` BOOLEAN NOT NULL,
    `mezaYaBwana` BOOLEAN NOT NULL,
    `ahadi` INTEGER NOT NULL,
    `dateJoined` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    FULLTEXT INDEX `user_bahasha_idx`(`bahasha`),
    FULLTEXT INDEX `user_name_idx`(`name`),
    FULLTEXT INDEX `user_bahasha_name_idx`(`bahasha`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jumuiya` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cheo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cheoHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `start` DATETIME(3) NULL,
    `end` DATETIME(3) NULL,
    `cheoId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kwaya` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_cheoTouser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_cheoTouser_AB_unique`(`A`, `B`),
    INDEX `_cheoTouser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_kwayaTouser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_kwayaTouser_AB_unique`(`A`, `B`),
    INDEX `_kwayaTouser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_jumuiyaId_fkey` FOREIGN KEY (`jumuiyaId`) REFERENCES `jumuiya`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cheoHistory` ADD CONSTRAINT `cheoHistory_cheoId_fkey` FOREIGN KEY (`cheoId`) REFERENCES `cheo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cheoHistory` ADD CONSTRAINT `cheoHistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_cheoTouser` ADD CONSTRAINT `_cheoTouser_A_fkey` FOREIGN KEY (`A`) REFERENCES `cheo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_cheoTouser` ADD CONSTRAINT `_cheoTouser_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_kwayaTouser` ADD CONSTRAINT `_kwayaTouser_A_fkey` FOREIGN KEY (`A`) REFERENCES `kwaya`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_kwayaTouser` ADD CONSTRAINT `_kwayaTouser_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
